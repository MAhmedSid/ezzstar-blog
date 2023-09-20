"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import futureImg from "/public/images/account.png";
import { toast } from "react-hot-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserID } from "@/store/session/sessionReducer";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  

  const [states, setStates] = useState({password:"",showPassword:false,isAuthenticated:false});

  const userId = useSelector(selectUserID);

  useEffect(() => {
    if (userId) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "SIGNED_IN") {

        setStates({...states,isAuthenticated:true});
      }
    });
  }, []);

  const handleChange = (e: any) => {
    const target = e.target.value as string;
    const value = target.replace(/\s/g, "");
    setStates({...states,password:value});
  };

  const handleSubmitEmail = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email") as string;
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/account/updatepassword`,
      });
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      } else {
        toast.success("Check your inbox");
      }
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }
  };

  const handleSubmitPassword = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const password = formData.get("password") as string;
      const { data, error } = await supabase.auth.updateUser({
        password,
      });
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      } else {
        toast.success("Password Successfully Changed.");
        router.push("/");
      }
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }
  };

  return (
    <main
      id="up"
      className="flex h-full w-full items-center justify-center rounded-2xl px-5 py-5 text-white lmb:py-10 tablet:px-3 lp:py-20  "
    >
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
              chance to become your own mini-celebrity in the game, or just have
              a blast exploring new worlds!
            </p>

            {states.isAuthenticated ? (
              <form
                onSubmit={handleSubmitPassword}
                className="flex flex-col items-center gap-y-5 "
              >
                <div className="flex w-full items-center justify-center px-5">
                  <input
                    required
                    placeholder="Enter your new Password"
                    name="password"
                    value={states.password}
                    onChange={handleChange}
                    type={states.showPassword ? "text" : "password"}
                    className=" min-h-[40px] w-full rounded-l-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 focus:outline-none lmb:min-h-[50px]"
                  />
                  <EyeOff
                    onClick={() => setStates({...states, showPassword: !states.showPassword})}
                    className="h-10 min-h-[40px] w-10 cursor-pointer rounded-r-lg bg-zinc-300 px-2 text-black lmb:min-h-[50px]"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-pri_yellow px-12 py-1 text-lg font-bold text-black lmb:px-16 lmb:text-xl"
                >
                  Update Password
                </button>
              </form>
            ) : (
              <>
                <form
                  onSubmit={handleSubmitEmail}
                  className="flex flex-col items-center gap-y-5 "
                >
                  <input
                    required
                    placeholder="Enter your account Email"
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

                <div className="flex flex-col gap-y-3 text-center">
                  <p>Don&apos;t want to Reset Password?</p>
                  <Link prefetch href={"/account/signin/#signin"} className="text-pri_yellow">
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
