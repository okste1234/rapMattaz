import Footer from "@/components/shared/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-screen overflow-y-auto flex flex-col justify-between items-start absolute left-0 top-0 z-0 bg-[#040212]">
            {children}
            <Footer />
        </main>
    )
}