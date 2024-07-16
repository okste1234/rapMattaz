'use client'
import Image from "next/image"
import Logo from "../shared/Logo"
import rapperNFT from "../../../public/rapperNFT.png"
import fanNFT from "../../../public/fanNFT.png"
import { useRouter } from "next/navigation"


const RapperNFT = () => {
    const router = useRouter()
    return (
        <section className="w-full flex justify-center">
            <main className="w-full md:w-[540px] md:h-[680px] h-[600px] flex flex-col items-center justify-center bg-[#28233c] md:px-10 px-4 rounded-lg border border-[#FFFFFF]/[10%]">

                <div className="flex gap-2 items-center">
                    <Logo className="w-[26px] h-[28px]" />
                    <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
                </div>

                {/* If Rapper */}
                {/* Rapper NFT to be claimed */}
                <div className="flex flex-col ">
                    <h2 className="text-[#F3F1FD] text-center font-Bebas uppercase text-4xl">welcome to rap mattaz</h2>
                    <p className="text-[#D6D1FA] text-center text-xs capitalize font-extralight">
                        Here is your NFT for your current level. Your NFT upgrades as your earn more points.
                    </p>
                </div>

                <div className="w-[290px] h-[343px] my-8">
                    <Image src={rapperNFT} alt='image' width={736} height={736} quality={100} priority className='w-full h-full object-cover' />
                </div>

                {/* If fan */}
                {/* Fan NFT to be claimed */}
                {/* <div className="flex flex-col ">
                    <h2 className="text-[#F3F1FD] text-center font-Bebas uppercase text-4xl">welcome to rap mattaz</h2>
                    <p className="text-[#D6D1FA] text-center text-xs capitalize font-extralight">
                        Here is your NFT for your music fan NFT. 
                    </p>
                </div>

                <div className="w-[290px] h-[343px] my-8">
                    <Image src={fanNFT} alt='image' width={736} height={736} quality={100} priority className='w-full h-full object-cover' />
                </div> */}

                <button onClick={() => router.push('/battles')} className="w-full h-[52px] flex items-center justify-center gap-1 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                    claim nft
                </button>
            </main>
        </section>
    )
}

export default RapperNFT