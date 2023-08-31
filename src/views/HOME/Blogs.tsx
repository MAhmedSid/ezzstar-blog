import BlogCover from "@/components/BlogCover";
import Wrapper from "@/components/Wrapper";
import React from "react";

const Blogs = () => {
  return (
    <section className="flex flex-col w-full gap-y-10 justify-center items-center">
      <Wrapper>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-bold text-center tablet:text-left">BLOGS</h2>
          <div className="w-full flex flex-col tablet:flex-row px-2 gap-y-2 tablet:gap-x-5 justify-center">
            <div className="h-[100px] w-full tablet:h-[600px] tablet:w-[200px] bg-slate-500"></div>
            <div className="flex flex-col gap-y-3 items-center tablet:items-start ">
              <BlogCover />
              <BlogCover />
              <BlogCover />
            </div>
          </div>
        </div>
      </Wrapper>
      <button className="text-lg font-semibold bg-pri_purple rounded-full px-8 py-1">View More</button>

    </section>
  );
};

export default Blogs;
