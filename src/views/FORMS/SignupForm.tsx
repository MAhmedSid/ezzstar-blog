"use client";
import useSaveSession from "@/hooks/useSaveSession";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const supabase = createClientComponentClient();

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const target = e.target.value as string;
    const value = target.replace(/\s/g, "");
    setPassword(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      console.log("error", error);
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      } else {
        console.log(data);
        toast.success("Confirm Your Email Address.");
      }
    } catch (error) {
      console.log((error as { message: string }).message);
      throw new Error((error as { message: string }).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-5 "
    >
      <input
        required
        placeholder="Email"
        name="email"
        type="text"
        className="min-h-[40px] w-full rounded-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 lmb:min-h-[50px]"
      />

      <div className="flex w-full items-center justify-center">
        <input
          required
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          className=" min-h-[40px] w-full rounded-l-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 focus:outline-none lmb:min-h-[50px]"
        />
        <EyeOff
          onClick={() => setShowPassword(!showPassword)}
          className="h-10 min-h-[40px] w-10 cursor-pointer rounded-r-lg bg-zinc-300 px-2 text-black lmb:min-h-[50px]"
        />
      </div>
      <button
        type="submit"
        className="rounded-2xl bg-pri_yellow px-12 py-1 text-lg font-bold text-black lmb:px-16 lmb:text-xl"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
