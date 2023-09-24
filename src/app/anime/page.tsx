import BlogList from "@/components/BlogList";
import FetchSessionComp from "@/components/GetSessionComp";
import Wrapper from "@/components/Wrapper";
import { cdnClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import React from "react";

export const metadata = {
  title: "ANIME - EZZSTAR",
  description:
    "ANIME Updates, legacy with new heights of web3 and metaverse - EZZSTAR Development",
  themeColor: "#09090b",
};

const page = async () => {
  const totalLength = await cdnClient.fetch(
    groq`count(*[_type == "blogs" && category == 'Anime'])`,
  );

  return (
    <>
      <main className="flex w-full flex-col items-center justify-center gap-y-10 pt-20">
        <Wrapper>
          <div className="flex flex-col gap-y-4">
            <div className="flex h-full w-full flex-col justify-center gap-y-2 px-2 tablet:flex-row tablet:gap-x-5">
              <BlogList cat="Anime" totalLength={totalLength} />

              <div className="sticky top-10 h-[100px] w-full bg-slate-500 tablet:h-[600px] tablet:w-[200px]"></div>
            </div>
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default page;
