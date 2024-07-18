## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

## Future Implementations of the updateBattleOutcome using the Chess ELO rating format

### Latest iteration to avoid stack overflow

```shell
$ function updateBattleOutcome(address winner, address loser, uint256 winnerVotes, uint256 loserVotes) external {
        _updateBattleStats(winner, loser, winnerVotes, loserVotes);
        (int256 winnerRapointChange, int256 loserRapointChange) = _calculateRapointChanges(winner, loser, winnerVotes, loserVotes);
        _applyRapointChanges(winner, loser, winnerRapointChange, loserRapointChange);
        _updateAttributes(winner, loser);
    }

    function _updateBattleStats(address winner, address loser, uint256 winnerVotes, uint256 loserVotes) internal {
        rapperAttributes[winner].battleWins++;
        rapperAttributes[winner].votes += winnerVotes;
        rapperAttributes[loser].votes += loserVotes;
    }

    function _calculateRapointChanges(address winner, address loser, uint256 winnerVotes, uint256 loserVotes) 
        internal view returns (int256 winnerRapointChange, int256 loserRapointChange) 
    {
        uint256 initialWinnerRapoint = rapperAttributes[winner].rapoint;
        uint256 initialLoserRapoint = rapperAttributes[loser].rapoint;

        uint256 expectedWinnerScore = calculateExpectedScore(initialWinnerRapoint, initialLoserRapoint);
        uint256 expectedLoserScore = 1000 - expectedWinnerScore;

        uint256 totalVotes = winnerVotes + loserVotes;
        uint256 actualWinnerScore = (winnerVotes * 1000) / totalVotes;
        uint256 actualLoserScore = 1000 - actualWinnerScore;

        uint256 kFactor = 32;
        winnerRapointChange = int256((kFactor * int256(actualWinnerScore - expectedWinnerScore)) / 1000);
        loserRapointChange = int256((kFactor * int256(actualLoserScore - expectedLoserScore)) / 1000);
    }

    function _applyRapointChanges(address winner, address loser, int256 winnerRapointChange, int256 loserRapointChange) internal {
        _updateRapoint(winner, winnerRapointChange);
        _updateRapoint(loser, loserRapointChange);
    }

    function _updateRapoint(address rapper, int256 rapointChange) internal {
        uint256 initialRapoint = rapperAttributes[rapper].rapoint;
        if (rapointChange > 0) {
            rapperAttributes[rapper].rapoint = initialRapoint + uint256(rapointChange);
            rapperAttributes[rapper].unconvertedRapoint += uint256(rapointChange);
        } else {
            rapperAttributes[rapper].rapoint = initialRapoint > uint256(-rapointChange) ? 
                initialRapoint - uint256(-rapointChange) : 0;
        }
    }

    function _updateAttributes(address winner, address loser) internal {
        updateRapperAttributes(winner);
        updateRapperAttributes(loser);
    }

    function calculateExpectedScore(uint256 rating1, uint256 rating2) internal pure returns (uint256) {
        int256 ratingDifference = int256(rating2) - int256(rating1);
        int256 exponent = ratingDifference > int256(400) ? int256(400) : (ratingDifference < int256(-400) ? int256(-400) : ratingDifference);
    
        // Use a fixed-point representation for the exponent calculation
        uint256 fixedPointFactor = 1000000; // 6 decimal places
        uint256 denominator = fixedPointFactor + (fixedPointFactor * uint256(exponent) / 400);
    
        return (1000 * fixedPointFactor) / denominator;
$    }
```

### Simpler iteration

```shell
    function updateBattleOutcome(address winner, address loser, uint256 winnerVotes, uint256 loserVotes) external {
        rapperAttributes[winner].battleWins++;
        rapperAttributes[winner].votes = rapperAttributes[winner].votes + winnerVotes;
        rapperAttributes[loser].votes = rapperAttributes[loser].votes + loserVotes;

        uint256 initialWinnerRapoint = rapperAttributes[winner].rapoint;
        uint256 initialLoserRapoint = rapperAttributes[loser].rapoint;

        // Calculate expected scores
        uint256 expectedWinnerScore = calculateExpectedScore(initialWinnerRapoint, initialLoserRapoint);
        uint256 expectedLoserScore = 1000 - expectedWinnerScore; // Out of 1000 instead of 1

        // Calculate actual scores based on votes
        uint256 totalVotes = winnerVotes + loserVotes;
        uint256 actualWinnerScore = (winnerVotes * 1000) / totalVotes;
        uint256 actualLoserScore = 1000 - actualWinnerScore;

        // Calculate Rapoint changes
        uint256 kFactor = 32; // This can be adjusted to make ratings more or less volatile
        int256 winnerRapointChange = int256((kFactor * (actualWinnerScore - expectedWinnerScore)) / 1000);
        int256 loserRapointChange = int256((kFactor * (actualLoserScore - expectedLoserScore)) / 1000);

        // Update Rapoints
        if (winnerRapointChange > 0) {
            rapperAttributes[winner].rapoint = initialWinnerRapoint + uint256(winnerRapointChange);
            rapperAttributes[winner].unconvertedRapoint += uint256(winnerRapointChange);
        } else {
            rapperAttributes[winner].rapoint = initialWinnerRapoint > uint256(-winnerRapointChange) ? 
                initialWinnerRapoint - uint256(-winnerRapointChange) : 0;
        }

        if (loserRapointChange > 0) {
            rapperAttributes[loser].rapoint = initialLoserRapoint + uint256(loserRapointChange);
            rapperAttributes[loser].unconvertedRapoint += uint256(loserRapointChange);
        } else {
            rapperAttributes[loser].rapoint = initialLoserRapoint > uint256(-loserRapointChange) ? 
                initialLoserRapoint - uint256(-loserRapointChange) : 0;
        }

        updateRapperAttributes(winner);
        updateRapperAttributes(loser);
    }

    function calculateExpectedScore(uint256 rating1, uint256 rating2) internal pure returns (uint256) {
        int256 exponent = int256(rating2) - int256(rating1);
        exponent = exponent > 400 ? 400 : (exponent < -400 ? -400 : exponent);
    
        uint256 denominator = 1 + uint256(10 ** (exponent / 400));
        return 1000 / denominator; // Returns a number between 0 and 1000
    }
```

## Deployment to Base
- RAVT Contract deployed to:  0x73c1b65ae1b3900b7aef94d49f37b1eb6d20f43f ([https://sepolia.basescan.org/address/0x73c1b65ae1b3900b7aef94d49f37b1eb6d20f43f])
- Raken Contract deployed to:  0x8b78ea0d99390be0c17dcecb9f9d488e140926d6 ([https://sepolia.basescan.org/address/0x8b78ea0d99390be0c17dcecb9f9d488e140926d6])
- RazzersAttributes Contract deployed to:  0xe1d3d133b77cbadf29d78d8876e04404c315b181 ([https://sepolia.basescan.org/address/0xe1d3d133b77cbadf29d78d8876e04404c315b181])
- Razzers Contract deployed to:  0x1e93021e7e9ddcfa616245898da2ba453a8b5a54 ([https://sepolia.basescan.org/address/0x1e93021e7e9ddcfa616245898da2ba453a8b5a54])
- BattleZone Contract deployed to:  0x8fd923aed024500602d504da1f259a53ae10eaae ([https://sepolia.basescan.org/address/0x8fd923aed024500602d504da1f259a53ae10eaae])
- Multicall2 Contract deployed to:  0x85cf480231acc94aace36a46e63ca4fc5c9ef5c4 ([https://sepolia.basescan.org/address/0x85cf480231acc94aace36a46e63ca4fc5c9ef5c4])

Transactions saved to: rapMattaz/smart-contract/broadcast/Deploy.s.sol/84532/run-latest.json
Contract successfully verified
All (6) contracts were verified!