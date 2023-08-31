"use client"
import Image from "next/image";
import React from "react";
import futureImg from "/public/images/account.png";
import { sendResetPasswordLink } from "@/lib/authActions";
import { toast } from "react-hot-toast";



const page = () => {

    const handleSubmit = async (e:any)=>{
        e.preventDefault()
        const formData = new FormData(e.target);
        const email = formData.get("email") as string;
       const res = await sendResetPasswordLink(email);
       if(res){
        toast.success("Confirm your email")
       }else{
        toast.error("Something went wrong.")
       }
    }

  
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

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-5 ">
      <input
        placeholder="Email"
        name="email"
        type="email"
        className="min-h-[40px] w-full rounded-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 lmb:min-h-[50px]"
      />
       <button
        type="submit"
        className="rounded-2xl bg-pri_yellow px-12 py-1 text-lg font-bold text-black lmb:px-16 lmb:text-xl"
      >
        Send mail
      </button>
      </form>
            
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;