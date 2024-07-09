// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RAVT is ERC20, Ownable {
    uint256 public constant INITIAL_USER_RAVT = 50 * 10**18; // 50 RAVT with 18 decimals
    uint256 public constant INITIAL_SUPPLY = 5000 * 10**18;
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18;

    mapping(address => bool) public hasClaimed;

    constructor() ERC20("RapMattaz Vote Token", "RAVT") Ownable(msg.sender) {
        _mint(address(this), INITIAL_SUPPLY);
    }

    function mint(uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply reached");
        _mint(address(this), amount);
    }

    function claimInitialRAVT(address user) public {
        require(!hasClaimed[user], "Initial RAVT already claimed");
        hasClaimed[user] = true;
        _transfer(address(this), user, INITIAL_USER_RAVT);
    }

    function burnFrom(address account, uint256 amount) public {
        uint256 currentAllowance = allowance(account, _msgSender());
        require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        unchecked {
            _approve(account, _msgSender(), currentAllowance - amount);
        }
        _burn(account, amount);
    }
}