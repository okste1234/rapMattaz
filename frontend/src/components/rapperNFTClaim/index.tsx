import Image from "next/image"
import Logo from "../shared/Logo"
import rapperNFT from "../../../public/rappermattaznft.jpeg"
import { FaCrown } from "react-icons/fa6"


const RapperNFT = () => {
    return (
        <section className="w-full flex justify-center">
            <main className="w-full md:w-[540px] md:h-[680px] h-[600px] flex flex-col items-center justify-center bg-[#28233c] md:px-10 px-4 rounded-lg border border-[#FFFFFF]/[10%]">

                <div className="flex gap-2 items-center">
                    <Logo className="w-[26px] h-[28px]" />
                    <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
                </div>

                <div className="flex flex-col ">
                    <h2 className="text-[#F3F1FD] text-center font-Bebas uppercase text-4xl">claim your RAP NFT</h2>
                    <p className="text-[#D6D1FA] text-center text-xs capitalize font-extralight">
                        Connect your wallet to create account
                    </p>
                </div>

                <div className="w-[290px] h-[343px] my-8 rounded-lg overflow-hidden border-[3px] border-[#FFFFFF]/[50%] relative">
                    <Image src={rapperNFT} alt='image' width={736} height={736} quality={100} priority className='w-full h-full object-cover' />

                    <div className=" absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0B0532] flex justify-center items-center gap-1">
                        <FaCrown className="text-amber-500 -mt-1" />
                        <span className="text-xs font-Bebas text-[#897AF0]">Ravel</span>
                        <span className="text-gray-100 font-Bebas text-xs">1</span>
                    </div>
                </div>



                <button className="w-full h-[52px] flex items-center justify-center gap-1 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] uppercase font-Bebas hover:tracking-widest transition-all duration-200 rounded-md text-gray-50">
                    claim nft
                </button>
            </main>
        </section>
    )
}

export default RapperNFT