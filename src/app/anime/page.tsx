import BlogList from "@/components/BlogList";
import FetchSessionComp from "@/components/GetSessionComp";
import Wrapper from "@/components/Wrapper";
import { cdnClient, client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import Image from "next/image";
import React from "react";
import adlandscape from "/public/images/adlandscape.png"

import adImg from "/public/images/ad.png"


export const metadata = {
  title: "ANIME - EZZSTAR",
  description:
    "ANIME Updates, legacy with new heights of web3 and metaverse - EZZSTAR Development",
  themeColor: "#09090b",
};

const page = async () => {
  const totalLength = await client.fetch(
    groq`count(*[_type == "blogs" && category == 'Anime'])`,
  );

  return (
    <>
      <main className="flex w-full flex-col items-center justify-center gap-y-10 pt-20">
        <Wrapper>
          <div className="flex flex-col gap-y-4">
            <div className="flex h-full w-full flex-col justify-center gap-y-2 px-2 tablet:flex-row tablet:gap-x-5">
              <BlogList cat="Anime" totalLength={totalLength} />

              <div className="hidden tablet:flex  sticky top-10 h-[100px] w-full bg-slate-500 tablet:h-[600px] tablet:w-[200px]"><Image src={adImg} alt="ad"  className="h-full w-full"/></div>
            </div>
            <Image src={adlandscape} alt="ad"  className="h-[100px] w-full object-cover tablet:hidden"/>
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default page;
