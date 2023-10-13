import BlogList from "@/components/BlogList";
import FetchSessionComp from "@/components/GetSessionComp";
import Wrapper from "@/components/Wrapper";
import { cdnClient, client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import React from "react";
import adImg from "/public/images/ad.png"
import adlandscape from "/public/images/adlandscape.png"
import Image from "next/image";



export const metadata = {
  title: "BLOGS - EZZSTAR",
  description:
    "BLOG Platform for metaverse, web3.0  enthusiast, next level future content",
  themeColor: "#09090b",
};

async function page()    {
  const totalLength = await client.fetch(
    groq`count(*[_type == "blogs" && category == 'Blog'  && !(_id in path("drafts.**"))])`,
  );

  return (
    <main className="flex w-full flex-col items-center justify-center gap-y-10 pt-20">
      <Wrapper>
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full flex-col justify-center gap-y-2 px-2 tablet:flex-row tablet:gap-x-5">
            <BlogList cat="Blog" totalLength={totalLength} />
            <div className="hidden tablet:flex  sticky top-10 h-[100px] w-full bg-slate-500 tablet:h-[600px] tablet:w-[200px]"><Image src={adImg} alt="ad"  className="h-full w-full"/></div>
          </div>
          <Image src={adlandscape} alt="ad"  className="h-[100px] w-full object-cover tablet:hidden"/>
        </div>
      </Wrapper>
    </main>
  );
};

export default page;
