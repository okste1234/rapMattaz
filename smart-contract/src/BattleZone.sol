// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Razzers.sol";
import "./RazzersAttributes.sol";
import "./RAVT.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BattleZone is ReentrancyGuard {
    Razzers public razzerContract;
    RazzersAttributes public attributesContract;
    RAVT public ravtContract;

    enum BattleStatus { Pending, Accepted, Declined, Completed }

    struct Battle {
        address challenger;
        address opponent;
        uint256 challengeTime;
        uint256 acceptDeadline;
        uint256 startTime;
        uint256 endTime;
        uint256 voteEndTime;
        address winner;
        BattleStatus status;
        mapping(address => bool) hasVoted;
        mapping(address => uint256) votes;
        string streamingLink;
    }

    mapping(uint256 => Battle) battles;
    uint256 public battleCounter;
    mapping(address => uint256) public consecutiveDeclines;

    event BattleCreated(uint256 indexed battleId, address indexed challenger, address indexed opponent, uint256 acceptDeadline);
    event BattleAccepted(uint256 indexed battleId, uint256 battleStartTime);
    event BattleDeclined(uint256 indexed battleId);
    event VoteCast(uint256 indexed battleId, address indexed voter, address votedFor);
    event BattleEnded(uint256 indexed battleId, address indexed winner);
    event RapointsPenalty(address indexed rapper, uint256 penaltyAmount);

    constructor(address _ravtAddress, address _razzerContractAddress, address _attributesAddress) {
        ravtContract = RAVT(_ravtAddress);
        razzerContract = Razzers(_razzerContractAddress);
        attributesContract = RazzersAttributes(_attributesAddress);
    }

    function createBattle(address _opponent) public nonReentrant {
        require(razzerContract.isRapper(msg.sender), "Only rappers can create battles");
        
        battleCounter++;
        Battle storage newBattle = battles[battleCounter];
        newBattle.challenger = msg.sender;
        newBattle.opponent = _opponent;
        newBattle.challengeTime = block.timestamp;
        newBattle.acceptDeadline = block.timestamp + 72 hours;
        newBattle.status = BattleStatus.Pending;

        emit BattleCreated(battleCounter, msg.sender, _opponent, newBattle.acceptDeadline);
    }

    function acceptBattle(uint256 _battleId, uint256 _battleStartTime, string memory _link) public nonReentrant {
        Battle storage battle = battles[_battleId];
        require(msg.sender == battle.opponent, "Only the opponent can accept");
        require(battle.status == BattleStatus.Pending, "Battle is not in pending state");
        require(block.timestamp < battle.acceptDeadline, "Accept deadline has passed");

        battle.startTime = block.timestamp + _battleStartTime;
        battle.endTime = block.timestamp + _battleStartTime + 5 minutes;
        battle.voteEndTime = block.timestamp + _battleStartTime + 10 minutes;
        battle.status = BattleStatus.Accepted;
        battle.streamingLink = _link;

        consecutiveDeclines[msg.sender] = 0; // Reset consecutive declines

        emit BattleAccepted(_battleId, _battleStartTime);
    }

    function declineBattle(uint256 _battleId) public nonReentrant {
        Battle storage battle = battles[_battleId];
        require(msg.sender == battle.opponent, "Only the opponent can decline");
        require(battle.status == BattleStatus.Pending, "Battle is not in pending state");
        require(block.timestamp < battle.acceptDeadline, "Accept deadline has passed");

        battle.status = BattleStatus.Declined;

        consecutiveDeclines[msg.sender]++;
        if (consecutiveDeclines[msg.sender] >= 3) {
            uint256 penaltyAmount = 50; // Define an appropriate penalty amount
            attributesContract.deductRapoints(msg.sender, penaltyAmount);
            consecutiveDeclines[msg.sender] = 0; // Reset after applying penalty
            emit RapointsPenalty(msg.sender, penaltyAmount);
        }

        emit BattleDeclined(_battleId);
    }

    function vote(uint256 _battleId, address _votedFor) public nonReentrant {
        Battle storage battle = battles[_battleId];
        require(battle.status == BattleStatus.Accepted, "Battle is not in accepted state");
        require(block.timestamp >= battle.startTime, "Voting is not open");
        require(block.timestamp < battle.voteEndTime, "Voting is closed");
        require(_votedFor == battle.challenger || _votedFor == battle.opponent, "Invalid vote recipient");
        require(!battle.hasVoted[msg.sender], "User has already voted");
        
        uint256 voteCost = 1;
        require(ravtContract.balanceOf(msg.sender) >= voteCost, "Insufficient RAVT balance");
        
        ravtContract.burnFrom(msg.sender, voteCost);

        battle.votes[_votedFor]++;
        battle.hasVoted[msg.sender] = true;

        attributesContract.updateRapperAttributes(_votedFor);

        emit VoteCast(_battleId, msg.sender, _votedFor);
    }

    function endBattle(uint256 _battleId) public nonReentrant {
        Battle storage battle = battles[_battleId];
        require(battle.status == BattleStatus.Accepted, "Battle is not in accepted state");
        require(block.timestamp >= battle.endTime, "Battle has not ended yet");

        uint256 challengerVotes = battle.votes[battle.challenger];
        uint256 opponentVotes = battle.votes[battle.opponent];
        uint winnerVotes;
        uint256 loserVotes;

        if (challengerVotes > opponentVotes) {
            battle.winner = battle.challenger;
            winnerVotes = challengerVotes;
            loserVotes = opponentVotes;
        } else if (challengerVotes < opponentVotes) {
            battle.winner = battle.opponent;
            winnerVotes = opponentVotes;
            loserVotes = challengerVotes;
        } else {
            battle.winner = address(0); // Draw
        }

        battle.status = BattleStatus.Completed;

        if (battle.winner != address(0)) {
            address loser = battle.winner == battle.challenger ? battle.opponent : battle.challenger;
            attributesContract.updateBattleOutcome(battle.winner, loser, winnerVotes, loserVotes);
        } else {
            attributesContract.battleDrawn(battle.challenger, battle.opponent, challengerVotes, opponentVotes); // challengerVotes & opponentVotes are equal
        }

        emit BattleEnded(_battleId, battle.winner);
    }

    function getBattleDetails(uint256 _battleId) public view returns (
        address challenger,
        address opponent,
        uint256 challengeTime,
        uint256 acceptDeadline,
        uint256 startTime,
        uint256 endTime,
        uint256 voteEndTime,
        address winner,
        BattleStatus status,
        string memory streamingLink,
        uint256 challengerVotes,
        uint256 opponentVotes
    ) {
        Battle storage battle = battles[_battleId];
        return (
            battle.challenger,
            battle.opponent,
            battle.challengeTime,
            battle.acceptDeadline,
            battle.startTime,
            battle.endTime,
            battle.voteEndTime,
            battle.winner,
            battle.status,
            battle.streamingLink,
            battle.votes[battle.challenger],
            battle.votes[battle.opponent]
        );
    }
}