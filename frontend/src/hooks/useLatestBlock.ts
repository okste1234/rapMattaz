"use client"

import { envVars } from "@/utils/env";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export function useLatestBlock() {
    const [blockNumber, setBlockNumber] = useState(undefined);
    useEffect(() => {
        const wssProvider = new ethers.WebSocketProvider(
            envVars.wssRPC || ""
        );
        // console.log("wssProvider: ", wssProvider);
        const onBlock = (newBlockNumber:any) => setBlockNumber(newBlockNumber);
        wssProvider.on("block", onBlock);
        return () => {
            wssProvider.off("block", onBlock);
        };
    }, []);

    return blockNumber;
}
