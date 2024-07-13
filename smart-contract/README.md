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

```shell
$ function updateBattleOutcome(address winner, address loser, uint256 winnerVotes, uint256 loserVotes) external {
        rapperAttributes[winner].battleWins++;
        rapperAttributes[winner].votes = rapperAttributes[winner].votes + winnerVotes;
        rapperAttributes[loser].votes = rapperAttributes[loser].votes + loserVotes;
    
        uint256 initialWinnerRapoint = rapperAttributes[winner].rapoint;
        uint256 initialLoserRapoint = rapperAttributes[loser].rapoint;

        uint256 rapointChange;
        if (initialWinnerRapoint > initialLoserRapoint) {
            rapointChange = ((initialWinnerRapoint - initialLoserRapoint) * 7) / 100;
        } else if (initialWinnerRapoint < initialLoserRapoint) {
            rapointChange = ((initialLoserRapoint - initialWinnerRapoint) * 10) / 100;
        } else {
            rapointChange = 1;
        }

        uint256 winnerRapointGain = (winnerVotes * 5) + rapointChange;
        uint256 loserRapointGain = loserVotes * 5;

        rapperAttributes[winner].rapoint = initialWinnerRapoint + winnerRapointGain;
        rapperAttributes[winner].unconvertedRapoint = rapperAttributes[winner].unconvertedRapoint + winnerRapointGain;

        if (initialLoserRapoint + loserRapointGain > rapointChange) {
            rapperAttributes[loser].rapoint = initialLoserRapoint + loserRapointGain - rapointChange;
            if (rapperAttributes[loser].unconvertedRapoint + loserRapointGain >= rapointChange) {
                rapperAttributes[loser].unconvertedRapoint = rapperAttributes[loser].unconvertedRapoint + loserRapointGain - rapointChange;
            } else {
                rapperAttributes[loser].unconvertedRapoint = loserRapointGain;
            }
        } else {
            rapperAttributes[loser].rapoint = loserRapointGain;
            rapperAttributes[loser].unconvertedRapoint = loserRapointGain;
        }

        updateRapperAttributes(winner);
        updateRapperAttributes(loser);
$    }
```

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