"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { isSupportedChain } from "@/utils/chain";
import { getProvider } from "@/utils/provider";
import { getRazzersContract } from "@/utils/contract";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useClaimRAVT = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter()

  return useCallback(
    async () => {
      if (!isSupportedChain(chainId)) return toast.error("wrong network | Connect your wallet");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getRazzersContract(signer);

      try {
        const transaction = await contract.claimRAVT();
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          toast.success("token claimed!");
          return router.push('/battles')
        }

        toast.error("failed!");
      } catch (error: unknown) {
        console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "User not registered") {
          errorText = "please register first to claim token!";
        }
        else if (err?.reason === "RAVT already claimed") {
          errorText = "Can't claim twice!";
        }
        else {
            console.log(err?.message);
            
          errorText ="trying to resolve error!";
        }

        toast.error(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider]
  );
};

export default useClaimRAVT;
