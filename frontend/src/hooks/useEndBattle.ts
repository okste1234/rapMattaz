"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { isSupportedChain } from "@/utils/chain";
import { getProvider } from "@/utils/provider";
import { getBattleZoneContract, getRazzersContract } from "@/utils/contract";
import { toast } from "sonner";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useEndBattle = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();


  return useCallback(
    async(battleId:number) => {
      if (!isSupportedChain(chainId)) return toast.warning("wrong network | Connect your wallet");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getBattleZoneContract(signer);

      try {
        const transaction = await contract.endBattle(battleId);
        const receipt = await transaction.wait();

        if (receipt.status) {
          return toast.success("ended successfully!");
        }

        toast.error("failed!");
      } catch (error: unknown) {
        // console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Battle is not in accepted state") {
          errorText = "challenge has not started!";
        }
        else if (err?.reason === "Battle has not ended") {
          errorText = "battle time still on!";
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

export default useEndBattle;
