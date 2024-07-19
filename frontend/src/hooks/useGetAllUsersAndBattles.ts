"use client";

import { useState, useEffect } from 'react';
import Abi1 from '@/utils/abi/Razzers.json';
import Abi2 from '@/utils/abi/BattleZone.json';
import Abi3 from '@/utils/abi/RazzersAttributes.json';
import { ethers } from 'ethers';
import { readOnlyProvider } from '@/utils/provider';
import { getBattleZoneContract, getMulticallContract, getRazzersContract } from '@/utils/contract';
import { envVars } from '@/utils/env';

const useGetAllUsersAndBattles = () => {
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const [battleInfo, setBattleInfo] = useState<any[]>([]);
  const [rapperInfo, setRapperInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const itf = new ethers.Interface(Abi1);
        const itf2 = new ethers.Interface(Abi2);
        const itf3 = new ethers.Interface(Abi3);
        const multicallContract = getMulticallContract(readOnlyProvider);
        const contract = getRazzersContract(readOnlyProvider);
        const contract2 = getBattleZoneContract(readOnlyProvider);

        const nextUserId = await contract.nextUserId();
        const battleCounter = await contract2.battleCounter()
          
        let calls = [];
        for (let i = 1; i < Number(nextUserId); i++) {
          calls.push({
            target: envVars.razzersContract,
            callData: itf.encodeFunctionData("getUserById", [i]),
          });
        }

        for (let i = 0; i <= Number(battleCounter); i++) {
          calls.push({
            target: envVars.battleZoneContract,
            callData: itf2.encodeFunctionData("getBattleDetails", [i]),
          });
        }

        const callResults = await multicallContract.tryAggregate.staticCall(
          false,
          calls
        );

        const getAllUserInfo = [];
        for (let i = 0; i < (Number(nextUserId)-1); i++) {
          getAllUserInfo.push(
            itf.decodeFunctionResult("getUserById", callResults[i][1])
          );
        }
        // console.log("allUserInfo ", getAllUserInfo);
        
        const getBattlesInfo = [];
        for (let i = Number(nextUserId); i < callResults.length; i++) {
          getBattlesInfo.push(
            itf2.decodeFunctionResult("getBattleDetails", callResults[i][1])
          );
        }

        let allUserInfoArray = [];
        for (let i = 0; i < getAllUserInfo.length; i++) {
          allUserInfoArray.push({
            wallet: getAllUserInfo[i][0][0],
            username: getAllUserInfo[i][0][1],
            imageURL: getAllUserInfo[i][0][2],
            userType: Number(getAllUserInfo[i][0][3]),
            following: getAllUserInfo[i][0][4].length || [],
            hasClaimedRAVT: Boolean(getAllUserInfo[i][0][5]),
          });
        }
          // console.log("allUserInfo ", allUserInfoArray);
          
        let battleInfoArray = [];
        for (let i = 0; i < getBattlesInfo.length; i++) {
          battleInfoArray.push({
            challenger: getBattlesInfo[i][0],
            opponent: getBattlesInfo[i][1],
            challengeTime: Number(getBattlesInfo[i][2]),
            acceptDeadline: Number(getBattlesInfo[i][3]),
            startTime: Number(getBattlesInfo[i][4]),
            endTime: Number(getBattlesInfo[i][5]),
            voteEndTime: Number(getBattlesInfo[i][6]),
            winner: getBattlesInfo[i][7],
            status: getBattlesInfo[i][8],
            hasVoted: getBattlesInfo[i][9],
            votes: getBattlesInfo[i][10],
            streamingLink: getBattlesInfo[i][11],
          });
        }
          
        // console.log("battleInfoArray ", battleInfoArray);

        setUserInfo(allUserInfoArray);
        setBattleInfo(battleInfoArray)

        const filteredUsers = allUserInfoArray.filter(user => user.userType === 1);

      

        let calls2 = [];
        for (let i = 0; i < filteredUsers.length; i++) {
          calls2.push({
            target: envVars.razzersAttContract,
            callData: itf3.encodeFunctionData("getRapperInfo", [filteredUsers[i].wallet]),
          });
        }

        const callResults2 = await multicallContract.tryAggregate.staticCall(
          false,
          calls2
        );

        const decodedResponses = callResults2.map((x:any) =>
          itf3.decodeFunctionResult("getRapperInfo", x[1])
        );

        let attributeInfoArray = [];
        for (let i = 0; i < decodedResponses.length; i++) {
          attributeInfoArray.push({
            ravel: Number(decodedResponses[i][0]),
            flow: Number(decodedResponses[i][1]),
            lyrics: Number(decodedResponses[i][2]),
            charisma: Number(decodedResponses[i][3]),
            battleWins: Number(decodedResponses[i][4]),
            fanBase: Number(decodedResponses[i][5]),
            votes: Number(decodedResponses[i][6]),
            rapoint: Number(decodedResponses[i][7]),
            unconvertedRapoint: Number(decodedResponses[i][8]),
          });
        }
        // console.log(decodedResponses[0]);
        setRapperInfo(attributeInfoArray);

      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userInfo, battleInfo,rapperInfo, loading, error };
};

export default useGetAllUsersAndBattles;