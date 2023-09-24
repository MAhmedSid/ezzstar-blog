import Image from "next/image";
import React from "react";
import mainImg from "/public/images/main.png";
import chashmaImg from "/public/images/chashma.png";
import { Press_Start_2P } from "next/font/google";
import ClaimComp from "@/components/ClaimComp";
import Link from "next/link";

const ps = Press_Start_2P({ weight: ["400"], subsets: ["latin"] });

const HeroComp = () => {
  return (
    <section className="relative w-full">
      <Image
        id="t"
        src={mainImg}
        alt={"Ezzstar Wallpaper"}
        height={1644}
        width={2850}
        className="h-full min-h-[350px] w-full object-cover lmb:min-h-[450px] tablet:max-h-[400px] tablet:object-cover "
        priority
      />
      <div className="absolute top-5 flex h-full w-full flex-col gap-y-4  px-1">
        <div className="flex w-full lmb:justify-end">
          <h1 className="max-w-[400px] text-center text-3xl  font-bold lmb:text-5xl tablet:max-w-[500px] tablet:text-left tablet:text-6xl lcd:max-w-[600px] lcd:text-7xl">
            A NEW <span className="px-1 text-pri_yellow"> WORLD </span> AWAITS
            YOU
          </h1>
        </div>

        <div className="flex w-full flex-col lmb:mt-28 lmb:flex-row lmb:justify-between  lmb:pr-8  tablet:mt-20 tablet:justify-around lcd:mt-12 ">
          <div className="flex  gap-x-4 lmb:flex-col lmb:gap-y-3">
            <Link
              href={"https://ezzstar.space"}
              className="flex w-fit max-w-[120px] flex-col items-center   rounded-md bg-black px-1 lmb:w-full tablet:max-w-[180px] tablet:flex-row"
            >
              <Image
                src={chashmaImg}
                alt="EZZSTAR logo"
                className="h-10 w-10 tablet:h-14 tablet:w-14"
              />
              <p className={` font-semibold text-white `}>ezzstar.space</p>
            </Link>
            <div
              className="inline-block w-fit max-w-[120px] lmb:w-full tablet:max-w-[180px]"
              tabIndex={0}
              data-te-toggle="tooltip"
              title="COMING SOON"
            >
              <button
                type="button"
                disabled={true}
                className="h-full w-full cursor-not-allowed items-center justify-center  rounded-md bg-black  px-2 lmb:w-full tablet:max-w-[180px]"
              >
                <p className="bg-gradient-to-br from-[#E004D7] from-45% to-[#05FBDD] bg-clip-text font-extrabold text-transparent hover:from-slate-400 hover:to-white tablet:py-2  tablet:text-2xl">
                  NFT DISPLAY
                </p>
              </button>
            </div>
            <Link
              href={"https://discord.gg/Xpk25q6vRy"}
              className="flex w-fit max-w-[120px] flex-col items-center gap-x-2 rounded-md bg-black px-2 lmb:w-full tablet:max-w-[180px]  tablet:flex-row"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hovered-paths h-6 w-6 fill-white tablet:h-12 tablet:w-12"
                enableBackground="new 0 0 512 512"
                viewBox="0 0 512 512"
              >
                <path
                  d="M433.43 93.222a422.256 422.256 0 00-104.216-32.324 1.582 1.582 0 00-1.675.792c-4.501 8.005-9.486 18.447-12.977 26.655-39.353-5.892-78.505-5.892-117.051 0-3.492-8.39-8.658-18.65-13.179-26.655a1.643 1.643 0 00-1.675-.792c-36.568 6.298-71.562 17.33-104.216 32.324a1.49 1.49 0 00-.686.589c-66.376 99.165-84.56 195.893-75.64 291.421.04.467.303.914.666 1.198 43.793 32.161 86.215 51.685 127.848 64.627a1.656 1.656 0 001.796-.589c9.848-13.449 18.627-27.63 26.154-42.543.444-.873.02-1.909-.888-2.255-13.925-5.282-27.184-11.723-39.939-19.036-1.009-.589-1.09-2.032-.161-2.723a218.562 218.562 0 007.932-6.217 1.585 1.585 0 011.655-.224c83.792 38.257 174.507 38.257 257.31 0a1.578 1.578 0 011.675.203 204.307 204.307 0 007.952 6.237c.928.691.867 2.134-.141 2.723-12.755 7.456-26.014 13.754-39.959 19.016a1.633 1.633 0 00-.867 2.275c7.689 14.892 16.468 29.073 26.134 42.523.404.569 1.13.813 1.796.609 41.835-12.941 84.257-32.466 128.05-64.627a1.64 1.64 0 00.666-1.178c10.676-110.441-17.881-206.376-75.7-291.421a1.299 1.299 0 00-.664-.608zM171.094 327.065c-25.227 0-46.014-23.16-46.014-51.604s20.383-51.604 46.014-51.604c25.831 0 46.417 23.364 46.013 51.604 0 28.444-20.384 51.604-46.013 51.604zm170.127 0c-25.226 0-46.013-23.16-46.013-51.604s20.383-51.604 46.013-51.604c25.832 0 46.417 23.364 46.014 51.604 0 28.444-20.181 51.604-46.014 51.604z"
                  className="hovered-path"
                  data-original="#000000"
                ></path>
              </svg>
              <p className="text-center text-[10px] font-bold ">
                SPAWN ON OUR DISCORD!
              </p>
            </Link>
          </div>
          <ClaimComp />
        </div>
      </div>
    </section>
  );
};

export default HeroComp;
