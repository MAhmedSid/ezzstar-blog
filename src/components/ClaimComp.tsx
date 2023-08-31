import React from "react";
import coinImg from "/public/images/Spica_coin.webp";
import Image from "next/image";

const ClaimComp = () => {
  return (
    <div className="flex flex-col mr-5 tablet:mr-0 justify-center  gap-y-1 mt-2 ml-[10vw] tablet:ml-0">
      <div className="flex gap-x-2 text-xs tablet:text-base">
        <p className="rounded-full bg-pri_pink py-1 px-1 lp:py-2 lp:px-2">
          0xsk2k23rkhk2h2l...
        </p>
        <button className="bg-pri_purple py-1 px-2 lp:py-2 lp:px-2 rounded-full">Withdraw</button>
      </div>

      <div className="relative flex">
        <div className="flex">
          <div className=" bg-black  rounded-l-full min-h-[10px] min-w-[60px]  ">
            <div className="ml-5  mt-3 flex flex-col text-xs">
              <p>0.00</p>
              <p>SPCA</p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            viewBox="50 0 100 500"
            className="h-[50px] w-[20px]"
          >
            <path
              stroke="#3f5787"
              d="M0 0v500h100.028C-27.082 322.242-27.48 158.092 100 0"
            ></path>
          </svg>
        </div>

        <div className="flex absolute ml-[70px]">
          <div className=" bg-black rounded-l-full min-h-[10px] min-w-[90px]  "><div className="flex items-center justify-center"><Image src={coinImg} alt="SPICA COIN IMAGE" className="h-12 w-12" /><div className="flex flex-col text-xs font-semibold pr-1"><p>CLAIM</p><p>SPICA</p></div></div></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            viewBox="50 0 100 500"
            className="h-[50px] w-[20px]"
          >
            <path
              stroke="#3f5787"
              d="M0 0v500h100.028C-27.082 322.242-27.48 158.092 100 0"
            ></path>
          </svg>
        </div>

        <div className="flex absolute ml-[170px] ">
          <div className=" bg-black rounded-l-full h-full min-h-[50px] min-w-[100px]  "><p className="ml-5 mt-3">59:59:00</p></div>
          <div className="min-h-[50px] bg-black h-full w-[10px] rounded-r-md" />
        </div>
      </div>

      <div className="flex flex-col items-center rounded-md  bg-black bg-opacity-70 gap-y-1 w-fit px-2 py-1">
        <p className="text-xs tablet:text-base">Claim 0.01 $SPICA every hour.</p>
        <p className="text-xs tablet:text-base">Sign up \ Sign in to Claim.</p>
      <p className="flex gap-x-1 text-sm tablet:text-base"><span className="text-[#54e8b6]"> Withdraw Threshold:</span><span className="text-pri_pink font-bold ">50 $SPCA</span></p>
      </div>

      


    </div>

  );
};

export default ClaimComp;
