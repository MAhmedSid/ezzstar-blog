import BlogList from "@/components/BlogList";
import FetchSessionComp from "@/components/GetSessionComp";
import Wrapper from "@/components/Wrapper";
import { cdnClient, client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import React from "react";
import adImg from "/public/images/ad.png";
import adlandscape from "/public/images/adlandscape.png";
import Image from "next/image";
import Ad160x600 from "@/components/ADS/Ad160x600";
import Ad300x250 from "@/components/ADS/Ad300x250";
import Ad320x50 from "@/components/ADS/Ad320x50";

export const metadata = {
  title: "BLOGS - EZZSTAR",
  description:
    "BLOG Platform for metaverse, web3.0  enthusiast, next level future content",
  themeColor: "#09090b",
};

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/catlength/Blog`,{cache:"reload"})
  const body = await res.json();
  const totalLength = body.length;

  return (
    <main className="flex w-full flex-col items-center justify-center gap-y-10 pt-20">
      <Wrapper>
        <div className="flex w-full flex-col gap-y-4">
          {/* This AD will show in mobiles */}
          <div className="flex w-full justify-center object-cover tablet:hidden">
            <Ad320x50 />
          </div>
          <div className="flex w-full flex-col justify-center gap-y-2 px-2 tablet:flex-row tablet:gap-x-5">
            <BlogList cat="Blog" totalLength={totalLength} />
            {/* This AD will show in big screens */}
            <div className="sticky top-20  hidden h-[100px] w-full tablet:flex tablet:h-[600px] tablet:w-[200px]">
              <Ad160x600 />
            </div>
          </div>

          {/* This AD will show in mobiles */}
          <div className="flex w-full justify-center object-cover tablet:hidden">
            <Ad300x250 />
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default page;
