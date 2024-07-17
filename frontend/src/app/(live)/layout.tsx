

export default function LiveRapLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="w-full h-screen bg-live-rapbg bg-no-repeat bg-center bg-cover relative">
            <main className="w-full h-screen overflow-y-auto flex flex-col justify-between items-start absolute left-0 top-0 z-0 bg-[#040212]/[85%] md:px-16 px-4 md:pt-8 pt-4">
                {children}
            </main>
        </section>
    )
}