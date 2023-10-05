import BlogList from "@/components/BlogList";
import Wrapper from "@/components/Wrapper";
import { cdnClient, client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import React from "react";
import adImg from "/public/images/ad.png"
import adlandscape from "/public/images/adlandscape.png"
import Image from "next/image";



export const metadata = {
  title: 'GAMING - EZZSTAR',
  description: "True gaming with metaverse, future content",
  themeColor: '#09090b',
}


const page = async () => {
  const totalLength = await cdnClient.fetch(
    groq`count(*[_type == "blogs" && category == 'Games'  && !(_id in path("drafts.**"))])`,
  );
  return <main className="flex flex-col w-full pt-20 gap-y-10 justify-center items-center">
  <Wrapper>
    <div className="w-full flex flex-col gap-y-4">
      <div className="h-full w-full flex flex-col tablet:flex-row px-2 gap-y-2 tablet:gap-x-5 justify-center">
        

      <BlogList cat="Games" totalLength={totalLength} />

   
        <div className="hidden tablet:flex sticky top-10 h-[100px] w-full tablet:h-[600px] tablet:w-[200px] bg-slate-500"><Image src={adImg} alt="ad"  className="h-full w-full "/></div>

        
      </div>
      <Image src={adlandscape} alt="ad"  className="h-[100px] w-full object-cover  tablet:hidden"/>
    </div>
  </Wrapper>
 
</main>;
};

export default page;