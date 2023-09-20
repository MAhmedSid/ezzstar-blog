import BlogList from "@/components/BlogList";
import FetchSessionComp from "@/components/GetSessionComp";
import Wrapper from "@/components/Wrapper";
import { cdnClient } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import React from "react";

const page = async () => {

   const totalLength = await cdnClient.fetch(
    groq`count(*[_type == "blogs" && category == 'Blog'])`,
  );

  return <>
   <FetchSessionComp/>
  <main className="flex flex-col w-full gap-y-10 justify-center items-center">
  <Wrapper>
    <div className="flex flex-col gap-y-4">
      <div className="h-full w-full flex flex-col tablet:flex-row px-2 gap-y-2 tablet:gap-x-5 justify-center">
        

         <BlogList cat="Blog" totalLength={totalLength} />

   
        <div className="sticky top-10 h-[100px] w-full tablet:h-[600px] tablet:w-[200px] bg-slate-500"></div>

        
      </div>
    </div>
  </Wrapper>
 
</main></>;
};

export default page;
