"use client";
import Loading from "@/components/Loading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EyeOff } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const supabase = createClientComponentClient();

  const [states, setStates] = useState({
    password: "",
    showPassword: false,
    isMutating: false,
  });

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value as string;
    const value = target.replace(/\s/g, "");
    setStates({ ...states, password: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStates({ ...states, isMutating: true });
      const formData = new FormData(e.target as HTMLFormElement);

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const {data:data1,error:error1} = await supabase.from("profiles").select("email").eq("email", email);
      if(error1){
        toast.error("Something Wrong, Try Again.")
        setStates({ ...states, isMutating: false });
        return;
      }
      if(data1[0]?.email === email){
        
        toast.error("Email is already in use ( confirm email/reset password )")
        setStates({ ...states, isMutating: false });
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      } else {
        setStates({ ...states, isMutating: false });
        toast.success("Waiting for Confirmation");
      }
    } catch (error) {
      console.log((error as { message: string }).message);
      setStates({ ...states, isMutating: false });
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
        type="email"
        className="min-h-[40px] w-full rounded-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 lmb:min-h-[50px]"
      />

      <div className="flex w-full items-center justify-center">
        <input
          required
          placeholder="Password"
          name="password"
          value={states.password}
          onChange={handleChange}
          type={states.showPassword ? "text" : "password"}
          className=" min-h-[40px] w-full rounded-l-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 focus:outline-none lmb:min-h-[50px]"
        />
        <EyeOff
          onClick={() =>
            setStates({ ...states, showPassword: !states.showPassword })
          }
          className="h-10 min-h-[40px] w-10 cursor-pointer rounded-r-lg bg-zinc-300 px-2 text-black lmb:min-h-[50px]"
        />
      </div>
      <button
        disabled={states.isMutating}
        type="submit"
        className="flex h-[40px] w-[200px] items-center justify-center rounded-2xl bg-pri_yellow py-1 text-lg font-bold text-black transition-all duration-150 hover:bg-yellow-600 lmb:text-xl "
      >
        {states.isMutating ? (
          <Loading size="h-6 w-6" color="border-black" />
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
