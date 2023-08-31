import BlogCover from "@/components/BlogCover";
import Wrapper from "@/components/Wrapper";
import React from "react";

const LatestUpdates = () => {
  return (
    <section className="flex flex-col w-full justify-center items-center">
      <Wrapper>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-bold text-center tablet:text-left">LATEST UPDATES</h2>
          <div className="w-full flex flex-col tablet:flex-row px-2 gap-y-2 tablet:gap-x-5 justify-center">
            <div className="flex flex-col gap-y-3 items-center tablet:items-start ">
              <BlogCover />
              <BlogCover />
              <BlogCover />
            </div>
            <div className="h-[100px] w-full tablet:h-[600px] tablet:w-[200px] bg-slate-500"></div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default LatestUpdates;
