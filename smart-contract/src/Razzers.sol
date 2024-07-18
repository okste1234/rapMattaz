// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "./RAVT.sol";
import "./Raken.sol";
import "./RazzersAttributes.sol";

contract Razzers is ERC1155, Ownable {
    using Math for uint256;

    RAVT public ravtContract;
    Raken public rakenContract;
    RazzersAttributes public attributesContract;

    enum UserType { Fan, Rapper }

    struct User {
        address wallet;
        string username;
        string imageURL;
        UserType userType;
        address[] following;
        bool hasClaimedRAVT;
    }

    uint256 public nextUserId = 1;
    mapping(uint256 => User) public userById;
    mapping(address => uint256) public userIdByAddress;
    mapping(address => User) public users;
    uint256 public constant FAN_TOKEN_ID = 1;
    uint256 public constant RAPPER_TOKEN_ID = 2;

    string public fanURI = "https://aquamarine-famous-penguin-727.mypinata.cloud/ipfs/QmPPBwVrNZDnZR1YeWYbdyBYSfVuAXAQynTSoLrxBCvg4G";
    string public rapperURI = "https://aquamarine-famous-penguin-727.mypinata.cloud/ipfs/QmcjEFFg8rPgCumRyaFeNr3veLsdkbo128Ncmc6ZjjFSiU";
    string public rapper2URI = "https://aquamarine-famous-penguin-727.mypinata.cloud/ipfs/QmTcfkyGmqykJbpNy5P1chijixZy5VsUWabGGYeoJQ87zo";

    mapping(string => bool) private usedUsernames;
    mapping(uint256 => uint256) public ravelToTokenId;
    mapping(uint256 => string) private _tokenURIs;
    uint256 public nextTokenId = 3;

    event UserRegistered(address indexed user, string username, UserType userType);
    event UserUpgraded(address indexed user, UserType newType);
    event ArtistFollowed(address indexed follower, address indexed artist);
    event RAVTClaimed(address indexed user);

    constructor(address _ravtAddress, address _rakenAddress, address _attributesAddress) ERC1155("") Ownable(msg.sender) {
        ravtContract = RAVT(_ravtAddress);
        rakenContract = Raken(_rakenAddress);
        attributesContract = RazzersAttributes(_attributesAddress);

        setURIs(rapperURI, fanURI);
        setRavelNFT(3, rapper2URI);
    }

    function setURIs(string memory _rapperURI, string memory _fanURI) public onlyOwner {
        rapperURI = _rapperURI;
        fanURI = _fanURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];
        
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
        require(!usedUsernames[_username], "Username already taken");
    
        uint256 userId = nextUserId;
    
        User memory newUser = User({
            wallet: msg.sender,
            username: _username,
            imageURL: _imageURL,
            userType: _userType,
            following: new address[](0),
            hasClaimedRAVT: false
        });

        users[msg.sender] = newUser;
        userById[userId] = newUser;
        userIdByAddress[msg.sender] = userId;

        usedUsernames[_username] = true;
        nextUserId++;

        if (_userType == UserType.Rapper) {
            _mint(msg.sender, RAPPER_TOKEN_ID, 1, "");
            attributesContract.initializeRapperAttributes(msg.sender);
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
        uint256 userId = userIdByAddress[msg.sender];
        userById[userId].userType = UserType.Rapper;
    
        _mint(msg.sender, RAPPER_TOKEN_ID, 1, "");
        _burn(msg.sender, FAN_TOKEN_ID, 1);
        attributesContract.initializeRapperAttributes(msg.sender);
    
        emit UserUpgraded(msg.sender, UserType.Rapper);
    }

    function followArtist(address _artist) public {
        require(users[msg.sender].wallet != address(0), "User not registered");
        require(users[_artist].userType == UserType.Rapper, "Can only follow rappers");
        require(_artist != msg.sender, "Cannot follow yourself");

        bool alreadyFollowing = false;
        for (uint i = 0; i < users[msg.sender].following.length; i++) {
            if (users[msg.sender].following[i] == _artist) {
                alreadyFollowing = true;
                break;
            }
        }
        require(!alreadyFollowing, "Already following this artist");

        users[msg.sender].following.push(_artist);
        attributesContract.increaseFanBase(_artist);
        emit ArtistFollowed(msg.sender, _artist);
    }

    function getFollowing(address _user) public view returns (address[] memory) {
        return users[_user].following;
    }

    function isRapper(address _user) public view returns (bool) {
        return users[_user].userType == UserType.Rapper;
    }

    function getUserById(uint256 _userId) public view returns (User memory) {
        require(_userId > 0 && _userId < nextUserId, "Invalid user ID");
        return userById[_userId];
    }

    function getUserIdByAddress(address _userAddress) public view returns (uint256) {
        require(userIdByAddress[_userAddress] != 0, "User not found");
        return userIdByAddress[_userAddress];
    }

    function getFanDetails(address _fan) external view returns(string memory username, string memory imageURL, UserType userType, address[] memory following) {
        require(users[_fan].wallet != address(0), "User not registered");
        
        User storage fanInfo = users[_fan];

        return (fanInfo.username, fanInfo.imageURL, fanInfo.userType, fanInfo.following);
    }
}