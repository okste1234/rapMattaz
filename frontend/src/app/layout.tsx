import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Web3Modal } from "@/context/web3Modal";
import { Toaster } from 'sonner';

const inter = Open_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Rap Mattaz",
  description: "An Onchain Rap Battle Dapp",
  icons: "./favicon.ico"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full h-screen bg-hero-pattern bg-no-repeat bg-center bg-cover relative `}>
        <Web3Modal>
          <main className="w-full h-screen overflow-y-auto flex flex-col justify-between items-start absolute left-0 top-0 z-0 bg-[#040212]/[85%] md:px-16 px-4 md:pt-8 pt-4">
            <div className="w-full flex flex-col gap-8 items-start">
              <Header />
              {children}
            </div>
            <Footer />
          </main>
          <Toaster richColors position="top-right" />
        </Web3Modal>
      </body>
    </html>
  );
}
