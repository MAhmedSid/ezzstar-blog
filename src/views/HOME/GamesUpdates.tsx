import BlogCard from "@/components/BlogCard";
import Wrapper from "@/components/Wrapper";
import { PrimaryButton } from "@/components/utils/Buttons";
import Link from "next/link";
import React from "react";

async function GamesUpdates(blogData: any){
  const data = blogData.blogsData;

  return (
    <section className="flex w-full  flex-col items-center justify-center gap-y-10  px-2 tablet:px-5 ">
      <Wrapper>
        <div className="flex w-full flex-col items-center gap-y-3">
          <h2 className="text-center text-2xl font-bold tablet:text-left">
            GAMING UPDATES
          </h2>
          <div className="grid max-w-[250px] grid-cols-1  place-items-center gap-x-10 gap-y-10  lmb:max-w-[300px] tablet:max-w-full tablet:grid-cols-3">
            {data &&
              data.map((blog: any, i: any) => {
                return (
                  blog && (
                    <BlogCard
                      key={blog?.slug.current}
                      title={blog?.title}
                      slug={blog?.slug.current}
                      desc={blog?.meta_desc}
                      likesCount={blog?.likesCount}
                      date={blog?.published_at}
                      category={blog?.category}
                      showCat={false}
                      imgSrc={blog?.displayImg?.asset}
                      imgAlt={blog.displayImg?.alt}
                    />
                  )
                );
              })}
          </div>
        </div>
      </Wrapper>
      <PrimaryButton type="button" disabled={false} text="">
        <Link href={"/gaming"}>Show More</Link>
      </PrimaryButton>
    </section>
  );
};

export default GamesUpdates;
