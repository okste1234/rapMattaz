'use client'
import Image from "next/image"
import { artiste, fan } from "../../../public"
import Logo from "../shared/Logo"
import { useState } from "react"
import { FaCircleCheck } from "react-icons/fa6"
import useSignUp from "@/hooks/useSignUp"
import { toast } from "sonner"

const trackList = [
    {
        id: 1,
        name: "Artiste",
        img: artiste
    },
    {
        id: 0,
        name: "Fan",
        img: fan
    }
]

const Tracks = () => {
    const [activeSelection, setActiveSelection] = useState<number | null>(null)

    const signUp = useSignUp()

    const handleSelect = (userTrackId: number) => {
        setActiveSelection(userTrackId)

      
    }

    const handleSignUp = () => {
        const username = localStorage.getItem("username")
        const fileUrl = localStorage.getItem("profileImage")

        if (activeSelection == null) {
            toast.error("choose a track")
        }

        if (username && fileUrl) {
            console.log("Sign up data:", { username, fileUrl, activeSelection })
            signUp(username, fileUrl, activeSelection)        
        } else {
            console.error("Username or file URL not found in localStorage")
        }
    }

    return (
        <section className="w-full flex justify-center">
            <main className="w-full md:w-[540px] md:h-[609px] h-[550px] flex flex-col items-center justify-center gap-4 bg-[#28233c] md:px-10 px-4 rounded-lg border border-[#FFFFFF]/[10%]">

                <div className="flex gap-2 items-center">
                    <Logo className="w-[26px] h-[28px]" />
                    <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
                </div>

                <div className="flex flex-col ">
                    <h2 className="text-[#F3F1FD] text-center font-Bebas uppercase text-4xl">Choose your track</h2>
                    <p className="text-[#D6D1FA] text-center text-xs capitalize font-extralight">
                        Connect your wallet to create account
                    </p>
                </div>

                <div className="w-full grid grid-cols-2 md:gap-6 gap-3 my-5">
                    {
                        trackList.map((track) => (
                            <div onClick={() => handleSelect(track.id)} className={`flex flex-col items-center gap-2 p-2 md:h-[265px] h-[200px] rounded-2xl relative border border-[#FFFFFF]/[10%] transition-all duration-200 hover:bg-[#FFFFFF]/[25%] cursor-pointer ${track.id === activeSelection ? "bg-[#FFFFFF]/[25%]" : "bg-[#FFFFFF]/[6%]"}`} key={track.id}>
                                <div className="w-full h-[209px]">
                                    <Image src={track.img} alt={track.name} className="w-full h-full" width={772} height={836} quality={100} priority />
                                </div>
                                <h4 className="text-gray-100 text-center font-Bebas text-xl">{track.name}</h4>

                                {
                                    track.id === activeSelection ?
                                        <div className="absolute top-4 left-4">
                                            <FaCircleCheck className="text-2xl text-[#503BE8]" />
                                        </div>
                                        :
                                        null
                                }

                            </div>
                        ))
                    }
                </div>

                <button onClick={() => handleSignUp()} className="w-full h-[52px] flex items-center justify-center gap-1 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                    Select Track
                </button>
            </main>
        </section>
    )
}

export default Tracks
