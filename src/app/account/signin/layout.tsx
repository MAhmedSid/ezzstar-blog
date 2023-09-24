import Footer from "@/views/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ProviderComp from "@/components/utils/ProviderComp";
import HeroComp from "@/views/HOME/HeroComp";
import Navbar from "@/views/Navbar/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'SIGN IN - EZZSTAR',
    description: "SIGN IN for Future Content - EZZSTAR SOCIAL PLATFORM",
    themeColor: '#09090b',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full bg-black text-white`}>
        <Toaster position="top-center" toastOptions={{duration:6000 ,style: {
      background: '#09090b',
      color: '#f2b41f',
      boxShadow: "2px 2px 20px #f2b41f"
    }}} />
        <ProviderComp>
          <HeroComp />
          <Navbar />
          {children}
          <Footer />
        </ProviderComp>
      </body>
    </html>
  );
}
