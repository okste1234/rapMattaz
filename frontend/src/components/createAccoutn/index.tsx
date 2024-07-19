'use client'
import { useEffect, useState } from "react"
import Logo from "../shared/Logo"
import Image from "next/image";
import placeholder from "../../../public/placeholder.png"
import { useRouter } from "next/navigation";
import useGetStatus from "@/hooks/useGetStatus";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import axios from "axios";
import { toast } from "sonner";
import { isSupportedChain } from "@/utils/chain";


const CreateAccount = () => {
    const [selectedFile, setSelectedFile] = useState<any>();
    const [username, setUsername] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);

    const { address,chainId, isConnected } = useWeb3ModalAccount();
    const router = useRouter()

    const details = useGetStatus()

    if (details?.hasClaimedRAVT === true) {
        router.push('/battles')
    }
    
    
    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isConnected && !isSupportedChain(chainId)) return toast.warning("wrong network | Connect your wallet"); 
        try {
          setIsLoading(true);
          if (isLoading) {
            toast.loading("Uploading...");
          }

            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
                        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
                    },
                }
            );
            const fileUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            const tx = {
                image: fileUrl,
            };

            // Save both username and imageURL in localStorage
            localStorage.setItem("username", username);
            localStorage.setItem("profileImage", fileUrl);            

        } catch (error) {
            console.log("Pinata API Error:", error);
            toast.error("Error uploading");
            setIsLoading(false);
        } finally {
            toast.success("Uploaded");
            setIsLoading(false);
            router.push('/choosetrack')
        }
    };

    return (
        <section className="w-full flex justify-center">
            <main className="w-full md:w-[540px] h-[611px] flex flex-col items-center justify-center gap-4 bg-[#28233c] md:px-10 px-4 rounded-lg border border-[#FFFFFF]/[10%]">
                <div className="flex gap-2 items-center">
                    <Logo className="w-[26px] h-[28px]" />
                    <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
                </div>

                <div className="flex flex-col ">
                    <h2 className="text-[#F3F1FD] text-center font-Bebas uppercase text-4xl">Select a username</h2>
                    <p className="text-[#D6D1FA] text-center text-xs capitalize font-extralight">
                        Connect your wallet to create account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center my-5">
                    <div className="w-[110px] h-[110px] rounded-full overflow-hidden">
                        {selectedFile ? (
                            <Image
                                src={URL.createObjectURL(selectedFile)}
                                alt="profile"
                                className="w-full h-full object-cover rounded-full"
                                width={440}
                                height={440}
                                priority
                                quality={100}
                            />
                        ) : (
                            <Image
                                src={placeholder}
                                alt="profile placeholder"
                                className="w-full h-full"
                                width={440}
                                height={440}
                                priority
                                quality={100}
                            />
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        id="selectFile"
                        onChange={handleSelectImage}
                    />
                    <label
                        htmlFor="selectFile"
                        className="flex items-center justify-center cursor-pointer w-[95px] h-[32px] border-[0.5px] border-[#7464ED] font-Bebas tracking-wider text-gray-100 rounded-md">
                        Upload image
                    </label>

                    <div className="flex flex-col w-full ">
                        <label htmlFor="username" className="block text-sm text-gray-100 ml-1 mb-0.5">Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="w-full py-2.5 px-3 border border-[#FFFFFF]/[10%] rounded-md bg-transparent font-extralight text-sm placeholder:text-[#ffffff]/[40%] transition-all duration-200 focus:border-[#ffffff]/[30%] text-gray-100 outline-none" />
                    </div>

                  
                    <button type="submit" className="w-full h-[52px] flex items-center justify-center gap-1 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                        Create Account
                    </button>
                </form>
            </main>
        </section>
    )
}

export default CreateAccount
