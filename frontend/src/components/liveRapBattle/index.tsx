'use client'
import Image from "next/image"
import { IoIosFlash, IoIosTime } from "react-icons/io"
import liveplaceholder from "../../../public/livePlaceholder.png"
import flash from "../../../public/flash.png"
import { Beats } from "../shared/Header"
import { RxCaretDown } from 'react-icons/rx'
import { IoClose, IoCloseOutline } from "react-icons/io5"
import { useMemo, useState } from "react"
import Logo from "../shared/Logo"
import { BsFillMicMuteFill } from "react-icons/bs"
import { FaVideo } from "react-icons/fa6"
import { LiaSignOutAltSolid } from "react-icons/lia"
import { HiOutlineArrowNarrowLeft, HiUsers } from "react-icons/hi"
import { AnimatePresence, motion } from 'framer-motion'
import { modalVariants } from '../shared/Animations'
import { FansList } from "../data/battles"
import singlecoin from "../../../public/singlecoin.png"
import { useRouter } from "next/navigation"

const LiveRapping = () => {
    const [open, setOpen] = useState(false)

    const router = useRouter()

    // modal state
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const fans = useMemo(() => FansList, [])

    const handleOpenState = () => {
        setOpen(!open)
    }
    return (
        <section className="w-full flex flex-col items-center gap-4 pt-4 md:pt-0 relative">
            <p className="w-[80px] h-[46px] bg-[#D6D1FA] flex justify-center items-center gap-1 rounded-md">
                <IoIosTime className="text-[#705EED] text-3xl -mt-1" />
                <span className=" font-Bebas text-[#0B0533] text-3xl">60</span>
            </p>

            <main className="w-full md:h-[470px] h-[300px] flex items-center md:gap-3 md:justify-center justify-between mt-5">
                <div className="md:w-[425px] w-[200px] h-full relative overflow-hidden border border-[#978DEF] rounded-md">
                    <Image src={liveplaceholder} alt="liveImg" className="h-full w-full object-cover" width={2025} height={1200} quality={100} priority />

                    <div className=" absolute bottom-0 left-0 flex w-full px-3 pb-3 justify-between items-center">
                        <button onClick={handleOpenState} className="flex gap-1.5 items-center text-sm text-[#D6D1FA]">
                            Drake
                            <RxCaretDown className="text-xl hidden md:flex" />
                        </button>

                        <h4 className="bg-[#fff]/[5%] border border-[#fff]/[10%] rounded-md flex items-center px-2 py-1 backdrop-blur-md">
                            <IoIosFlash className="text-xl text-amber-500" />
                            <span className="text-gray-200 text-sm font-Bebas">42 pts</span>
                        </h4>
                    </div>

                    {/* details */}
                    <div className={`w-full md:block hidden bottom-0 left-0 absolute bg-[#fff]/[5%] border border-[#fff]/[10%] backdrop-blur-xl z-30 transition-all duration-300 ${open ? "h-[200px]" : "h-0"}`}>
                        <div className="w-full flex items-start md:gap-6 md:p-4 p-3 relative">
                            <div className="md:flex hidden flex-col w-[30%]">
                                <h3 className="text-gray-300 font-Bebas text-center md:text-base text-sm">WhiteGhost</h3>
                                <p className="text-[#705CEF] font-Bebas text-center px-2 py-1 border md:text-sm text-xs border-[#FFFFFF]/[10%] rounded-md"><span className="text-gray-100">5</span> - ra points</p>
                            </div>
                            <ul className="w-[50%] flex flex-col px-2 pt-[10px] text-white list-none">
                                <li className="w-full flex justify-between items-center  font-Bebas text-base">
                                    <span >Rap points</span>
                                    <span>3</span>
                                </li>
                                <li className="w-full flex justify-between items-center font-Bebas text-base">
                                    <span >Battle wins</span>
                                    <span>98</span>
                                </li>
                                <li className="w-full flex justify-between items-center font-Bebas text-base">
                                    <span >fan base</span>
                                    <span>98</span>
                                </li>
                                <li className="w-full flex justify-between items-center font-Bebas text-base">
                                    <span >lyrics</span>
                                    <span>98</span>
                                </li>
                                <li className="w-full flex justify-between items-center font-Bebas text-base">
                                    <span >charisma</span>
                                    <span>98</span>
                                </li>
                                <li className="w-full flex justify-between items-center font-Bebas text-base">
                                    <span >flow</span>
                                    <span>98</span>
                                </li>
                            </ul>
                            <button onClick={handleOpenState} className="text-gray-100 absolute right-4 top-4"><IoClose className="text-xl" /></button>
                        </div>
                    </div>
                </div>

                <div className=" relative w-[51px] h-[100px]">
                    <Image src={flash} alt='image' width={204} height={401} quality={100} priority className='w-full h-full' />
                    <span className=' absolute top-7 md:left-3 left-2 font-Bebas text-[#F3F1FD] md:text-4xl text-3xl'>Vs</span>
                </div>

                <div className="md:w-[425px] w-[200px] h-full relative overflow-hidden border border-[#978DEF] rounded-md flex flex-col items-center justify-center gap-3 bg-[#0B0533]">
                    <Beats />
                    <p className="text-[#978DEF] md:text-sm text-[0.65rem] text-center">Waiting for opponent to join</p>
                </div>
            </main>

            {/* controls */}
            <main className="w-full flex flex-wrap md:justify-between justify-center gap-2 md:gap-0 items-center md:px-24 md:my-6 py-4">
                <div className="flex gap-1 items-center">
                    <Logo className="40px 40px" />
                    <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
                </div>

                <div className="px-3 py-3 flex justify-center gap-3 items-center bg-[#fff]/[5%] border border-[#fff]/[10%] backdrop-blur-md rounded-[12px]">
                    {/* mic */}
                    <button className="flex flex-col items-center justify-center bg-[#fff]/[5%] rounded-[8px] backdrop-blur-md text-white px-2 py-2">
                        <BsFillMicMuteFill className="text-sm" />
                        <small className="text-gray-300 text-[0.6rem]">Unmute</small>
                    </button>
                    {/* video */}
                    <button className="flex flex-col items-center justify-center bg-[#fff]/[5%] rounded-[8px] backdrop-blur-md text-white px-2 py-2">
                        <FaVideo className="text-sm" />
                        <small className="text-gray-300 text-[0.6rem]">Turn off</small>
                    </button>
                    {/* timer */}
                    <button
                        type="button"
                        className={`px-5 py-2 border font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8]`}>
                        Start timer
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center bg-[#fff]/[5%] rounded-[8px] backdrop-blur-md text-white px-3 py-2">
                        <HiUsers className="text-3xl" />
                        <small className="text-[#6957EB] font-bold
                         px-1.5 py-1 text-xs bg-[#BEB6F6] rounded-lg">99+</small>
                    </button>

                    {/* quit */}
                    <button
                        type="button"
                        className={`px-5 py-2 border font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50 flex items-center gap-1 bg-[#A91919] outline-none border-none`}>
                        <LiaSignOutAltSolid />
                        QUit battle
                    </button>
                </div>
            </main>

            {/* Modal for creating a challenge  */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={modalVariants}
                        className="md:w-[250px] w-full h-screen border border-[#FFFFFF]/[10%] bg-[#150822] shadow-lg shadow-[#000000]/[61%] fixed top-0 right-0 z-[999] overflow-y-auto rounded-[20px]"
                    >
                        <main className="w-full h-full flex flex-col ">

                            <div className="w-full sticky z-20 top-0 py-6 bg-[#150822] md:px-6 px-4 flex justify-between items-center">
                                <h1 className="text-gray-100 md:text-3xl text-2xl font-Bebas">fans</h1>
                                <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-100">
                                    <IoCloseOutline className="text-3xl" />
                                </button>
                            </div>


                            <div className="w-full flex flex-col items-start gap-4">

                                <div className='w-full grid'>
                                    {
                                        fans.map((art, index) => (
                                            <div className='w-full flex justify-between items-center py-2 border-b last:border-none border-[#fff]/[10%] md:px-6 px-4' key={index}>
                                                <div className="flex items-center gap-2">
                                                    <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                                                        <Image src={art.img} alt={art.name} width={376} height={376} quality={100} className='w-full h-full object-cover' priority />
                                                    </div>
                                                    <h3 className="text-gray-100 text-center tracking-wider capitalize ">{art.name}</h3>
                                                </div>
                                                <div className="rounded-md px-1.5 py-1 flex justify-center items-center gap-1 bg-[#28233c] border border-[#FFFFFF]/[10%]">
                                                    <div className="w-[16px] h-[16px]">
                                                        <Image src={singlecoin} alt='image' width={132} height={128} quality={100} priority className='w-full h-full' />
                                                    </div>
                                                    <p className='text-[#F3F1FD] text-sm font-Bebas'>{art.points}{" "}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Go back button */}
            <button
                type="button"
                onClick={() => router.back()}
                className={`px-4 py-1.5 border absolute top-0 left-0 font-Bebas rounded-md text-gray-50 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8]`}>
                <HiOutlineArrowNarrowLeft className="md:text-2xl text-xl" />
            </button>
        </section>
    )
}

export default LiveRapping