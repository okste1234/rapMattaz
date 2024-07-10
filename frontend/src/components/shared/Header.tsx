import Link from "next/link"
import Logo from "./Logo"


const Header = () => {
    return (
        <header className="w-full z-50 flex justify-between items-center px-4 border border-[#FFFFFF]/[15%] bg-[#28233c] h-[56px] rounded-md">
            <Link href={`/`} className="flex gap-2 items-center">
                <Logo className="w-[26px] h-[28px]" />
                <span className="text-[#BEB6F6] text-2xl font-Reenie">Rap mattaz</span>
            </Link>

            <button className="px-6 h-[32px] bg-gradient-to-t from-[#503BE8] via-[#6957EB] to-[#715FEC] font-Bebas rounded-md text-sm uppercase text-gray-50">Connect Wallet</button>
        </header>
    )
}

export default Header