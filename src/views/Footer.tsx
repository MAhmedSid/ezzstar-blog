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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function  Footer(){
  return (
    <>
              <div className="my-10 h-[30px] w-[60%] bg-gradient-to-r from-pri_yellow from-80% to-[#0b0b0b] mt-32" />
    <section className="flex w-full flex-col items-center justify-center px-2">
      <Wrapper>
        <div className="flex w-full flex-col items-center text-white tablet:flex-row tablet:justify-between">
          <Image
            src={logo}
            alt="EZZSTAR LOGO"
            className="max-w-[200px] tablet:max-w-[300px]"
          />

          <div className="flex flex-col gap-y-10 pb-4">
            <div className="flex items-center justify-center gap-x-8 px-5 pt-3 text-2xl child-hover:hover:text-pri_yellow lmb:gap-x-10 lmb:px-0 lmb:pt-0 lmb:text-3xl tablet:text-4xl">
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

            <div className="flex flex-col items-center  gap-y-3 lmb:gap-x-12 lmb:text-lg tablet:flex-row tablet:gap-x-5 tablet:text-xl ">
              <div className="flex gap-x-5 child-hover:hover:text-pri_yellow">
                <Dialog >
                  <DialogTrigger>About Us</DialogTrigger>
                  <DialogContent className="h-[80vh] bg-gradient-to-b from-pri_yellow  to-pri_blue p-[2px] ">
                    <DialogHeader className="h-[79vh] flex flex-col gap-y-4 bg-zinc-900 rounded-md p-4">
                      <DialogTitle>ABOUT US</DialogTitle>
                      <DialogDescription  id="about" className="h-full overflow-y-scroll p-2 flex flex-col gap-y-5 text-zinc-300  ">
                        <p>
                          Ezzstar is a visionary company that is shaping the
                          future of entertainment through the creation of a
                          vibrant metaverse. Our goal is to provide an
                          accessible and immersive platform where people can
                          explore, play, and connect in ways never before
                          imagined. We have assembled a team of dedicated
                          developers, designers, and gamers who share a deep
                          passion for the transformative power of video games.
                        </p>

                        <p>
                          Our platform is built on blockchain technology,
                          ensuring true ownership and security for our users.
                          Through the integration of cutting-edge technologies
                          like AI and blockchain, we aim to revolutionize the
                          gaming industry. We believe that the combination of
                          AI-generated user content and blockchain-based gaming
                          with NFTs will usher in a new era of gaming, where
                          true ownership, security, and interoperability are
                          paramount.
                        </p>

                        <p>
                          In addition to our gaming platform, we are excited to
                          introduce the Tag Z CyberHub, a comprehensive
                          destination that caters to all gaming needs. From
                          game-ready assets to motion capture services and
                          EzzstarVT solutions, the Tag Z CyberHub empowers
                          gamers to create and customize their own unique
                          experiences.
                        </p>

                        <p>
                          As we continue to grow and evolve, we remain dedicated
                          to delivering the highest-quality gaming experience
                          possible while fostering innovation and progress in
                          the industry. Join us on this thrilling journey as we
                          shape a metaverse that is vibrant, diverse, and
                          captivating, redefining the boundaries of
                          entertainment.
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Link target="_blank" href={"mailto:support@ezzstar.space"}>Support</Link>
              </div>
            </div>
          </div>
        </div>
        <p className="py-4 text-sm font-medium text-zinc-500 ">
         © 2023 EzzStar All Rights reserved.
        </p>
      </Wrapper>
    </section>
                </>
  );
};

export default Footer;
