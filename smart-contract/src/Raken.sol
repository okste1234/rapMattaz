// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Raken is ERC20 {
    uint256 public constant MAX_SUPPLY = 80000000 * 10**18;
    uint256 public constant INITIAL_SUPPLY = 25000000 * 10**18;

    constructor() ERC20("Rap Token", "RAKEN") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply reached");
        _mint(to, amount);
    }
}