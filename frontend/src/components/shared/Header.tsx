'use client'
import Link from "next/link"
import useSound from 'use-sound';
import { useEffect, useState } from "react";
import { FaBell, FaCrown } from "react-icons/fa6";
import { useSwitchNetwork, useWalletInfo, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { WalletConnected } from "./WalletConnected";
import profileImg from "../../../public/profileImg.jpeg"
import { AnimatePresence, motion } from "framer-motion";
import { modalVariants } from "./Animations";
import { IoCloseOutline } from "react-icons/io5";
import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";
import { LiaSignOutAltSolid } from "react-icons/lia";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import singlecoin from "../../../public/singlecoin.png"
import rapperNFT from "../../../public/rappermattaznft.jpeg"
import { IoIosNotificationsOutline } from "react-icons/io";

const Header = () => {
    const [play, { stop }] = useSound("/rapbeat.mp3", { volume: 0.3, loop: true, });

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openNotification, setOpenNotification] = useState<boolean>(false)

    const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();

    const handleSelectImage = ({ target }: { target: any }) => {
        setSelectedFile(target.files[0]);
    };

    const { open } = useWeb3Modal()
    const { address, isConnected, chainId } = useWeb3ModalAccount()
    const { walletInfo } = useWalletInfo()
    const { switchNetwork } = useSwitchNetwork()


    const walletConnect = () => {
        if (!isConnected) {
            open()
            play()
        } else if (isConnected && chainId !== SUPPORTED_CHAIN_ID) {
            switchNetwork(SUPPORTED_CHAIN_ID)
        } else {
            setIsOpen(!isOpen)
            stop()
        }
    }

    const formatAddress = (address: string | undefined) => {
        return `${address?.slice(0, 6)}...${address?.slice(-4)}`
    }

    const handleSignout = () => {
        setIsOpen(!isOpen)
        open()
    }

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    })

    return (
        <header className="w-full z-50 flex justify-between items-center px-4 border border-[#FFFFFF]/[15%] bg-[#28233c] h-[56px] rounded-md">
            <Link href={`/`} className="flex gap-1 items-center">
                <Beats />
                <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
            </Link>

            <div className="flex justify-center items-center gap-3 md:gap-4">

                <button onClick={() => setOpenNotification(!openNotification)} type="button" className="text-gray-100 relative">
                    <FaBell />
                    <div className="w-2 h-2 rounded-full bg-rose-500 absolute top-0 right-0"></div>
                </button>

                <button
                    onClick={walletConnect}
                    type="button"
                    className={`py-1 border font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50 ${isConnected ? "px-4 border-[#FFFFFF]/[15%]" : "bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8] px-6"}`}>
                    {
                        isConnected ? <WalletConnected username={`MI Abaga`} icon={profileImg} />
                            : <span>Connect Wallet</span>
                    }
                </button>

            </div>

            {/* profile settings */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={modalVariants}
                        className="md:w-[424px] w-full h-screen border border-[#FFFFFF]/[10%] bg-[#150822] shadow-lg shadow-[#000000]/[61%] fixed top-0 right-0 z-[999] overflow-y-auto rounded-[20px]"
                    >
                        <main className="w-full h-full flex flex-col ">

                            <div className="w-full sticky z-20 top-0 py-6 bg-[#150822] md:px-6 px-4 flex justify-between items-center">
                                <h1 className="text-gray-100 md:text-3xl text-2xl font-Bebas">Profile</h1>
                                <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-100">
                                    <IoCloseOutline className="text-3xl" />
                                </button>
                            </div>

                            <div className="w-full py-4 md:px-6 px-4 bg-[#FFFFFF]/[5%] border-y border-[#FFFFFF]/[10%] flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <span className="w-6 h-6 rounded-full overflow-hidden">
                                        <img src={walletInfo?.icon} alt="Icon" className="w-full h-full object-cover" />
                                    </span>
                                    <span className="text-gray-100">{formatAddress(address)}</span>
                                </div>
                                <button onClick={handleSignout} type="button" className="px-4 tracking-wider py-1 rounded-md border border-[#EB7A7A] flex justify-center items-center gap-1 font-Bebas text-[#EB7A7A]">
                                    <LiaSignOutAltSolid className="-mt-0.5" />
                                    Sign out
                                </button>
                            </div>

                            {/* profile update */}
                            <div className="flex flex-col gap-4 md:px-6 px-4 py-6">
                                <h1 className="text-gray-100 md:text-2xl text-xl font-Bebas">MI Abaga</h1>
                                <div className="flex gap-6 items-center">
                                    <div className="w-[74px] h-[74px] rounded-full relative ">
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
                                            <Image src={profileImg} alt="Profile Image" className="w-full h-full rounded-full" width={220} height={220} quality={100} priority />
                                        )}
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
                                            className=" absolute -right-1 p-1 rounded-full bottom-1 cursor-pointer bg-gray-100 border-[0.5px] border-[#7464ED] font-Bebas tracking-wider text-[#7464ED]">
                                            <FiEdit />
                                        </label>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-gray-100 md:text-lg text-base font-Bebas font-light">
                                            Profile Picture
                                        </h1>
                                        <small className="text-[#D6D1FA] -mt-1 mb-2 text-sm font-light">PNG or JPG (MAX. 300x300px)</small>
                                        <button type="button"
                                            className=" flex items-center justify-center cursor-pointer w-[95px] h-[32px] border-[0.5px] border-[#7464ED] font-Bebas tracking-wider text-gray-100 rounded-md">
                                            update image
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* token purchase */}
                            <div className="md:px-6 px-4 w-full my-4">
                                <div className="md:px-6 px-4 py-4 rounded-lg w-full flex justify-between items-center bg-[#FFFFFF]/[5%] border border-[#FFFFFF]/[10%]">
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="w-[32px] h-[32px]">
                                            <Image src={singlecoin} alt='image' width={132} height={128} quality={100} priority className='w-full h-full' />
                                        </div>
                                        <p className='text-[#F3F1FD] text-xl font-Bebas'>100{" "}<span className='text-[#897AF0]'>rkvt</span></p>
                                    </div>
                                    <button type="button" className="bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8] px-6 py-1.5 font-Bebas text-gray-100 rounded-md tracking-wide">Purchase token</button>
                                </div>
                            </div>


                            {/* Rapper NFT */}

                            <div className="w-full md:px-6 px-4 py-8">
                                <div className="w-full p-[40px] flex flex-col gap-2 rounded-lg bg-[#FFFFFF]/[5%] border border-[#FFFFFF]/[10%]">
                                    <div className="w-full h-[343px] rounded-lg overflow-hidden border-[3px] border-[#FFFFFF]/[50%] relative">
                                        <Image src={rapperNFT} alt='image' width={736} height={736} quality={100} priority className='w-full h-full object-cover' />

                                        <div className=" absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0B0532] flex justify-center items-center gap-1">
                                            <FaCrown className="text-amber-500 -mt-1" />
                                            <span className="text-xs font-Bebas text-[#897AF0]">Ravel</span>
                                            <span className="text-gray-100 font-Bebas text-xs">1</span>
                                        </div>
                                    </div>
                                    <h1 className="text-gray-100 font-Bebas md:text-2xl text-xl text-center">MI Abaga</h1>
                                    <ul className="w-full flex flex-col gap-2 px-3 list-none">
                                        <li className="w-full flex justify-between items-center text-gray-100 font-Bebas text-xl">
                                            <span className="text-[#897AF0]">Rap points</span>
                                            <span>3</span>
                                        </li>
                                        <li className="w-full flex justify-between items-center text-gray-100 font-Bebas text-xl">
                                            <span className="text-[#897AF0]">Battle wins</span>
                                            <span>98</span>
                                        </li>
                                        <li className="w-full flex justify-between items-center text-gray-100 font-Bebas text-xl">
                                            <span className="text-[#897AF0]">fan base</span>
                                            <span>98</span>
                                        </li>
                                        <li className="w-full flex justify-between items-center text-gray-100 font-Bebas text-xl">
                                            <span className="text-[#897AF0]">lyrics</span>
                                            <span>98</span>
                                        </li>
                                        <li className="w-full flex justify-between items-center text-gray-100 font-Bebas text-xl">
                                            <span className="text-[#897AF0]">charisma</span>
                                            <span>98</span>
                                        </li>
                                        <li className="w-full flex justify-between items-center text-gray-100 font-Bebas text-xl">
                                            <span className="text-[#897AF0]">flow</span>
                                            <span>98</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* notifications */}
            <AnimatePresence>
                {openNotification && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={modalVariants}
                        className="md:w-[424px] w-full h-[400px] border border-[#FFFFFF]/[10%] bg-[#150822] shadow-lg shadow-[#000000]/[61%] fixed top-[90px] md:right-[190px] right-0 z-[999] overflow-y-auto rounded-[20px]"
                    >
                        <main className="w-full h-full flex flex-col ">

                            <div className="w-full py-4 bg-[#150822] md:px-6 px-4 flex justify-between items-center">
                                <h1 className="text-gray-100 md:text-xl text-lg font-Bebas">Notifications</h1>
                                <button onClick={() => setOpenNotification(!openNotification)} type="button" className="text-gray-100">
                                    <IoCloseOutline className="text-2xl" />
                                </button>
                            </div>

                            <main className="flex w-full flex-col gap-3">
                                {/* notification */}
                                <div className="w-full px-6">
                                    <div className="w-full md:px-4 px-2 py-3 flex flex-col gap-2 bg-[#FFFFFF]/[6%] rounded-md border border-[#FFFFFF]/[15%]">
                                        <div className="flex items-center gap-2">
                                            <div className='w-[20px] h-[20px] rounded-full overflow-hidden flex justify-center items-center bg-[#897AF0] p-1'>
                                                <IoIosNotificationsOutline className="text-lg text-gray-100" />
                                            </div>
                                            <h3 className="text-gray-100 text-sm capitalize ">Challenge accepted</h3>
                                        </div>
                                        <p className="text-[0.75rem] text-gray-200">Broadcastar accepted your battle challenge. Challenge was scheduled for 12th Jun, 2024; 5PM WAT. </p>
                                    </div>
                                </div>

                                {/* notification */}
                                <div className="w-full px-6">
                                    <div className="w-full md:px-4 px-2 py-3 flex flex-col gap-2 bg-[#FFFFFF]/[6%] rounded-md border border-[#FFFFFF]/[15%]">
                                        <div className="flex items-center gap-2">
                                            <div className='w-[20px] h-[20px] rounded-full overflow-hidden flex justify-center items-center bg-[#897AF0] p-1'>
                                                <IoIosNotificationsOutline className="text-lg text-gray-100" />
                                            </div>
                                            <h3 className="text-gray-100 text-sm capitalize ">Challenge accepted</h3>
                                        </div>
                                        <p className="text-[0.75rem] text-gray-200">Broadcastar accepted your battle challenge. Challenge was scheduled for 12th Jun, 2024; 5PM WAT. </p>
                                    </div>
                                </div>
                            </main>

                        </main>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    )
}

export default Header

export const Beats = () => {
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