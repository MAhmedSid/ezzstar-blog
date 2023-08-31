import React from "react";
import logo from "/public/images/logo_footer.webp";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";

import {
  FaYoutube,
  FaDiscord,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <section className="w-full flex justify-center items-center px-2">
      <Wrapper>
        <div className="w-full flex flex-col items-center text-white tablet:flex-row tablet:justify-between">


          <Image src={logo} alt="EZZSTAR LOGO" className="max-w-[200px] tablet:max-w-[300px]" />


          <div className="flex flex-col gap-y-10 pb-4">

            <div className="flex justify-center items-center text-2xl gap-x-8 px-5 pt-3 lmb:pt-0 lmb:px-0 lmb:text-3xl lmb:gap-x-10 tablet:text-4xl child-hover:hover:text-pri_yellow">
              <Link target="_blank" href={"https://discord.gg/Xpk25q6vRy"}>
                <FaDiscord />{" "}
              </Link>
              <Link target="_blank" href={"https://www.facebook.com/EzzStars"}>
                <FaFacebookF />{" "}
              </Link>
              <Link target="_blank" href={"https://youtube.com/@ezzstar5293"}>
                <FaYoutube />
              </Link>
              <Link
                target="_blank"
                href={
                  "https://www.instagram.com/ezzstars/?igshid=MDM4ZDc5MmU%3D"
                }
              >
                <FaInstagram />
              </Link>
              <Link
                target="_blank"
                href={
                  "https://twitter.com/EzzStars?t=6n8ec_DW0lZavkEetShnIg&s=09"
                }
              >
                <FaTwitter />
              </Link>
              <Link
                target="_blank"
                href={
                  "https://www.tiktok.com/@ezzstar.space?_t=8ZC8f4OCq9a&_r=1"
                }
              >
                <FaTiktok />
              </Link>
            </div>




            <div className="flex flex-col gap-y-3  lmb:text-lg lmb:gap-x-12 tablet:flex-row tablet:text-xl items-center tablet:gap-x-5 ">
              <div className="flex gap-x-5 child-hover:hover:text-pri_yellow">
              <Link href={"/about"}>About us</Link>
              <Link href={"mailto:support@ezzstar.com"}>Support</Link>
              </div>
              <div className="flex gap-x-5 child-hover:hover:text-pri_yellow">
              <a href={"/"}>Privacy Policy</a>
              <a href={"/"}>Terms and Conditions</a>
              </div>
            </div>




          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Footer;
