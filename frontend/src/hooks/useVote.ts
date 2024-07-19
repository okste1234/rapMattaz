"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { isSupportedChain } from "@/utils/chain";
import { getProvider } from "@/utils/provider";
import { getBattleZoneContract, getRazzersContract } from "@/utils/contract";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useVote = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const router = useRouter()

  return useCallback(
    async(battleId:number, voteFor:any) => {
      if (!isSupportedChain(chainId)) return toast.warning("wrong network | Connect your wallet");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getBattleZoneContract(signer);

      try {
        const transaction = await contract.vote(battleId,voteFor);
        const receipt = await transaction.wait();

        if (receipt.status) {
          return toast.success("voted successfully!");
        }

        toast.error("failed!");
      } catch (error: unknown) {
        // console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Battle is not in accepted state") {
          errorText = "challenge has not started!";
        }
        else if (err?.reason === "Voting is not open") {
          errorText = "challenge has not started!";
        }
        else if (err?.reason === "Voting is closed") {
          errorText = "voting process ended";
          
        }
        else if (err?.reason === "User has already voted") {
          errorText = "Sorry, can't vote twice";
        }
        else {
            // console.log(err?.message);
            
          errorText ="trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider]
  );
};

export default useVote;
