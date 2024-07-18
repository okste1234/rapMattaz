'use client'
import React from 'react'
import Logo from '../shared/Logo'
import Image from 'next/image'
import { coin } from '../../../public'
import useClaimRAVT from '@/hooks/useClaimRAVT'

const FansToken = () => {
    const claim = useClaimRAVT()

    return (
        <section className="w-full flex justify-center">
            <main className="w-full md:w-[540px] md:h-[535px] h-[490px] flex flex-col items-center justify-center gap-4 bg-[#28233c] md:px-10 px-4 rounded-lg border border-[#FFFFFF]/[10%]">

                <div className="flex gap-2 items-center">
                    <Logo className="w-[26px] h-[28px]" />
                    <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
                </div>

                <div className="flex flex-col ">
                    <h2 className="text-[#F3F1FD] text-center font-Bebas uppercase text-4xl">claim your Ravt token</h2>
                    <p className="text-[#D6D1FA] text-center text-xs capitalize font-extralight">
                        Connect your wallet to create account
                    </p>
                </div>


                <div className='md:w-[378px] md:h-[183px] h-[140px] w-[318px] my-5'>
                    <Image src={coin} alt='image' width={1512} height={732} quality={100} priority className='w-full h-full' />
                </div>


                <button onClick={claim} className="w-full h-[52px] flex items-center justify-center gap-1 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                    claim token
                </button>
            </main>
        </section>
    )
}

export default FansToken