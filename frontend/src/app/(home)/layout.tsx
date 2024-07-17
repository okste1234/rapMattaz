import Footer from "@/components/shared/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { envVars } from "@/utils/env";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rap Mattaz Farcaster Frame",
    description: "An Onchain Rap Battle Farcaster Frame",
    openGraph: {
        title: "Rap Mattaz Farcaster Frame",
        description: "An Onchain Rap Battle Farcaster Frame",
        images: `${envVars.hostUrl}/RapMattaz.png`, 
    },
    other: {
        "fc:frame": "vNext",
        "fc:frame:image": `${envVars.hostUrl}/RapMattaz.png`,
        "fc:frame:button:1:post_url": `${envVars.hostUrl}/api/signinframe`,
        "fc:frame:button:1": "Battle Update",
        "fc:frame:button:2:post_url": `${envVars.hostUrl}/api/signinframe`,  
        "fc:frame:button:2": "Sign In",
        "fc:frame:button:3": `Join Live`, 
        "fc:frame:button:3:action": "link",
        "fc:frame:button:3:target": `${envVars.hostUrl}/battles`,        
    },
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-screen overflow-y-auto flex flex-col justify-between items-start bg-[#040212]">
            {children}
            <Footer />
        </main>
    );
}
