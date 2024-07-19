"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { isSupportedChain } from "@/utils/chain";
import { getProvider } from "@/utils/provider";
import { getRazzersContract } from "@/utils/contract";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useGetStatus from "./useGetStatus";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useFollowArtist = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const router = useRouter()
  const status = useGetStatus()
    
  return useCallback(
    async (artist:any) => {
      if (!isSupportedChain(chainId)) return toast.error("wrong network | Connect your wallet"); 
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getRazzersContract(signer);

      try {
        const transaction = await contract.followArtist(artist);
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("following!");
          // return router.push('/battles')
        }

        toast.error("failed!");
      } catch (error: unknown) {
        console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "User not registered") {
          errorText = "register to follow your favourite artiste!";
        }
        else if (err?.reason === "Can only follow rappers") {
          errorText = "can only follow rappers!";
        }
        else if (err?.reason === "Cannot follow yourself") {
          errorText = "cannot follow yourself!";
        }
        else if (err?.reason === "Already following this artist") {
          errorText = "already following!";
        }
        else {
            console.log(err?.message);
            
          errorText ="trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider]
  );
};

export default useFollowArtist;
