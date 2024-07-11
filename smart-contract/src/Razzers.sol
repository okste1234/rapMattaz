// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "./RAVT.sol";
import "./Raken.sol";

contract Razzers is ERC1155, Ownable {
    using Math for uint256;

    RAVT public ravtContract;
    Raken public rakenContract;

    enum UserType { Fan, Rapper }

    struct RapperAttributes {
        uint256 ravel; // level
        uint256 flow;
        uint256 lyrics;
        uint256 charisma;
        uint256 battleWins;
        uint256 fanBase;
        uint256 votes;
        uint256 rapoint;
        uint256 unconvertedRapoint;
    }

    struct User {
        address wallet;
        string username;
        string imageURL;
        UserType userType;
        address[] following;
        bool hasClaimedRAVT;
        RapperAttributes rapperAttributes;
    }

    mapping(address => User) public users;
    uint256 public constant FAN_TOKEN_ID = 1;
    uint256 public constant RAPPER_TOKEN_ID = 2;

    mapping(uint256 => uint256) public ravelToTokenId;
    mapping(uint256 => string) private _tokenURIs;
    uint256 public nextTokenId = 3;

    string public rapperURI;
    string public fanURI;

    event UserRegistered(address indexed user, string username, UserType userType);
    event UserUpgraded(address indexed user, UserType newType);
    event ArtistFollowed(address indexed follower, address indexed artist);
    event RAVTClaimed(address indexed user);
    event RapointConverted(address indexed rapper, uint256 amount);
    event RavelUpdated(address indexed rapper, uint256 newRavel);
    event RapointDeducted(address indexed rapper, uint256 amount);
    event RapperAttributesUpdated(address indexed rapper, uint256 flow, uint256 lyrics, uint256 charisma);

    constructor(address _ravtAddress, address _rakenAddress) ERC1155("") Ownable(msg.sender) {
        ravtContract = RAVT(_ravtAddress);
        rakenContract = Raken(_rakenAddress);
    }

    function setURIs(string memory _rapperURI, string memory _fanURI) public onlyOwner {
        rapperURI = _rapperURI;
        fanURI = _fanURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];
        
        // If there's no specific URI for this token, return the default
        if (bytes(tokenURI).length == 0) {
            return tokenId == RAPPER_TOKEN_ID ? rapperURI : fanURI;
        }
        
        return tokenURI;
    }

    function setRavelNFT(uint256 ravel, string memory _uri) public onlyOwner {
        require(ravel > 0, "Ravel must be greater than 0");
        if (ravelToTokenId[ravel] == 0) {
            ravelToTokenId[ravel] = nextTokenId;
            nextTokenId++;
        }
        _tokenURIs[ravelToTokenId[ravel]] = _uri;
    }

    function registerUser(string memory _username, string memory _imageURL, UserType _userType) public {
        require(users[msg.sender].wallet == address(0), "User already registered");
        
        users[msg.sender] = User({
            wallet: msg.sender,
            username: _username,
            imageURL: _imageURL,
            userType: _userType,
            following: new address[](0),
            hasClaimedRAVT: false,
            rapperAttributes: RapperAttributes({
                ravel: 1,
                flow: 10,
                lyrics: 10,
                charisma: 10,
                battleWins: 0,
                fanBase: 0,
                votes: 0,
                rapoint: 0,
                unconvertedRapoint: 0
            })
        });

        if (_userType == UserType.Rapper) {
            _mint(msg.sender, RAPPER_TOKEN_ID, 1, "");
        } else {
            _mint(msg.sender, FAN_TOKEN_ID, 1, "");
        }

        emit UserRegistered(msg.sender, _username, _userType);
    }

    function claimRAVT() public {
        require(users[msg.sender].wallet != address(0), "User not registered");
        require(!users[msg.sender].hasClaimedRAVT, "RAVT already claimed");

        ravtContract.claimInitialRAVT(msg.sender);
        users[msg.sender].hasClaimedRAVT = true;

        emit RAVTClaimed(msg.sender);
    }

    function upgradeToRapper() public {
        require(users[msg.sender].userType == UserType.Fan, "User must be a fan to upgrade");
        users[msg.sender].userType = UserType.Rapper;
        _mint(msg.sender, RAPPER_TOKEN_ID, 1, "");
        _burn(msg.sender, FAN_TOKEN_ID, 1);
        emit UserUpgraded(msg.sender, UserType.Rapper);
    }

    function followArtist(address _artist) public {
        require(users[msg.sender].wallet != address(0), "User not registered");
        require(users[_artist].userType == UserType.Rapper, "Can only follow rappers");
        users[msg.sender].following.push(_artist);
        users[_artist].rapperAttributes.fanBase++;
        updateRapperAttributes(_artist);
        emit ArtistFollowed(msg.sender, _artist);
    }

    function getFollowing(address _user) public view returns (address[] memory) {
        return users[_user].following;
    }

    function updateRapperAttributes(address rapper) public {
        require(users[rapper].userType == UserType.Rapper, "User is not a rapper");
        
        RapperAttributes storage attrs = users[rapper].rapperAttributes;
        
        // Dynamic update of attributes based on rapoint, votes, and fanBase
        attrs.flow = 10 + (attrs.rapoint / 5).min(90);
        attrs.lyrics = 10 + (attrs.votes / 3).min(90);
        attrs.charisma = 10 + (attrs.fanBase / 2).min(90);
        
        updateRavel(rapper);

        emit RapperAttributesUpdated(rapper, attrs.flow, attrs.lyrics, attrs.charisma);
    }

    function updateRavel(address _rapper) internal {
        uint256 newRavel = (users[_rapper].rapperAttributes.rapoint / 100) + 1;
        uint256 currentRavel = users[_rapper].rapperAttributes.ravel;

        if (newRavel != currentRavel) {
            // Burn the old NFT
            if (ravelToTokenId[currentRavel] != 0) {
                _burn(_rapper, ravelToTokenId[currentRavel], 1);
            }

            // Mint the new NFT
            if (ravelToTokenId[newRavel] != 0) {
                _mint(_rapper, ravelToTokenId[newRavel], 1, "");
            }

            users[_rapper].rapperAttributes.ravel = newRavel;
            emit RavelUpdated(_rapper, newRavel);
        }
    }

    function convertRapointToRaken(uint256 amount) public {
        require(users[msg.sender].userType == UserType.Rapper, "User is not a rapper");
        require(users[msg.sender].rapperAttributes.unconvertedRapoint >= amount, "Insufficient unconverted rapoint");

        users[msg.sender].rapperAttributes.unconvertedRapoint -= amount;
        rakenContract.mint(msg.sender, amount);

        emit RapointConverted(msg.sender, (amount * 10**18));
    }

    function updateBattleOutcome(address winner, address loser, uint256 winnerVotes, uint256 loserVotes) external {
        require(users[winner].userType == UserType.Rapper && users[loser].userType == UserType.Rapper, "Both users must be rappers");

        users[winner].rapperAttributes.battleWins++;
        users[winner].rapperAttributes.votes += winnerVotes;
        users[loser].rapperAttributes.votes += loserVotes;
        
        uint256 initialWinnerRapoint = users[winner].rapperAttributes.rapoint;
        uint256 initialLoserRapoint = users[loser].rapperAttributes.rapoint;
        uint256 differenceInRapoint = initialWinnerRapoint > initialLoserRapoint ? (initialWinnerRapoint - initialLoserRapoint) : (initialLoserRapoint - initialWinnerRapoint);

        uint256 winnerRapoint = initialWinnerRapoint + (winnerVotes * 5);
        uint256 loserRapoint = initialLoserRapoint + (loserVotes * 5);
        uint256 unconvertedWinnerRapoint = users[winner].rapperAttributes.unconvertedRapoint + (winnerVotes * 5);
        uint256 unconvertedLoserRapoint = users[loser].rapperAttributes.unconvertedRapoint + (loserVotes * 5);
        
        uint256 rapointChange;
        if (initialWinnerRapoint > initialLoserRapoint) {
            rapointChange = (differenceInRapoint * 7) / 100; // 7% of loser's rapoint
        } else if(winnerRapoint < loserRapoint) {
            rapointChange = (differenceInRapoint * 10) / 100; // 10% of winner's rapoint
        } else {
            rapointChange = 0;
        }

        winnerRapoint += rapointChange;
        unconvertedWinnerRapoint += rapointChange;

        if (loserRapoint >= rapointChange) {
            loserRapoint -= rapointChange;
            if (unconvertedLoserRapoint >= rapointChange) {
                unconvertedLoserRapoint -= rapointChange;
            } else {
                unconvertedLoserRapoint = 0;
            }
        } else {
            loserRapoint = 0;
        }

        updateRapperAttributes(winner);
        updateRapperAttributes(loser);
    }

    function battleDrawn(address challenger, address opponent, uint256 challengerVotes, uint256 opponentVotes) external {
        users[challenger].rapperAttributes.votes += challengerVotes;
        users[opponent].rapperAttributes.votes += opponentVotes;

        users[challenger].rapperAttributes.rapoint += (challengerVotes * 5);
        users[opponent].rapperAttributes.rapoint += (opponentVotes * 5);
        
        users[challenger].rapperAttributes.unconvertedRapoint += (challengerVotes * 5);
        users[opponent].rapperAttributes.unconvertedRapoint += (opponentVotes * 5);

        updateRapperAttributes(challenger);
        updateRapperAttributes(opponent);
    }

    function deductRapoints(address rapper, uint256 amount) external {
        require(users[rapper].userType == UserType.Rapper, "User is not a rapper");
        
        users[rapper].rapperAttributes.rapoint -= amount;
        updateRapperAttributes(rapper);

        emit RapointDeducted(rapper, amount);
    }

    function isRapper(address _user) public view returns (bool) {
        return users[_user].userType == UserType.Rapper;
    }

    function getFanDetails(address _fan) external view returns(string memory username, string memory imageURL, UserType userType, address[] memory following) {
        require(users[_fan].wallet != address(0), "User not registered");
        
        User storage fanInfo = users[_fan];

        return (fanInfo.username, fanInfo.imageURL, fanInfo.userType, fanInfo.following);
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
        require(users[_rapper].wallet != address(0), "User not registered");
        require(users[_rapper].userType == UserType.Rapper, "User is not a rapper");

        RapperAttributes storage rapperInfo = users[_rapper].rapperAttributes;
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