"use client";
import React, { useEffect, useRef, useState } from "react";
import coinImg from "/public/images/Spica_coin.webp";
import Image from "next/image";
import { useAppSelector } from "@/store/store";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserID } from "@/store/session/sessionReducer";

interface IUserData {
  wallet_address: string;
  last_claim: number;
  spica_amount: number;
  withdrawl: boolean;
}

const ClaimComp = () => {
  const currMilli = new Date().getTime();

  const router = useRouter();
  const supabase = createClientComponentClient();
  const userID = useSelector(selectUserID);

  const [walletAddress, setWalletAddress] = useState("0x00000000000");
  const [withdrawl, setWithdrawl] = useState(false);
  const [spicaAmount, setSpicaAmount] = useState(0.0);
  const [lastClaim, setLastClaim] = useState(0);
  const [nextClaim, setNextClaim] = useState(0);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const getData = async () => {
      if (!userID) {
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("wallet_address ,last_claim , withdrawl , spica_amount")
        .eq("id", userID);

      if (error) {
        toast.error(`${error.message}`);
        return;
      }

      const userData: IUserData = data[0];
      setWalletAddress(`${userData.wallet_address.substring(0, 13)}...`);
      setSpicaAmount(userData.spica_amount === 0 ? 0.0 : userData.spica_amount);
      setWithdrawl(userData.withdrawl);
      setLastClaim(userData.last_claim);
      setNextClaim(userData.last_claim + 3600);

    };

    getData();
  }, [userID, refresh]);

  const handleClaim = async () => {
    if (userID === "") {
      toast.error("Sign In to Claim $SPCA");
      return;
    }

    const date = new Date().getTime();
    const currSeconds = Math.round(date / 1000);

    if (nextClaim !== 3600) {
      if (currSeconds < nextClaim) {
        toast.error(`You can Claim after a time period`);
        return;
      }
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ spica_amount: spicaAmount + 0.01, last_claim: currSeconds })
      .eq("id", userID)
      .returns();

    if (error) {
      toast.error(`${error.message}`);
      console.log(error.message);
      return;
    } else {
      handleRefresh();
    }
  };

  const handleWithdrawl = async () => {
    if (userID === "") {
      toast.error("Sign In to Withdraw $SPCA");
      return;
    }
    if (withdrawl === true) {
      toast.error("You have already applied for Withdrawl, please wait.");
      return;
    }
    if(spicaAmount < 50){
      toast.error("You have less than 50 SPCA")
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ withdrawl: true, spica_amount: spicaAmount - 50 })
      .eq("id", userID);

    if (error) {
      toast.error(`${error.message}`);
      console.log(error.message);
      return;
    } else {
      setWithdrawl(true);
      toast.success(
        "Successfully applied. It may take upto 24 hours to transfer $SPCA",
      );
      handleRefresh();
    }
  };

  return (
    <div className="ml-[10vw] mr-5 mt-2 flex flex-col  justify-center gap-y-1 tablet:ml-0 tablet:mr-0">
      <div className="flex gap-x-2 text-xs tablet:text-base">
        <p className="rounded-full bg-pri_pink px-1 py-1 lp:px-2 lp:py-2">
          {walletAddress}
        </p>
        <button
          onClick={handleWithdrawl}
          className="cursor-pointer  rounded-full bg-pri_purple px-2 py-1 transition-all duration-100 ease-in hover:text-pri_pink lp:px-2 lp:py-2"
        >
          Withdraw
        </button>
      </div>

      <div className="relative flex">
        <div className="flex">
          <div className=" min-h-[10px]  min-w-[60px] rounded-l-full bg-black  ">
            <div className="ml-5  mt-3 flex flex-col text-xs">
              <p>
                {spicaAmount === 0
                  ? `0.0${spicaAmount}`
                  : spicaAmount.toFixed(2)}
              </p>
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

        <div className="absolute ml-[70px] flex">
          <div className=" min-h-[10px] min-w-[90px] rounded-l-full bg-black  ">
            <button
              onClick={handleClaim}
              className="flex items-center justify-center "
            >
              <Image
                src={coinImg}
                alt="SPICA COIN IMAGE"
                className="h-12 w-12 rounded-full hover:animate-spin-slow"
              />
              <div className="flex flex-col pr-1 text-xs font-semibold hover:text-pri_pink">
                <p>CLAIM</p>
                <p>SPICA</p>
              </div>
            </button>
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

        <div className="absolute ml-[170px] flex ">
          <div className=" h-full min-h-[50px] min-w-[100px] rounded-l-full bg-black  ">
            <div className="ml-5 mt-3">
              {userID ? (
                <Countdown
                  autoStart
                  daysInHours
                  date={lastClaim === 0 ? currMilli + 10000 : nextClaim * 1000}
                />
              ) : (
                <span className="">$SPCA</span>
              )}
            </div>
          </div>
          <div className="h-full min-h-[50px] w-[10px] rounded-r-md bg-black" />
        </div>
      </div>

      <div className="flex w-fit flex-col items-center  gap-y-1 rounded-md bg-black bg-opacity-70 px-2 py-1">
        <p className="text-xs tablet:text-base">
          Claim 0.01 $SPICA every hour.
        </p>
        <p className="text-xs tablet:text-base">Sign up \ Sign in to Claim.</p>
        <p className="flex gap-x-1 text-sm tablet:text-base">
          <span className="text-[#54e8b6]"> Withdraw Threshold:</span>
          <span className="font-bold text-pri_pink ">50 $SPCA</span>
        </p>
      </div>
    </div>
  );
};

export default ClaimComp;
