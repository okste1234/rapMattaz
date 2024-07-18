// "use client";

// import { useState, useEffect } from 'react';
// import { getContract, getMulticallContract } from '@/utils/constant/contract';
// import { readOnlyProvider } from '@/utils/constant/provider';
// import Abi1 from '@/utils/constant/abi.json';
// import { ethers } from 'ethers';
// import { useLatestBlock } from './useLatestBlock';

// const useLotteryInfo = () => {
//   const [listing, setListing] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   const newBlock = useLatestBlock();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const itf = new ethers.Interface(Abi1);
//         const multicallContract = getMulticallContract(readOnlyProvider);
//         const LotXcontract = getContract(readOnlyProvider);

//         const lotteryCounter = await LotXcontract.lotteryCounter();

//         let calls = [];
//         for (let i = 1; i <= Number(lotteryCounter); i++) {
//           calls.push({
//             target: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
//             callData: itf.encodeFunctionData("getLotteryInfo", [i]),
//           });
//         }

//         for (let i = 1; i <= Number(lotteryCounter); i++) {
//           calls.push({
//             target: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
//             callData: itf.encodeFunctionData("getWinners", [i]),
//           });
//         }

//         const callResults = await multicallContract.tryAggregate.staticCall(
//           false,
//           calls
//         );

//         const getLotteryInfo = [];
//         for (let i = 0; i < Number(lotteryCounter); i++) {
//           getLotteryInfo.push(
//             itf.decodeFunctionResult("getLotteryInfo", callResults[i][1])
//           );
//         }

//         const getWinners = [];
//         for (let i = Number(lotteryCounter); i < callResults.length; i++) {
//           getWinners.push(
//             itf.decodeFunctionResult("getWinners", callResults[i][1])
//           );
//         }

//         // console.log("GetWinners ", getWinners);

//         let winnersArray = [];
//         for (let i = 0; i < getWinners.length; i++) {
//           let winners = [];
//           for (let j = 0; j < getWinners[i][0].length; j++) {
//             winners.push({
//               winner: getWinners[i][0][j].winner,
//               amount: Number(getWinners[i][0][j].amount)
//             });
//           }
//           winnersArray.push(winners);
//         }

//         let prop = [];
//         for (let i = 0; i < getLotteryInfo.length; i++) {
//           prop.push({
//             id: Number(getLotteryInfo[i][0]),
//             manager: getLotteryInfo[i][1],
//             players: getLotteryInfo[i][2],
//             endTime: Number(getLotteryInfo[i][3]),
//             winners: winnersArray[i] || [],
//             balance: Number(getLotteryInfo[i][4]),
//             isActive: getLotteryInfo[i][5],
//           });
//         }
//         setListing(prop);

//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error);
//         } else {
//           setError(new Error('An unknown error occurred'));
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [newBlock]);

//   return { listing, loading, error };
// };

// export default useLotteryInfo;
