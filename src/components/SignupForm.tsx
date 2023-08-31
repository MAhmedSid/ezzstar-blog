"use client";
import { doSignUp } from "@/lib/authActions";
import { supabase } from "@/lib/supabaseClient";
import React from "react";
import toast from 'react-hot-toast';

const SignUpForm = () => {


  const clientAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data: users, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email);
        if(error){
          throw new Error(error.message);
        }
        console.log(users)
      if (users && users.length > 0) {
        toast.error("Email is already registered.")
        console.log("Email already exist.");
      } else {
        if (email && password) {
          const res = await doSignUp(email,password);
         if(res){
           toast.success("Confirm Your Email Address.",)
         }else{
          toast.error("Something wrong. Try again")
         }
        }
      }
    } catch (error) {
      console.log((error as { message: string }).message);
    }
  };

  return (
  
    <form action={clientAction} className="flex flex-col items-center gap-y-5 ">
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
        Sign Up
      </button>
    </form>
    
  );
};

export default SignUpForm;
