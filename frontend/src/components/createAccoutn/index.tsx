'use client'
import { useState } from "react"
import Logo from "../shared/Logo"


const CreateAccount = () => {
    const [username, setUsername] = useState<string>("")
    return (
        <section className="w-full flex justify-center">
            <main className="w-full md:w-[540px] h-[417px] flex flex-col items-center justify-center gap-4 bg-[#28233c] md:px-10 px-4 rounded-lg border border-[#FFFFFF]/[10%]">

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

                <div className="flex flex-col w-full mt-6">
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