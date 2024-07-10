import React from 'react'
import { Battles } from '../data/battles'
import Image from 'next/image'
import Link from 'next/link'
import { RiFileCopyFill } from 'react-icons/ri'
import { FaVideo } from 'react-icons/fa'
import singlecoin from "../../../public/singlecoin.png"


const UpcomingBattles = () => {
    return (
        <section className='flex flex-col gap-6 items-start mt-3'>

            <div className='w-full flex justify-between items-center'>
                <h1 className=' uppercase text-3xl text-gray-100 font-Bebas'>
                    Upcoming Battles
                </h1>

                {/* this will be dynamically rendered */}
                {/* If the user is a fan then this */}

                {/* <div className="w-[118px] h-[48px] rounded-md flex justify-center items-center gap-2 bg-[#28233c] border border-[#FFFFFF]/[10%]">
                    <div className="w-[32px] h-[32px]">
                        <Image src={singlecoin} alt='image' width={132} height={128} quality={100} priority className='w-full h-full' />
                    </div>
                    <p className='text-[#F3F1FD] text-xl font-Bebas'>98{" "}<span className='text-[#897AF0]'>rkvt</span></p>
                </div> */}

                {/* If the user is an artiste then this */}

                {/* <button className="w-[148px] h-[44px] bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] font-Bebas rounded-md text-sm uppercase text-gray-50">create a challenge</button> */}
            </div>

            <main className='w-full grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
                {
                    Battles.map((bat, index) => (
                        <div className='flex flex-col h-[350px] border border-[#1C0D82] rounded-[12px] overflow-hidden cursor-pointer' key={index}>
                            <div className='w-full h-[215px] bg-rap-battlebg bg-cover bg-center bg-no-repeat relative'>
                                <div className=' absolute top-0 left-0 w-full h-full bg-[#070420]/[82%] flex flex-col items-center justify-center gap-4'>
                                    <div className='flex justify-center gap-1 items-center'>
                                        <div className='flex flex-col gap-1.5 items-center'>
                                            <div className='w-[90px] h-[90px]'>
                                                <Image src={bat.challengerImg} alt={`${bat.challenger}${index}`} className="" width={376} height={376} quality={100} priority />
                                            </div>
                                            <h4 className=' text-[#D6D1FA] text-sm capitalize'>{bat.challenger}</h4>
                                        </div>
                                        <span className=' font-allura text-[#F3F1FD] text-4xl'>Vs</span>
                                        <div className='flex flex-col gap-1.5 items-center'>
                                            <div className='w-[90px] h-[90px]'>
                                                <Image src={bat.challengedImg} alt={`${bat.challenged}${index}`} className="" width={376} height={376} quality={100} priority />
                                            </div>
                                            <h4 className=' text-[#D6D1FA] text-sm capitalize'>{bat.challenged}</h4>
                                        </div>
                                    </div>
                                    <button className='flex gap-6 items-center bg-[#FFFFFF]/[5%] border border-[#FFFFFF]/[10%] px-3 py-1.5 rounded-md text-[#D6D1FA]'>
                                        <span className=' font-extralight text-xs'>{bat.battleLink}</span>
                                        <RiFileCopyFill />
                                    </button>
                                </div>
                            </div>
                            <div className='h-[135px] flex flex-col justify-center items-start gap-3 w-full bg-[#0B0533] px-[20px]'>
                                <div className='flex gap-14'>
                                    <div className='flex flex-col'>
                                        <h3 className=' uppercase font-Bebas text-[#897AF0] text-xl'>{bat.date}</h3>
                                        <p className=' uppercase font-extralight text-[#D6D1FA] text-sm'>Date</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <h3 className=' uppercase font-Bebas text-[#897AF0] text-xl'>{bat.time}</h3>
                                        <p className=' uppercase font-extralight text-[#D6D1FA] text-sm'>wat</p>
                                    </div>
                                </div>
                                <Link href={bat.battleLink} className="w-full h-[32px] flex items-center justify-center gap-1 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] text-sm uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                                    <FaVideo className='-mt-0.5' />
                                    Join
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </main>
        </section>
    )
}

export default UpcomingBattles