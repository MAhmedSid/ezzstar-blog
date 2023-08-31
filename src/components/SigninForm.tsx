"use client";
import { doSignUp } from "@/lib/authActions";
import { supabase } from "@/lib/supabaseClient";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";

const SignInForm = () => {

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "mahmedsiddiqui333@gmail.com",
        password: "ahmed66",
      });
      if(!data.user){
        throw new Error(error?.message);
      }
      console.log("LOG IN DATA", data);

    } catch (error) {
      console.log((error as { message: string }).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-5 "
    >
      <input
        placeholder="Email"
        name="email"
        type="text"
        className="min-h-[40px] w-full rounded-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 lmb:min-h-[50px]"
      />

      <input
        placeholder="Password"
        type="password"
        name="password"
        className="min-h-[40px] w-full rounded-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 lmb:min-h-[50px]"
      />
      <button
        type="submit"
        className="rounded-2xl bg-pri_yellow px-12 py-1 text-lg font-bold text-black lmb:px-16 lmb:text-xl"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;