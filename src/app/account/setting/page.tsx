import Image from "next/image";
import React from "react";
import futureImg from "/public/images/account.png";
import UpdateForm from "@/views/FORMS/UpdateUserForm";
import Link from "next/link";

const Page = () => {


  return (
    <main id="setting" className="flex h-full w-full items-center justify-center rounded-2xl px-5 py-5 text-white lmb:py-10 tablet:px-3 lp:py-20  ">
      <section className="flex  w-full max-w-[500px] flex-col rounded-2xl tablet:relative tablet:max-h-[800px] tablet:max-w-[900px] tablet:flex-row ">
        <Image
          priority
          placeholder="blur"
          src={futureImg}
          alt="Ezzstar feedback"
          className="h-full max-h-[800px] w-full rounded-t-2xl object-cover  tablet:rounded-2xl"
        />
        <div className="flex h-full w-full justify-center rounded-b-2xl  bg-black bg-opacity-80 tablet:absolute tablet:right-0  tablet:top-0 tablet:h-full  tablet:w-1/2 tablet:rounded-r-2xl tablet:rounded-bl-none">
          <div className="flex flex-col gap-5 px-4 py-5 tablet:justify-center tablet:gap-16">
            <h1 className="text-2xl font-bold text-pri_yellow tablet:text-4xl">
              UPDATE PROFILE
            </h1>
            <UpdateForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
