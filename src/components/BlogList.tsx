"use client";
import React from "react";
import BlogCover from "./BlogCover";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

const BlogList = ({
  cat,
  totalLength,
}: {
  cat: string;
  totalLength: number;
}) => {

  const getData = async ({ pageParam = 0 }: QueryFunctionContext) => {
    const res = await fetch("/api/getList", {
      method: "PUT",
      body: JSON.stringify({ cat, lastLength: pageParam }),
      headers: { "Content-Type": "application/json" },
    });
    const body = await res.json();
    return body.data;
  };

  const { isLoading, isError, error , data, hasNextPage, fetchNextPage } =
    useInfiniteQuery(["blogs"], 
    getData, 
    {
      refetchOnWindowFocus:false,
      staleTime: 1000 * 60 * 5, 
      cacheTime: 1000 * 60 * 10,
      getNextPageParam: (_lastPage, blogs) => {
        if (blogs.length * 10 < totalLength) {
          return blogs.length;
        } else {
          return undefined;
        }
      },
    });

  return (
    <section className="flex flex-col gap-y-2">
      <div className="flex flex-col items-center gap-y-3  tablet:items-start ">
        {data && data?.pages.map((blogArray: any, i: number) => (
          <div key={blogArray && blogArray[0].slug.current}>
            {blogArray && blogArray.map((blog: any, i: number) => {
              return (
                <BlogCover
                  key={blog?.slug.current}
                  title={blog?.title}
                  slug={blog?.slug.current}
                  desc={blog?.meta_desc}
                  likesCount={blog?.likesCount}
                  date={blog?.published_at}
                  category={""}
                  imgSrc={blog?.displayImg?.asset}
                  imgAlt={blog.displayImg?.alt}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex  min-w-[300px] justify-center lp:min-w-[600px] lcd:min-w-[1000px]">
        {isLoading ? (
          <p className=" text-2xl font-semibold text-pri_yellow">LOADING!!!</p>
        ) : (
          <button
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
            className={`rounded-full  px-8 py-1 text-lg font-semibold ${hasNextPage?"bg-pri_purple":"bg-pri_purple"}`}
          >
            {hasNextPage ? "Load more" : "You catch up the end"}
          </button>
        )}
      </div>
    </section>
  );
};

export default BlogList;
