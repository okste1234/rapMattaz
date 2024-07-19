"use client";

import { getRAVTContract } from "@/utils/contract";
import { readOnlyProvider } from "@/utils/provider";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useBalanceOf = () => {
  const [data, setData] = useState<number | null>(null);
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const contract = getRAVTContract(readOnlyProvider);
        const res = await contract.balanceOf(address);

        const bal = ethers.formatEther(res); 
        setData(Number(bal)); 
      } catch (err) {
        console.error(err);
      }
    };

    if (address) {
      fetchUserStatus();
    }
  }, [address]);

  return data;
};

export default useBalanceOf;
