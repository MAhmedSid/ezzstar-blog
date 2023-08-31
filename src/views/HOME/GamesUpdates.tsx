import BlogCard from "@/components/BlogCard";
import Wrapper from "@/components/Wrapper";
import React from "react";

const GamesUpdates = () => {
  return (
    <section className="flex flex-col  w-full px-2 gap-y-10 tablet:px-5  justify-center items-center ">
      <Wrapper>
        <div className="flex flex-col w-full gap-y-3">
          <h2 className="text-2xl font-bold text-center tablet:text-left">
            GAMING UPDATES
          </h2>
          <div className=" grid grid-cols-1 tablet:grid-cols-3  gap-y-10 gap-x-10 place-items-center">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </Wrapper>
      <button className="text-lg font-semibold bg-pri_purple rounded-full px-8 py-1">View More</button>
    </section>
  );
};

export default GamesUpdates;
