"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { isSupportedChain } from "@/utils/chain";
import { getProvider } from "@/utils/provider";
import { getRazzersContract } from "@/utils/contract";
import { toast } from "sonner";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useCreateBattle = (username:string, imageURL:string, userType: any) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async () => {
      if (!isSupportedChain(chainId)) return toast.error("wrong network | Connect your wallet");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getRazzersContract(signer);

      try {
        const transaction = await contract.registerUser(username, imageURL, userType);
        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("registered successfully!");
        }

        toast.error("registeration failed!");
      } catch (error: unknown) {
        console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Username already taken") {
          errorText = "Username taken, please choose another!";
        }
        else if (err?.reason === "User already registered") {
          errorText = "Can't register twice!";
        }
        else {
            console.log(err?.message);
            
          errorText ="trying to resolve error!";
        }

        toast.error(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider,username,userType,imageURL]
  );
};

export default useCreateBattle;
