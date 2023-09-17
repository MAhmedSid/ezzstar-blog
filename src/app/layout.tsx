import Footer from "@/views/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/views/Navbar/Navbar";
import HeroComp from "@/views/HOME/HeroComp";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/components/utils/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZZSTAR",
  description: "EZZSTAR Social Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full bg-black text-white`}>
        <Toaster position="top-center" toastOptions={{duration:6000 ,style: {
      background: '#1b1464',
      color: '#f2b41f',
    }}} />
        <ReduxProvider>
          <HeroComp />
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
