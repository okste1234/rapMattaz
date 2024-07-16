'use client'
import Image from "next/image"
import HomeNav from "./HomeNav"
import flashLazer from "../../../public/homeFlash.png"
import NFTPlaceholder1 from "../../../public/NFTImage.png"
import NFTPlaceholder2 from "../../../public/NFTImage1.png"
import Slides from "./Slides"
import artist from "../../../public/artiste.png"
import fan from "../../../public/fan.png"
import { useRouter } from "next/navigation"

const LandingPage = () => {
    const router = useRouter()
    return (
        <section className='w-full'>
            {/* hero section */}
            <main className="h-screen w-full overflow-hidden flex justify-center items-start relative">
                <div className="h-[80%] w-full md:w-[50%] mt-12 rounded-full relative">
                    {/* purple circle */}
                    <div className="w-[120%] h-[120%] rounded-full bg-gradient-radial absolute -top-[30%] -left-[10%] from-[#a21caf] via-transparent to-transparent blur-3xl"></div>

                    {/* green circle  */}
                    <div className="w-[120%] h-[120%] rounded-full bg-gradient-radial absolute -bottom-[30%] -right-[30%] from-[#15803d] via-transparent to-transparent blur-3xl"></div>

                    {/* slateblue circle */}
                    <div className="w-[120%] h-[120%] rounded-full bg-gradient-radial absolute -bottom-[30%] -left-[30%] from-[#6d28d9] via-transparent to-transparent blur-3xl"></div>

                    {/* flash lazer */}
                    <div className=" animate-pulse absolute md:w-[323.73px] w-[150px] md:h-[635.29px] md:top-0 top-[30%] left-1/2 -translate-x-1/2 opacity-70">
                        <Image src={flashLazer} alt="image" className="w-full h-full" width={1295} height={2542} priority quality={100} />
                    </div>
                </div>

                {/* overlay */}
                <div className="w-full h-full absolute bg-transparent flex flex-col">
                    {/* Home nav */}
                    <HomeNav />

                    {/* content */}
                    <section className="w-full md:h-[600px] h-[500px] mt-16 flex justify-between items-center">

                        {/* left content */}
                        <div className="w-[200px] md:h-[343px] h-[243px] self-start md:self-center">
                            <Image src={NFTPlaceholder1} alt="image" className="h-full w-full" width={758} height={1943} quality={100} priority />
                        </div>

                        {/* middle content */}
                        <div className="md:w-[546px] flex flex-col items-center justify-start self-center">
                            <h1 className=" font-bold md:text-[120px] text-[50px] leading-none  text-center font-Bebas text-[#F3F1FD]">rap battles onchain</h1>
                            <p className="text-[#F3F1FD] text-[18px] font-sans text-center">The ultimate decentralized platform for rap battles. Showcase your lyrical skills or enjoy the raw energy of live rap—RapMattaz brings music, web 3, and community together.</p>
                        </div>

                        {/* right content */}
                        <div className="w-[200px] md:h-[343px] h-[243px] self-start md:self-center">
                            <Image src={NFTPlaceholder2} alt="image" className="h-full w-full" width={758} height={1943} quality={100} priority />
                        </div>

                    </section>
                </div>
            </main>


            <Slides />


            <main className="w-full py-20 px-4 md:px-16 flex flex-col gap-12">
                <h1 className="text-gray-300 font-Bebas md:text-6xl text-4xl">how it works</h1>

                <div className="w-full grid md:grid-cols-2 gap-8">
                    <div className="w-full flex flex-col gap-2 items-center bg-[#FFFFFF]/[5%] backdrop-blur-md md:p-8 p-6 rounded-lg border border-[#FFFFFF]/[10%]">
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-[#705CEF]">
                            <Image src={artist} alt="image" className="w-full h-full" width={160} height={160} quality={100} priority />
                        </div>
                        <h3 className="text-gray-300 font-Bebas text-center text-xl">MoonBabe</h3>
                        <p className="text-[#705CEF] font-Bebas text-center px-2 py-1 border border-[#FFFFFF]/[10%] rounded-md"><span className="text-gray-100">5</span> - ra points</p>

                        <div className="w-full flex flex-col gap-2">
                            <h4 className="text-gray-300 font-Bebas text-3xl">artiste</h4>

                            <p className="text-gray-300 text-sm font-light"><span className="font-semibold">Create your profile:</span> Sign up with your wallet, create a username, add a profile image and mint your artiste NFT</p>

                            <p className="text-gray-300 text-sm font-light"><span className="font-semibold">Create a challenge:</span> Send  challenge requests to other artistes within your RAVEL</p>

                            <p className="text-gray-300 text-sm font-light"><span className="font-semibold">Engage & compete:</span> Join live battles, participate in voting, and earn RAPOINTS</p>

                            <button className="w-full py-1.5 border border-[#705CEF] text-gray-300 font-Bebas rounded-md mt-3">Challenge</button>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-2 items-center bg-[#FFFFFF]/[5%] backdrop-blur-md md:p-8 p-6 rounded-lg border border-[#FFFFFF]/[10%]">
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-[#705CEF]">
                            <Image src={fan} alt="image" className="w-full h-full" width={160} height={160} quality={100} priority />
                        </div>
                        <h3 className="text-gray-300 font-Bebas text-center text-xl">WhiteGhost</h3>
                        <p className="text-[#705CEF] font-Bebas text-center px-2 py-1 border border-[#FFFFFF]/[10%] rounded-md"><span className="text-gray-100">5</span> - ra points</p>

                        <div className="w-full flex flex-col gap-2">
                            <h4 className="text-gray-300 font-Bebas text-3xl">fans</h4>

                            <p className="text-gray-300 text-sm font-light"><span className="font-semibold">Create your profile:</span>  Sign up with your wallet, create a username, add a profile image and claim your RAVT tokens</p>

                            <p className="text-gray-300 text-sm font-light"><span className="font-semibold">Discover talent:</span>  Explore and follow your favorite artists on Rap Mattaz.</p>

                            <p className="text-gray-300 text-sm font-light"><span className="font-semibold">Get involved:</span>  Vote, comment, and engage with the community during live battles.</p>

                            <button className="w-full py-1.5 border border-[#705CEF] text-gray-300 font-Bebas rounded-md mt-3">Follow</button>
                        </div>
                    </div>
                </div>
            </main>



            <main className="w-full flex flex-col items-center gap-8 my-20">
                <h1 className="md:text-[120px] text-[80px] leading-none md:w-[60%] font-Bebas text-center text-gray-200">
                    Ready to Revolutionize Your Rap Game?
                </h1>
                <button
                    onClick={() => router.push('/signin')}
                    type="button"
                    className={`py-2.5 border font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8] px-6`}>
                    Join the arena
                </button>
            </main>
        </section>
    )
}

export default LandingPage