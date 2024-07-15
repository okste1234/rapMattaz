import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal"
import { useWeb3ModalAccount } from "@web3modal/ethers/react"
import Image, { StaticImageData } from "next/image"


export const WalletConnected = ({ username, icon }: { username: string | undefined, icon: StaticImageData }) => {
    const { chainId } = useWeb3ModalAccount()
    return (
        <span className="flex items-center gap-1">
            {
                chainId !== SUPPORTED_CHAIN_ID ? (
                    <span className="text-red-500">Switch to base</span>
                ) : (
                    <>
                        <span className="w-[24px] h-[24px] rounded-full overflow-hidden">
                            <Image src={icon} alt="Profile Icon" className="w-full h-full" width={160} height={160} quality={100} priority />
                        </span>
                        <span>{username}</span>
                    </>
                )
            }

        </span>
    )
}