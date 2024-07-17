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
- RAVT Contract deployed to:  0xCBE1AdC7AF9AB4856923E09d67E09aBf6a59C87D ([https://sepolia.basescan.org/address/0xcbe1adc7af9ab4856923e09d67e09abf6a59c87d])
- Raken Contract deployed to:  0xCF691D8cBBBd34Be07456E2655f3E58f8a6c999A ([https://sepolia.basescan.org/address/0xcf691d8cbbbd34be07456e2655f3e58f8a6c999a])
- RazzersAttributes Contract deployed to:  0x133C9c4feEE1f76861083de3C6620593d528A365 ([https://sepolia.basescan.org/address/0x133c9c4feee1f76861083de3c6620593d528a365])
- Razzers Contract deployed to:  0xa3406F5Cf3A4128a2e0beAe6c88728E2AE5a46a1 ([https://sepolia.basescan.org/address/0xa3406f5cf3a4128a2e0beae6c88728e2ae5a46a1])
- BattleZone Contract deployed to:  0xC915C87b4fDa3CA05d5Fa7e728f5Dfc657dE214e ([https://sepolia.basescan.org/address/0xc915c87b4fda3ca05d5fa7e728f5dfc657de214e])