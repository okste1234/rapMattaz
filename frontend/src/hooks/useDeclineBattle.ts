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

const useDeclineBattle = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const router = useRouter()

  return useCallback(
    async(battleId:number) => {
      if (!isSupportedChain(chainId)) return toast.warning("wrong network | Connect your wallet");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getBattleZoneContract(signer);

      try {
        const transaction = await contract.declineBattle(battleId);
        const receipt = await transaction.wait();

        if (receipt.status) {
          return toast.success("battle declined!");
        }

        toast.error("failed!");
      } catch (error: unknown) {
        // console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Only the opponent can decline") {
          errorText = "only the opponent can decline!";
        }
        else if (err?.reason === "Battle is not in pending state") {
          errorText = "only pending battles can be acccepted!";
        }
        else if (err?.reason === "Accept deadline has passed") {
          errorText = "can't accept battle, timeout error";
          router.push('/battle')
          
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

export default useDeclineBattle;
