
import { getRazzersContract } from "@/utils/contract";
import { readOnlyProvider } from "@/utils/provider";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useEffect, useState } from "react";

const useGetStatus = () => {
    const [data, setData] = useState();
    const { address } = useWeb3ModalAccount();

    useEffect(() => {
        const contract = getRazzersContract(readOnlyProvider)

        contract.users(address)
            .then((res) => {
                // console.log(res);
                // console.log("RESULT", res.hasClaimedRAVT);
                setData(res.hasClaimedRAVT);

            })
            .catch((err) => {
              console.error(err);
            }
            )
    }, [address]);

    return data;
};

export default useGetStatus;




//  let prop = [];
    //   prop.push({
    //     wallet: Number(transaction[0]),
    //     username: transaction[1],
    //     imageURL: transaction[2],
    //     userType: Number(transaction[3]),
    //     following: transaction[4],
    //     hasClaimedRAVT: transaction[5],
    //   })