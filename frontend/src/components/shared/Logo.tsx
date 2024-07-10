import Image from "next/image"
import logo from "../../../public/logo.png"

const Logo = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <Image src={logo} alt="logo" className="w-full h-full" width={103} height={112} quality={100} priority />
        </div>
    )
}

export default Logo