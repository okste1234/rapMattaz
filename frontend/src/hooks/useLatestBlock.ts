"use client"

import { ethers } from "ethers";
import { useEffect, useState } from "react";

export function useLatestBlock() {
    const [blockNumber, setBlockNumber] = useState(undefined);
    useEffect(() => {
        const wssProvider = new ethers.WebSocketProvider(
            process.env.NEXT_PUBLIC__WSS_RPC_URL || ""
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
