"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


const Reply = () => {


  

  return (
    <div className="h-full w-full ">
      <div className="flex h-full w-full  gap-x-2">
        <Image src={"https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"}  width={70}
            height={70} alt=""
            className="h-[60px] w-[60px] max-h-[60px] max-w-[60px] rounded-full object-cover" />
        <div className=" flex flex-col">
          <p className="text-blue-500">Username</p>
          <p>March 22, 2023 at 6:04 PM</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sequi
            officia laboriosam error accusamus harum aspernatur dicta placeat
            labore sit dolorem porro inventore qui tempore reprehenderit,
            deserunt cupiditate rerum, excepturi quidem quae? 🎉🎊
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
