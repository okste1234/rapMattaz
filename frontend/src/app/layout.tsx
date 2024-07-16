import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../styles/globals.css";
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
          {children}
          <Toaster richColors position="top-right" />
        </Web3Modal>
      </body>
    </html>
  );
}
