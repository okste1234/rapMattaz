import Link from "next/link"
import logo from "../../../public/logo.png"
import Image from "next/image"


const Footer = () => {
    return (
        <footer className="w-full flex justify-center items-center py-4 mt-8">
            <p className="md:text-sm text-xs flex items-center gap-2 text-gray-300">©2024
                <Link href={`/`} className="flex gap-1 items-center">
                    <span className="md:w-[26px] md:h-[28px] w-[18px] h-[18px]" >
                        <Image src={logo} alt="logo" className="w-full h-full" width={103} height={112} quality={100} priority />
                    </span>
                    <span className="text-[#BEB6F6] md:text-xl text-base font-Reenie">Rap mattaz</span>
                </Link>
                built on Base. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer