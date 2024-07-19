import { useState, useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getRAVTContract } from "@/utils/contract";
import { readOnlyProvider } from "@/utils/provider";
import { envVars } from "@/utils/env";

const useAllowance = () => {
    const [val, setVal] = useState(0);
    const { address } = useWeb3ModalAccount()



    useEffect(() => {
        const contract = getRAVTContract(readOnlyProvider);

        contract
            .allowance(address, envVars.razzersContract)
            .then((res) => {
                console.log("RESPONSESSSS", res);
                setVal(Number(res))
            })
            .catch((err) => {
                console.error("error fetching registration status: ", err);
                setVal(0);
            });
    }, [address]);

    return val;
}

export default useAllowance;