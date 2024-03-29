"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import futureImg from "/public/images/account.png";
import Link from "next/link";
import SignUpForm from "@/views/FORMS/SignupForm";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";



function Page()  {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {

   ;(async function(){
      const {data,error} = await supabase.auth.getSession();
      if(error){
        console.log(error.message);
      }
      if (data.session) {
        router.push("/");
      }
    })()

  }, []);

  return (
    <>
      <main id="signup" className="flex h-full w-full items-center justify-center rounded-2xl px-5 py-5 text-white lmb:py-10 tablet:px-3 lp:py-20  ">
        <section className="flex w-full max-w-[500px] flex-col rounded-2xl tablet:relative tablet:max-h-[800px] tablet:max-w-[900px] tablet:flex-row ">
          <Image
            priority
            placeholder="blur"
            src={futureImg}
            alt="Ezzstar feedback"
            className="h-full max-h-[800px] w-full rounded-t-2xl object-cover  tablet:rounded-2xl"
          />
          <div className="flex h-full w-full rounded-b-2xl  bg-black bg-opacity-80 tablet:absolute tablet:right-0  tablet:top-0 tablet:h-full  tablet:w-1/2 tablet:rounded-r-2xl tablet:rounded-bl-none">
            <div className="flex flex-col gap-5 px-4 py-5 tablet:justify-center">
              <h2 className="text-2xl font-bold lp:text-3xl">
                Join Human beings and Aliens to compete universally in EZZSTAR.
              </h2>
              <p className=" text-pri_yellow lp:text-base">
                EZZSTAR offers the most immersive virtual reality experience of
                its kind (both for gaming and for socializing), giving you a
                chance to become your own mini-celebrity in the game, or just
                have a blast exploring new worlds!
              </p>

              <SignUpForm />

              <div className="flex flex-col items-center justify-center gap-y-4">
                <div className="flex flex-col gap-y-3 text-center">
                  <p>Do you have an Account?</p>
                  <Link prefetch href={"/account/signin/#signin"} className="text-pri_yellow">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
