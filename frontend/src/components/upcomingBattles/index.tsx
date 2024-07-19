'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Battles } from '../data/battles'
import Image from 'next/image'
import Link from 'next/link'
import { RiFileCopyFill } from 'react-icons/ri'
import { FaVideo } from 'react-icons/fa'
import singlecoin from "../../../public/singlecoin.png"
import rapperNFT from "../../../public/rapperNFT.png"
import flash from "../../../public/flash.png"
import { RxCaretUp } from 'react-icons/rx'
import { IoCloseOutline } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
import { modalVariants } from '../shared/Animations'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { toast } from "sonner"
import useFollowArtist from '@/hooks/useFollowArtist'
import useGetAllUsersAndBattles from '@/hooks/useGetAllUsersAndBattles'
import useGetStatus from '@/hooks/useGetStatus'
import useCreateBattle from '@/hooks/useCreateBattle'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import useBalanceOf from '@/hooks/useBalanceOf'


const UpcomingBattles = () => {
    const { address,isConnected } = useWeb3ModalAccount();

    // create challenge modal state
    const [isOpen, setIsOpen] = useState<boolean>(false)
    // CTA after create challenge modal state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [artistName, setArtistName] = useState<string>("")
    const [artistAdddress, setArtistAdddress] = useState<any>("")
    
    const { userInfo, battleInfo, rapperInfo, loading, } = useGetAllUsersAndBattles()
    // console.log("ALLLLL", userInfo, battleInfo, rapperInfo);

    const ravtBal = useBalanceOf()

    const thisUser = useGetStatus()
    
    const follow = useFollowArtist();

    const createBattle = useCreateBattle()

    const upcomingBattles = useMemo(() => Battles, [])

    // useEffect(() => {
    //  if (isConnected) {
    //     console.log("jjj");
        
    //  }
      
    // }, [thisUser])
    
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    })

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    })

    const filteredUsers = userInfo.filter(user => user.userType === 1);

    const combinedArtist = filteredUsers.map((user, index) => {
        const rapper = rapperInfo[index] || {}; 
        return { ...user, ...rapper };
    });

    const otherArtist = combinedArtist.filter(user => user.wallet !== address);

    // console.log("OTHERARTIST", otherArtist);
    

    const handleSendingChallenge = () => {
        setIsModalOpen(!isModalOpen)
        setIsOpen(!isOpen)
        // createBattle(artistAdddress);
        toast.success("Challenge Sent -Test");
    }

    const handleStartingChallenge = (nameArt:string, addressArt:any) => {
        setIsModalOpen(!isModalOpen)
        setArtistAdddress(addressArt)
        setArtistName(nameArt)
       
    }

    if (loading) return <h3 className='text-4xl flex justify-center items-center text-white font-semibold'>Loading...</h3>;

    return (
        <section className='w-full flex flex-col gap-6 items-start mt-3'>
            <div className='w-full flex justify-end'>
                {/* this will be dynamically rendered */}
                {/* If the user is a fan then this */}

                {thisUser?.userType == 0 &&
                    <div className="w-[118px] h-[48px] rounded-md flex justify-center items-center gap-2 bg-[#28233c] border border-[#FFFFFF]/[10%]">
                        <div className="w-[32px] h-[32px]">
                            <Image src={singlecoin} alt='image' width={132} height={128} quality={100} priority className='w-full h-full' />
                        </div>
                        <p className='text-[#F3F1FD] text-xl font-Bebas'>{ravtBal}{" "}<span className='text-[#897AF0]'>rkvt</span></p>
                    </div>
                }

                {/* If the user is an artiste then this */}
               
                {thisUser?.userType == 1 &&
                <>
                <button onClick={() => setIsOpen(!isOpen)} className="w-[148px] h-[44px] bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50">create a challenge</button>

                {/* Modal for creating a challenge  */}
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
                                    <h1 className="text-gray-100 md:text-3xl text-2xl font-Bebas">create a challenge</h1>
                                    <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-100">
                                        <IoCloseOutline className="text-3xl" />
                                    </button>
                                </div>


                                <div className="w-full md:px-6 px-4 flex flex-col items-start gap-4">
                                    <h1 className="text-gray-100 md:text-2xl text-xl font-Bebas">select a worthy opponent</h1>

                                    <div className='w-full grid grid-cols-2 gap-4'>
                                        {
                                            otherArtist.map((art, index) => (
                                                <div className='bg-[#FFFFFF]/[5%] p-4 rounded-lg border border-[#FFFFFF]/[10%] backdrop-blur-lg flex flex-col items-center gap-1' key={index}>
                                                    <div className='w-[48px] h-[48px] rounded-full overflow-hidden'>
                                                        <img src={art.imageURL} alt={art.username} width={376} height={376} className='w-full h-full object-cover' />
                                                    </div>
                                                    <h3 className="text-gray-100 text-center font-Bebas tracking-wider">{art.name}</h3>
                                                    <span className='border -mt-1.5 text-sm font-Bebas border-[#FFFFFF]/[10%] px-3 py-1 rounded-md text-[#D6D1FA]'>{art.rapoint} -
                                                        {" "}<span className='text-[#897AF0]'>Ra points</span>
                                                    </span>
                                                    <button onClick={() => handleStartingChallenge(art.username, art.wallet)} className="border mt-4 rounded-lg border-[#897AF0] w-full py-1.5 text-gray-100 font-Bebas">Challenge</button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>


                            </main>
                        </motion.div>
                    )}
                </AnimatePresence>
                </>}
            </div>


            {/* sent challenge or unaccepted challenge */}
            {thisUser?.userType == 1 &&
                <>
                <div className='w-full flex justify-between items-center'>
                    <h1 className=' uppercase text-3xl text-gray-100 font-Bebas'>
                        Challenges Sent
                    </h1>
                </div>
           
            <main className='w-full grid lg:grid-cols-2 gap-6'>
                {
                    upcomingBattles.slice(0, 1).map((bat, index) => (
                        <div className='flex flex-col md:h-[459px] h-[296px] border border-[#1C0D82] rounded-[12px] overflow-hidden cursor-pointer ' key={index}>
                            <div className='w-full md:h-[383px] h-[220px] bg-rap-battlebg bg-cover bg-center bg-no-repeat relative'>
                                <div className=' absolute top-0 left-0 w-full h-full bg-[#070420]/[82%] flex flex-col items-center justify-center gap-4'>
                                    <div className='flex justify-center gap-1 items-center'>
                                        <div className='flex flex-col gap-1.5 items-center'>
                                            <div className="md:w-[233px] w-[140px] md:h-[343px] h-[200px] my-8 overflow-hidden relative group">
                                                <Image src={rapperNFT} alt='image' width={1184} height={1396} quality={100} priority className='w-full h-full' />

                                                <div className='absolute bottom-0 left-0 w-full md:px-3 px-1 md:pb-3 pb-1'>
                                                    <div className='w-full bg-[#FFFFFF]/[10%] md:px-2 px-1 md:pt-2 pt-1 flex flex-col justify-start items-start md:h-[50px] h-[35px] md:group-hover:h-[210px] group-hover:h-[190px] overflow-hidden transition-all duration-500 rounded-lg backdrop-blur-lg'>
                                                        <div className='w-full flex rounded-xl px-2 py-1 items-center justify-between bg-[#FFFFFF]/[20%]'>
                                                            <div className='flex items-center gap-1.5'>
                                                                <span className="md:w-[28px] w-[20px] md:h-[28px] h-[20px] rounded-full overflow-hidden">
                                                                    <Image src={bat.challengerImg} alt={bat.challenger} className="w-full h-full" width={160} height={160} quality={100} priority />
                                                                </span>
                                                                <span className='text-white text-sm md:text-base font-Bebas'>{bat.challenger}</span>
                                                            </div>
                                                            <span className='text-white font-Bebas'><RxCaretUp className='text-xl font-bold' /></span>
                                                        </div>
                                                        <ul className="w-full flex flex-col px-2 pt-[10px] text-white list-none">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" relative w-[51px] h-[100px]">
                                            <Image src={flash} alt='image' width={204} height={401} quality={100} priority className='w-full h-full' />
                                            <span className=' absolute top-7 left-3 font-Bebas text-[#F3F1FD] text-4xl'>Vs</span>
                                        </div>

                                        <div className='flex flex-col gap-1.5 items-center'>
                                            <div className="md:w-[233px] w-[140px] md:h-[343px] h-[200px] my-8 overflow-hidden relative group">
                                                <Image src={rapperNFT} alt='image' width={1184} height={1396} quality={100} priority className='w-full h-full' />

                                                <div className='absolute bottom-0 left-0 w-full md:px-3 px-1 md:pb-3 pb-1'>
                                                    <div className='w-full bg-[#FFFFFF]/[10%] md:px-2 px-1 md:pt-2 pt-1 flex flex-col justify-start items-start md:h-[50px] h-[35px] md:group-hover:h-[210px] group-hover:h-[190px] overflow-hidden transition-all duration-500 rounded-lg backdrop-blur-lg'>
                                                        <div className='w-full flex rounded-xl px-2 py-1 items-center justify-between bg-[#FFFFFF]/[20%]'>
                                                            <div className='flex items-center gap-1.5'>
                                                                <span className="md:w-[28px] w-[20px] md:h-[28px] h-[20px] rounded-full overflow-hidden">
                                                                    <Image src={bat.challengedImg} alt={bat.challenged} className="w-full h-full" width={160} height={160} quality={100} priority />
                                                                </span>
                                                                <span className='text-white text-sm md:text-base font-Bebas'>{bat.challenged}</span>
                                                            </div>
                                                            <span className='text-white font-Bebas'><RxCaretUp className='text-xl font-bold' /></span>
                                                        </div>
                                                        <ul className="w-full flex flex-col px-2 pt-[10px] text-white list-none">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-[76px] flex flex-col justify-center items-center  w-full bg-gradient-radial from-[#190C73] to-[#0B0533] px-[20px]'>

                                <button type='button' className="w-full h-[32px] flex items-center justify-center bg-transparent border border-[#7464ED] text-sm uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                                    Challenge pending
                                </button>
                            </div>
                        </div>
                    ))
                }
            </main>
            </>}
            
            <div className='w-full flex justify-between items-center'>
                <h1 className=' uppercase text-3xl text-gray-100 font-Bebas'>
                    Upcoming Battles
                </h1>
            </div>

            {/* CTA modal */}
            {thisUser?.userType == 1 &&
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={modalVariants}
                            className=" w-screen h-screen flex justify-center items-center fixed top-0 right-0 z-[9999] bg-[#000000]/[65%]"
                        >
                            <main className="w-[95%] md:w-[538px] h-[250px] flex flex-col items-center justify-center border border-[#FFFFFF]/[10%] bg-[#150822] shadow-lg shadow-[#000000]/[61%] px-6 md:px-12 rounded-[20px] gap-5">

                                <div className='w-[28px] h-[28px] rounded-full overflow-hidden flex justify-center items-center bg-[#897AF0] p-1'>
                                    <IoIosNotificationsOutline className="text-xl text-gray-100" />
                                </div>
                                <div className='flex flex-col items-center'>
                                    <h2 className='text-gray-100 md:text-3xl text-2xl font-Bebas'>confirm action</h2>
                                    <p className='text-[#D6D1FA] font-light text-sm'>{`You are about to challenge ${artistName}?`}</p>
                                </div>

                                <div className='w-full grid grid-cols-2 gap-5'>

                                    <button onClick={() => setIsModalOpen(!isModalOpen)} className="border mt-4 rounded-lg border-[#897AF0] w-full py-1.5 text-gray-100 font-Bebas">Cancel</button>

                                    <button onClick={handleSendingChallenge} type="button" className="border mt-4 rounded-lg border-[#897AF0] bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] w-full py-1.5 text-gray-100 font-Bebas">Challenge</button>
                                </div>

                            </main>
                        </motion.div>
                    )}
                </AnimatePresence>
            }
            
            <main className='w-full grid lg:grid-cols-2 gap-6'>
                {
                    upcomingBattles.map((bat, index) => (
                        <div className='flex flex-col md:h-[509px] h-[346px] border border-[#1C0D82] rounded-[12px] overflow-hidden cursor-pointer ' key={index}>
                            <div className='w-full md:h-[383px] h-[220px] bg-rap-battlebg bg-cover bg-center bg-no-repeat relative'>
                                <div className=' absolute top-0 left-0 w-full h-full bg-[#070420]/[82%] flex flex-col items-center justify-center gap-4'>
                                    <div className='flex justify-center gap-1 items-center'>
                                        <div className='flex flex-col gap-1.5 items-center'>
                                            <div className="md:w-[233px] w-[140px] md:h-[343px] h-[200px] my-8 overflow-hidden relative group">
                                                <Image src={rapperNFT} alt='image' width={1184} height={1396} quality={100} priority className='w-full h-full' />

                                                <div className='absolute bottom-0 left-0 w-full md:px-3 px-1 md:pb-3 pb-1'>
                                                    <div className='w-full bg-[#FFFFFF]/[10%] md:px-2 px-1 md:pt-2 pt-1 flex flex-col justify-start items-start md:h-[50px] h-[35px] md:group-hover:h-[210px] group-hover:h-[190px] overflow-hidden transition-all duration-500 rounded-lg backdrop-blur-lg'>
                                                        <div className='w-full flex rounded-xl px-2 py-1 items-center justify-between bg-[#FFFFFF]/[20%]'>
                                                            <div className='flex items-center gap-1.5'>
                                                                <span className="md:w-[28px] w-[20px] md:h-[28px] h-[20px] rounded-full overflow-hidden">
                                                                    <Image src={bat.challengerImg} alt={bat.challenger} className="w-full h-full" width={160} height={160} quality={100} priority />
                                                                </span>
                                                                <span className='text-white text-sm md:text-base font-Bebas'>{bat.challenger}</span>
                                                            </div>
                                                            <span className='text-white font-Bebas'><RxCaretUp className='text-xl font-bold' /></span>
                                                        </div>
                                                        <ul className="w-full flex flex-col px-2 pt-[10px] text-white list-none">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" relative w-[51px] h-[100px]">
                                            <Image src={flash} alt='image' width={204} height={401} quality={100} priority className='w-full h-full' />
                                            <span className=' absolute top-7 left-3 font-Bebas text-[#F3F1FD] text-4xl'>Vs</span>
                                        </div>

                                        <div className='flex flex-col gap-1.5 items-center'>
                                            <div className="md:w-[233px] w-[140px] md:h-[343px] h-[200px] my-8 overflow-hidden relative group">
                                                <Image src={rapperNFT} alt='image' width={1184} height={1396} quality={100} priority className='w-full h-full' />

                                                <div className='absolute bottom-0 left-0 w-full md:px-3 px-1 md:pb-3 pb-1'>
                                                    <div className='w-full bg-[#FFFFFF]/[10%] md:px-2 px-1 md:pt-2 pt-1 flex flex-col justify-start items-start md:h-[50px] h-[35px] md:group-hover:h-[210px] group-hover:h-[190px] overflow-hidden transition-all duration-500 rounded-lg backdrop-blur-lg'>
                                                        <div className='w-full flex rounded-xl px-2 py-1 items-center justify-between bg-[#FFFFFF]/[20%]'>
                                                            <div className='flex items-center gap-1.5'>
                                                                <span className="md:w-[28px] w-[20px] md:h-[28px] h-[20px] rounded-full overflow-hidden">
                                                                    <Image src={bat.challengedImg} alt={bat.challenged} className="w-full h-full" width={160} height={160} quality={100} priority />
                                                                </span>
                                                                <span className='text-white text-sm md:text-base font-Bebas'>{bat.challenged}</span>
                                                            </div>
                                                            <span className='text-white font-Bebas'><RxCaretUp className='text-xl font-bold' /></span>
                                                        </div>
                                                        <ul className="w-full flex flex-col px-2 pt-[10px] text-white list-none">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-[126px] flex flex-col justify-center items-start gap-3 w-full bg-gradient-radial from-[#190C73] to-[#0B0533] px-[20px]'>
                                <button className='flex w-full justify-between items-center bg-[#FFFFFF]/[5%] border border-[#FFFFFF]/[10%] px-3 py-1.5 rounded-md text-[#D6D1FA]'>
                                    <span className=' font-extralight text-xs'>{bat.battleLink}</span>
                                    <RiFileCopyFill />
                                </button>
                                <div className='w-full flex flex-wrap justify-between  items-center'>
                                    <div className='flex flex-1 gap-14 items-center'>
                                        <div className='flex flex-col'>
                                            <h3 className=' uppercase font-Bebas text-[#897AF0] text-xl'>{bat.date}</h3>
                                            <p className=' uppercase font-extralight text-[#D6D1FA] text-sm'>Date</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className=' uppercase font-Bebas text-[#897AF0] text-xl'>{bat.time}</h3>
                                            <p className=' uppercase font-extralight text-[#D6D1FA] text-sm'>wat</p>
                                        </div>
                                    </div>
                                    <Link href={bat.battleLink} className="md:w-[250px] w-[100px] h-[32px] flex items-center justify-center gap-1 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] text-sm uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                                        <FaVideo className='-mt-0.5' />
                                        Join
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </main>

            <main className='w-full flex flex-col gap-6 mt-12'>
                <h1 className=' uppercase text-3xl text-gray-100 font-Bebas'>
                    Discover Artistes
                </h1>
                <div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-4 md:gap-6'>
                    {
                        combinedArtist.map((art, index) => (
                            <div className='bg-[#FFFFFF]/[5%] p-4 rounded-lg border border-[#FFFFFF]/[10%] backdrop-blur-lg flex flex-col items-center gap-2' key={index}>
                                <div className='w-[80px] h-[80px] rounded-full overflow-hidden'>
                                    <img src={art.imageURL} alt={art.username} width={376} height={376}  className='w-full h-full object-cover' />
                                </div>
                                <h3 className="text-gray-100 text-center font-Bebas">{art.username}</h3>
                                <span className='border font-Bebas border-[#FFFFFF]/[10%] px-3 py-1.5 rounded-md text-[#D6D1FA]'>{art.rapoint} -
                                    {" "}<span className='text-[#897AF0]'>Ra points</span>
                                </span>
                                <button onClick={() =>follow(art.wallet)} className="border mt-4 rounded-lg border-[#FFFFFF]/[10%] w-full py-2 text-gray-100 font-Bebas">Follow</button>
                            </div>
                        ))
                    }
                </div>
            </main>

        </section>
    )
}

export default UpcomingBattles