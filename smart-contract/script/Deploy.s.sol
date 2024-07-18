// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/RAVT.sol";
import "../src/Raken.sol";
import "../src/RazzersAttributes.sol";
import "../src/Razzers.sol";
import "../src/BattleZone.sol";
import "../src/Multicall2.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        RAVT ravt = new RAVT();
        console.log("RAVT Contract deployed to: ", address(ravt));

        Raken raken = new Raken();
        console.log("Raken Contract deployed to: ", address(raken));

        RazzersAttributes razzersAttributes = new RazzersAttributes(address(raken));
        console.log("RazzersAttributes Contract deployed to: ", address(razzersAttributes));

        Razzers razzers = new Razzers(address(ravt), address(raken), address(razzersAttributes));
        console.log("Razzers Contract deployed to: ", address(razzers));

        BattleZone battleZone = new BattleZone(address(ravt),  address(razzersAttributes), address(razzers));
        console.log("BattleZone Contract deployed to: ", address(battleZone));

        Multicall2 multicall2 = new Multicall2();
        console.log("Multicall2 Contract deployed to: ", address(multicall2));

        vm.stopBroadcast();
    }
}