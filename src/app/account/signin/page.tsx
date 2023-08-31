import Image from "next/image";
import React from "react";
import futureImg from "/public/images/account.png";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { doSignUp } from "@/lib/authActions";
import SignUpForm from "@/components/SignupForm";
import SignInForm from "@/components/SigninForm";



const page = () => {
  
  return (
    <main className="flex h-full w-full items-center justify-center rounded-2xl px-5 py-5 text-white lmb:py-10 tablet:px-3 lp:py-20  ">
      <section className="flex w-full max-w-[500px] flex-col rounded-2xl tablet:relative tablet:max-h-[800px] tablet:max-w-[900px] tablet:flex-row ">
        <Image
          priority
          placeholder="blur"
          src={futureImg}
          alt="Ezzstar feedback"
          className="h-full max-h-[800px] object-cover w-full rounded-t-2xl  tablet:rounded-2xl"
        />
        <div className="flex h-full w-full rounded-b-2xl  bg-black bg-opacity-80 tablet:absolute tablet:right-0  tablet:top-0 tablet:h-full  tablet:w-1/2 tablet:rounded-r-2xl tablet:rounded-bl-none">
          <div className="flex flex-col gap-5 px-4 py-5 tablet:justify-center">
            <h2 className="text-2xl font-bold lp:text-3xl">
              Join Human beings and Aliens to compete universally in EZZSTAR.
            </h2>
            <p className=" text-pri_yellow lp:text-base">
              EZZSTAR offers the most immersive virtual reality experience of
              its kind (both for gaming and for socializing), giving you a
              chance to become your own mini-celebrity in the game, or just have
              a blast exploring new worlds!
            </p>

            <SignInForm/>


            <div className="flex justify-center items-center flex-col gap-y-4">
            <div className="flex flex-col text-center gap-y-3">
                <p>Don&apos;t have an Account?</p>
                <Link href={"/account"} className="text-pri_yellow">
                  Sign Up
                </Link>
              </div>
              <div className="flex flex-col text-center gap-y-3">
                <p>Forgot your Password?</p>
                <Link href={"/account/updatepassword"} className="text-pri_yellow">
                  Reset Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;