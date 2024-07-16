import Image from "next/image"
import HomeNav from "./HomeNav"
import flashLazer from "../../../public/homeFlash.png"
import NFTPlaceholder1 from "../../../public/NFTImage.png"
import NFTPlaceholder2 from "../../../public/NFTImage1.png"


const LandingPage = () => {
    return (
        <section className='w-full flex flex-col'>
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


            <main className="w-full overflow-hidden"></main>
        </section>
    )
}

export default LandingPage