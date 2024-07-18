import { ethers } from "ethers";
import Razzers from "./abi/Razzers.json";
import multicallAbi from './abi/multicallAbi.json'
import att from "./abi/RazzersAttributes.json";
import battle from "./abi/BattleZone.json";
import ravt from "./abi/RAVT.json";
import raken from "./abi/Raken.json";
import { envVars } from "./env";


export const getRazzersContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
        envVars.razzersContract || "",
        Razzers,
        providerOrSigner
    );

export const getRazzersAttributesContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
        envVars.razzersAttContract || "",
        att,
        providerOrSigner
    );


export const getBattleZoneContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
        envVars.battleZoneContract || "",
        battle,
        providerOrSigner
    );

export const getRAVTContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
        envVars.ravtContract || "",
        ravt,
        providerOrSigner
    );

export const getRakenContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
        envVars.rakenContract || "",
        raken,
        providerOrSigner
    );

export const getMulticallContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
new ethers.Contract(
    envVars.multicallContract || "",
    multicallAbi,
    providerOrSigner
);
