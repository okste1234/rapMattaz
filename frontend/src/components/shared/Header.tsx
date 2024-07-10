'use client'
import Link from "next/link"
import useSound from 'use-sound';
import { useRef, useState } from "react";
import { IoLogoSoundcloud } from "react-icons/io5";
import { IoMdVolumeOff } from "react-icons/io";


const Header = () => {
    const [play, { stop }] = useSound("/rapbeat.mp3", { volume: 0.3, loop: true, });

    const [isPlaying, setIsPlaying] = useState(false);

    const playButtonRef = useRef(null);

    const handlePlay = () => {
        play()
        setIsPlaying(true)
    }

    const handleStop = () => {
        stop()
        setIsPlaying(false)
    }

    return (
        <header className="w-full z-50 flex justify-between items-center px-4 border border-[#FFFFFF]/[15%] bg-[#28233c] h-[56px] rounded-md">
            <Link href={`/`} className="flex gap-1 items-center">
                <Beats />
                <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
            </Link>

            <div className="flex justify-center items-center gap-3">

                <div>
                    {isPlaying ? (
                        <button onClick={handleStop} className="text-gray-100">
                            <IoMdVolumeOff />
                        </button>
                    ) : (
                        <button ref={playButtonRef} onClick={handlePlay} className="text-gray-100">
                            <IoLogoSoundcloud />
                        </button>
                    )}
                </div>

                <button className="px-6 h-[32px] bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] font-Bebas rounded-md text-sm uppercase text-gray-50">Connect Wallet</button>

            </div>
        </header>
    )
}

export default Header

const Beats = () => {
    return (
        <div className="anime-beats">
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
        </div>
    )
}