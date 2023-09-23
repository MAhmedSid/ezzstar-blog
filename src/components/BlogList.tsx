"use client";
import React from "react";
import BlogCover from "./BlogCover";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import Loading from "./Loading";

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
    useInfiniteQuery([`${cat}`], 
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
    <section className="w-full flex flex-col gap-y-2">
      <div className="flex flex-col items-center gap-y-3  tablet:items-start ">
        {data && data?.pages.map((blogArray: any, i: number) => (
          <div className="w-full flex flex-col items-center gap-y-4" key={blogArray && blogArray[0].slug.current}>
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
          <Loading size="h-14 w-14" color="border-pri_yellow" />
        ) : (
          <button
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
            className={`rounded-full cursor-pointer  px-8 py-1 text-lg font-semibold transition-all duration-150 ${hasNextPage ? "bg-pri_purple hover:bg-indigo-900 ": "bg-slate-700 hover:bg-slate-800"}`}
          >
            {hasNextPage ? "Show more" : "All Caught Up"}
          </button>
        )}
      </div>
    </section>
  );
};

export default BlogList;
