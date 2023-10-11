import Footer from "@/views/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/views/Navbar/Navbar";
import HeroComp from "@/views/HOME/HeroComp";
import { Toaster } from "react-hot-toast";
import ProviderComp from "@/components/utils/ProviderComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ezzstar.com'),
  openGraph: {
    images: '/opengraph-image.png',
  },
  title: 'SOCIAL - EZZSTAR',
  description:
    "Ezzstar is a company that works on research and development, video games and web3. Join the Ezzstar All Universe Social Platform to get Future Content, a virtual world powered by the SPICA token ecosystem, and explore new features and experiences. Learn more about Ezzstar's roadmap and vision for the future of gaming and web3.",
  creator: 'EZZSTAR TEAM ',
  authors: { name: 'M. Ahmed Siddiqui', url: 'https://mahmed.vercel.app' },
  applicationName: 'EZZSTAR BLOG CONTENT APPLICATION',
  keywords: ['Ezzstar', 'EZZSTAR', "EZZSTAR BLOGS", "GAMING BLOGS", "FUTURE BLOGS", "ANIME BLOGS" ,'Web 3.0 BLOGS', 'METAVERSE BLOGS', 'Spica Token'],
  category: 'BLOG',
  themeColor: '#09090b',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full bg-[#0b0b0b] text-white`}>
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
