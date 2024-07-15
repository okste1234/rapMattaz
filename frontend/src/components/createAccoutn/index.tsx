'use client'
import { useCallback, useState } from "react"
import Logo from "../shared/Logo"
import Image from "next/image";
import placeholder from "../../../public/placeholder.png"


const CreateAccount = () => {
    const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
    const [username, setUsername] = useState<string>("")

    const handleSelectImage = ({ target }: { target: any }) => {
        setSelectedFile(target.files[0]);
    };


    return (
        <section className="w-full flex justify-center">
            <main className="w-full md:w-[540px] h-[611px] flex flex-col items-center justify-center gap-4 bg-[#28233c] md:px-10 px-4 rounded-lg border border-[#FFFFFF]/[10%]">

                <div className="flex gap-2 items-center">
                    <Logo className="w-[26px] h-[28px]" />
                    <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
                </div>

                <div className="flex flex-col ">
                    <h2 className="text-[#F3F1FD] text-center font-Bebas uppercase text-4xl">select a username</h2>
                    <p className="text-[#D6D1FA] text-center text-xs capitalize font-extralight">
                        Connect your wallet to create account
                    </p>
                </div>


                <div className="flex flex-col gap-3 items-center my-5">
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
                        className="hidden"
                        id="selectFile"
                        onChange={handleSelectImage}
                    />
                    <label
                        htmlFor="selectFile"
                        className=" flex items-center justify-center cursor-pointer w-[95px] h-[32px] border-[0.5px] border-[#7464ED] font-Bebas tracking-wider text-gray-100 rounded-md">
                        upload image
                    </label>
                </div>


                <div className="flex flex-col w-full ">
                    <label htmlFor="username" className="block text-sm text-gray-100 ml-1 mb-0.5">Username</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="w-full py-2.5 px-3 border border-[#FFFFFF]/[10%] rounded-md bg-transparent font-extralight text-sm placeholder:text-[#ffffff]/[40%] transition-all duration-200 focus:border-[#ffffff]/[30%] text-gray-100 outline-none" />
                </div>

                <button className="w-full h-[52px] flex items-center justify-center gap-1 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                    Next
                </button>
            </main>
        </section>
    )
}

export default CreateAccount