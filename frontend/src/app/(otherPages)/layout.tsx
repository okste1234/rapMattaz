import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";


export default function OtherLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="w-full h-screen bg-hero-pattern bg-no-repeat bg-center bg-cover relative">
            <main className="w-full h-screen overflow-y-auto flex flex-col justify-between items-start absolute left-0 top-0 z-0 bg-[#040212]/[85%] md:px-16 px-4 md:pt-8 pt-4">
                <div className="w-full flex flex-col gap-8 items-start">
                    <Header />
                    {children}
                </div>
                <Footer />
            </main>
        </section>
    )
}