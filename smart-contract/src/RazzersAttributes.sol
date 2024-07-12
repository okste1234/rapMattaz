// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "./Raken.sol";

contract RazzersAttributes is Ownable {
    using Math for uint256;

    Raken public rakenContract;

    struct RapperAttributes {
        uint256 ravel;
        uint256 flow;
        uint256 lyrics;
        uint256 charisma;
        uint256 battleWins;
        uint256 fanBase;
        uint256 votes;
        uint256 rapoint;
        uint256 unconvertedRapoint;
    }

    mapping(address => RapperAttributes) public rapperAttributes;

    event RapointConverted(address indexed rapper, uint256 amount);
    event RavelUpdated(address indexed rapper, uint256 newRavel);
    event RapointDeducted(address indexed rapper, uint256 amount);
    event RapperAttributesUpdated(address indexed rapper, uint256 flow, uint256 lyrics, uint256 charisma);

    constructor(address _rakenAddress) Ownable(msg.sender) {
        rakenContract = Raken(_rakenAddress);
    }

    function initializeRapperAttributes(address rapper) external {
        require(rapperAttributes[rapper].ravel == 0, "Rapper attributes already initialized");
        rapperAttributes[rapper] = RapperAttributes({
            ravel: 1,
            flow: 10,
            lyrics: 10,
            charisma: 10,
            battleWins: 0,
            fanBase: 0,
            votes: 0,
            rapoint: 0,
            unconvertedRapoint: 0
        });
    }

    function updateRapperAttributes(address rapper) public {
        RapperAttributes storage attrs = rapperAttributes[rapper];
        
        attrs.flow = 10 + (attrs.rapoint / 5).min(90);
        attrs.lyrics = 10 + (attrs.votes / 3).min(90);
        attrs.charisma = 10 + (attrs.fanBase / 2).min(90);
        
        updateRavel(rapper);

        emit RapperAttributesUpdated(rapper, attrs.flow, attrs.lyrics, attrs.charisma);
    }

    function updateRavel(address _rapper) internal {
        uint256 newRavel = (rapperAttributes[_rapper].rapoint / 100) + 1;
        uint256 currentRavel = rapperAttributes[_rapper].ravel;

        if (newRavel != currentRavel) {
            rapperAttributes[_rapper].ravel = newRavel;
            emit RavelUpdated(_rapper, newRavel);
        }
    }

    function convertRapointToRaken(address rapper, uint256 amount) external {
        require(rapperAttributes[rapper].unconvertedRapoint >= amount, "Insufficient unconverted rapoint");

        rapperAttributes[rapper].unconvertedRapoint -= amount;
        rakenContract.mint(rapper, amount);

        emit RapointConverted(rapper, (amount * 10**18));
    }

    function updateBattleOutcome(address winner, address loser, uint256 winnerVotes, uint256 loserVotes) external {
        rapperAttributes[winner].battleWins++;
        rapperAttributes[winner].votes += winnerVotes;
        rapperAttributes[loser].votes += loserVotes;
        
        uint256 initialWinnerRapoint = rapperAttributes[winner].rapoint;
        uint256 initialLoserRapoint = rapperAttributes[loser].rapoint;
        uint256 differenceInRapoint = initialWinnerRapoint > initialLoserRapoint ? (initialWinnerRapoint - initialLoserRapoint) : (initialLoserRapoint - initialWinnerRapoint);

        uint256 winnerRapoint = initialWinnerRapoint + (winnerVotes * 5);
        uint256 loserRapoint = initialLoserRapoint + (loserVotes * 5);
        uint256 unconvertedWinnerRapoint = rapperAttributes[winner].unconvertedRapoint + (winnerVotes * 5);
        uint256 unconvertedLoserRapoint = rapperAttributes[loser].unconvertedRapoint + (loserVotes * 5);
        
        uint256 rapointChange;
        if (initialWinnerRapoint > initialLoserRapoint) {
            rapointChange = (differenceInRapoint * 7) / 100;
        } else if(winnerRapoint < loserRapoint) {
            rapointChange = (differenceInRapoint * 10) / 100;
        } else {
            rapointChange = 1;
        }

        rapperAttributes[winner].rapoint = winnerRapoint + rapointChange;
        rapperAttributes[winner].unconvertedRapoint = unconvertedWinnerRapoint + rapointChange;

        if (loserRapoint >= rapointChange) {
            rapperAttributes[loser].rapoint -= rapointChange;
            if (unconvertedLoserRapoint >= rapointChange) {
                rapperAttributes[loser].unconvertedRapoint -= rapointChange;
            } else {
                rapperAttributes[loser].unconvertedRapoint = 0;
            }
        } else {
            rapperAttributes[loser].rapoint = 0;
        }

        updateRapperAttributes(winner);
        updateRapperAttributes(loser);
    }

    function battleDrawn(address challenger, address opponent, uint256 challengerVotes, uint256 opponentVotes) external {
        rapperAttributes[challenger].votes += challengerVotes;
        rapperAttributes[opponent].votes += opponentVotes;

        rapperAttributes[challenger].rapoint += (challengerVotes * 5);
        rapperAttributes[opponent].rapoint += (opponentVotes * 5);
        
        rapperAttributes[challenger].unconvertedRapoint += (challengerVotes * 5);
        rapperAttributes[opponent].unconvertedRapoint += (opponentVotes * 5);

        updateRapperAttributes(challenger);
        updateRapperAttributes(opponent);
    }

    function deductRapoints(address rapper, uint256 amount) external {
        rapperAttributes[rapper].rapoint -= amount;
        updateRapperAttributes(rapper);

        emit RapointDeducted(rapper, amount);
    }

    function increaseFanBase(address rapper) external {
        rapperAttributes[rapper].fanBase++;
        updateRapperAttributes(rapper);
    }

    function getRapperInfo(address _rapper) external view returns(
        uint256 ravel,
        uint256 flow,
        uint256 lyrics,
        uint256 charisma,
        uint256 battleWins,
        uint256 fanBase,
        uint256 votes,
        uint256 rapoint,
        uint256 unconvertedRapoint
    ) {
        RapperAttributes storage rapperInfo = rapperAttributes[_rapper];
        return(
            rapperInfo.ravel,
            rapperInfo.flow,
            rapperInfo.lyrics,
            rapperInfo.charisma,
            rapperInfo.battleWins,
            rapperInfo.fanBase,
            rapperInfo.votes,
            rapperInfo.rapoint,
            rapperInfo.unconvertedRapoint
        );
    }
}