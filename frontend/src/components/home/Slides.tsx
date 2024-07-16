'use client'
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import slideImg1 from "../../../public/slide1.jpeg"
import slideImg2 from "../../../public/slide2.jpeg"
import slideImg3 from "../../../public/slide3.jpeg"
import slideImg4 from "../../../public/slide4.jpeg"
import Slider, { Settings } from "react-slick";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";

const Slides = () => {
    const router = useRouter()

    const sliderRef = useRef<Slider | null>(null);

    // Function for next button
    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();

        }
    };
    // function for previous button
    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    // Slider settings
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        // autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        // nextArrow: "",
        // prevArrow: "",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    return (
        <main className="w-full md:my-28 my-12 ">
            <section className="md:px-16 px-2 shadow-lg">
                <Slider ref={sliderRef} {...settings}>
                    {/* First slide */}
                    <div className="px-4">
                        <div className="w-[100%]  h-[608px] rounded-[20px] shadow-xl shadow-[#5B47E9]/[48%] relative">
                            <div className="w-full h-full">
                                <Image src={slideImg1} alt="slide1" className="w-full h-full object-fill relative" width={4096} height={1889} quality={100} priority />
                            </div>
                            <div className="md:p-8 p-6 w-full h-full absolute top-0 left-0 flex flex-col justify-between bg-[#000000]/[75%]">
                                <h1 className="text-gray-300 md:w-[30%] font-Bebas md:text-7xl text-3xl">secure & transparent</h1>
                                <div className="w-full flex flex-wrap gap-3 justify-between items-center">
                                    <p className="text-gray-400 text-lg md:w-[50%]">Register and log in securely using your wallet. Enjoy the benefits of decentralized identity management, ensuring your information is safe and private.</p>
                                    <button onClick={() => router.push("/signin")} className={`py-2 border font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8] px-6`}>Join the arena</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2nd slide */}
                    <div className="px-4">
                        <div className="w-[100%] h-[608px] rounded-[20px] shadow-xl shadow-[#5B47E9]/[48%] relative">
                            <div className="w-full h-full">
                                <Image src={slideImg2} alt="slide1" className="w-full h-full object-fill relative" width={4096} height={2731} quality={100} priority />
                            </div>
                            <div className="md:p-8 p-6 w-full h-full absolute top-0 left-0 flex flex-col justify-between bg-[#000000]/[75%]">
                                <h1 className="text-gray-300 md:w-[30%] font-Bebas md:text-7xl text-3xl">dynamic profiles</h1>
                                <div className="w-full flex justify-between flex-wrap gap-3 items-center">
                                    <p className="text-gray-400 text-lg md:w-[50%]">Elevate your profile with upgradable NFTs representing your RAVEL. Show off your skills and achievements.</p>
                                    <button onClick={() => router.push("/signin")} className={`py-2 border font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8] px-6`}>Join the arena</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* 3rd slide */}
                    <div className="px-4">
                        <div className="w-[100%] h-[608px] rounded-[20px] shadow-xl shadow-[#5B47E9]/[48%] relative">
                            <div className="w-full h-full">
                                <Image src={slideImg3} alt="slide1" className="w-full h-full object-fill relative" width={4096} height={2731} quality={100} priority />
                            </div>
                            <div className="md:p-8 p-6 w-full h-full absolute top-0 left-0 flex flex-col justify-between bg-[#000000]/[75%]">
                                <h1 className="text-gray-300 md:w-[30%] font-Bebas md:text-7xl text-3xl">fan engagement</h1>
                                <div className="w-full flex justify-between flex-wrap gap-3 items-center">
                                    <p className="text-gray-400 text-lg md:w-[50%]">Fans can collect unique NFTs tied to their favorite artists, creating a deeper connection and exclusive access.</p>
                                    <button onClick={() => router.push("/signin")} className={`py-2 border font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8] px-6`}>Join the arena</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4th slide */}
                    <div className="px-4">
                        <div className="w-[100%] h-[608px] rounded-[20px] shadow-xl shadow-[#5B47E9]/[48%] relative">
                            <div className="w-full h-full">
                                <Image src={slideImg4} alt="slide1" className="w-full h-full object-fill relative" width={4096} height={2731} quality={100} priority />
                            </div>
                            <div className="md:p-8 p-6 w-full h-full absolute top-0 left-0 flex flex-col justify-between bg-[#000000]/[75%]">
                                <h1 className="text-gray-300 md:w-[30%] font-Bebas md:text-7xl text-3xl">live battles</h1>
                                <div className="w-full flex justify-between flex-wrap gap-3 items-center">
                                    <p className="text-gray-400 text-lg md:w-[50%]">Participate in or watch live rap battles. Feel the adrenaline and raw energy of live performances. Vote for your favorite artists and provide instant feedback.</p>
                                    <button onClick={() => router.push("/signin")} className={`py-2 border font-Bebas rounded-md text-sm md:text-base uppercase text-gray-50 bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] border-[#503BE8] px-6`}>Join the arena</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </section>
            <div className="lg:mt-6 mt-4 md:px-20 px-6 w-full flex justify-between items-center">
                <button onClick={previous} className="text-gray-400" type="button">
                    <HiOutlineArrowNarrowLeft className="text-2xl" />
                </button>
                <button onClick={next} className="text-gray-400" type="button">
                    <HiOutlineArrowNarrowRight className="text-2xl" />
                </button>
            </div>
        </main>
    )
}

export default Slides