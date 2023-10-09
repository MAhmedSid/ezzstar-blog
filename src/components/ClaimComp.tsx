"use client";
import React, { useEffect, useRef, useState } from "react";
import coinImg from "/public/images/Spica_coin.webp";
import Image from "next/image";
import Countdown from "react-countdown";
import { toast } from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { selectUserID } from "@/store/session/sessionReducer";
import { useAppSelector } from "@/store/store";

interface IUserData {
  wallet_address: string;
  last_claim: number;
  spica_amount: number;
  withdrawl: boolean;
}

const ClaimComp = () => {
  const currMilli = new Date().getTime();

  const supabase = createClientComponentClient();
  const userID = useAppSelector(selectUserID);

  const [states, setStates] = useState({
    walletAddress: "0x00000000000",
    withdrawl: false,
    spicaAmount: 0.0,
    lastClaim: 0,
    nextClaim: 0,
    refresh: false,
  });

  const handleRefresh = () => {
    setStates({ ...states, refresh: !states.refresh });
  };

  useEffect(() => {
    ;(async function(){
      if (!userID) {
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("wallet_address ,last_claim , withdrawl , spica_amount")
        .eq("id", userID);

      if (error) {
        console.log(`${error.message}`);
        return;
      }
      const userData: IUserData = data[0];
      setStates({
        ...states,
        walletAddress: userData.wallet_address
          ? `${userData.wallet_address?.substring(0, 13)}...`
          : "0x00000000000",
        spicaAmount: userData.spica_amount === 0 ? 0.0 : userData.spica_amount,
        withdrawl: userData.withdrawl,
        lastClaim: userData.last_claim,
        nextClaim: userData.last_claim + 3600,
      });
    })()
  }, [userID, states.refresh]);

  const handleClaim = async () => {
    if (userID === "") {
      toast.error("Sign In to Claim $SPCA");
      return;
    }

    const date = new Date().getTime();
    const currSeconds = Math.round(date / 1000);
    if (states.nextClaim !== 3600) {
      if (currSeconds < states.nextClaim) {
        toast.error(`Claim after cooldown`);
        return;
      }
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        spica_amount: states.spicaAmount + 0.1,
        last_claim: currSeconds,
      })
      .eq("id", userID)
      .returns();

    if (error) {
      toast.error(`Unsuccessful deposit, Try Again Or Contact Support`);
      console.log(error.message);
      return;
    } else {
      toast.success("Successfully deposit 0.1 $SPCA");
      handleRefresh();
    }
  };

  const handleWithdrawl = async () => {
    if (userID === "") {
      toast.error("Sign In to Withdraw $SPCA");
      return;
    }
    if (states.withdrawl === true) {
      toast.error(
        "You have already applied for Withdrawl, please wait upto 24 Hours",
      );
      return;
    }
    if (states.spicaAmount < 50) {
      toast.error("You have less $SPCA than Threshold Amount");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ withdrawl: true, spica_amount: states.spicaAmount - 50 })
      .eq("id", userID);

    if (error) {
      console.log(error.message);
      return;
    } else {
      setStates({ ...states, withdrawl: true });
      toast.success(
        "Successfully applied. It may take upto 24 hours to transfer $SPCA in your wallet",
      );
      handleRefresh();
    }
  };

  return (
    <div className="ml-[10vw]  mr-5 mt-2 flex flex-col  justify-center gap-y-1 tablet:ml-0 tablet:mr-0">
      <div className="flex gap-x-2 text-sm tablet:text-base py-3">
        <p className="rounded-full bg-pri_pink px-1 py-1 lp:px-2 lp:py-2">
          {states.walletAddress}
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
            <div className="ml-5  mt-3 flex flex-col text-sm">
              <p className="max-w-[15px] leading-tight">
                {states.spicaAmount === 0
                  ? `0.${states.spicaAmount}`
                  : states.spicaAmount.toFixed(1)}
                   {" "}spca
              </p>
          
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
              <div className="flex flex-col pr-1 text-sm font-semibold hover:text-pri_pink">
                <p>claim</p>
                <p>$spca</p>
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
                  date={
                    states.lastClaim === 0
                      ? currMilli + 10000
                      : states.nextClaim * 1000
                  }
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
        <p className="text-sm tablet:text-base">Claim 0.1 $SPICA every hour.</p>
        <p className="text-sm tablet:text-base">Sign up \ Sign in to Claim.</p>
        <p className="flex gap-x-1 text-sm tablet:text-base">
          <span className="text-[#54e8b6]"> Withdraw Threshold:</span>
          <span className="font-bold text-pri_pink ">50 $SPCA</span>
        </p>
      </div>
    </div>
  );
};

export default ClaimComp;
