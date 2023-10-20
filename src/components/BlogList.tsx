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
      next: { revalidate: 3600 },
    });
    const body = await res.json();
    return body.data;
  };

  const { isLoading, isError, error, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery([`${cat}`], getData, {
      refetchOnWindowFocus: false,
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
    <section className="flex w-full flex-col gap-y-2">
      <div className="flex flex-col items-center gap-y-3  tablet:items-start ">
        {isLoading ? (
          <div className="flex  min-w-[300px] justify-center lp:min-w-[600px] lcd:min-w-[1000px]">
            <Loading size="h-14 w-14" color="border-pri_yellow" />
          </div>
        ) : data && data?.pages[0][0]?.slug.current ? (
          <>
            {data?.pages.map((blogArray: any, i: number) => (
              <div
                className="flex w-full flex-col items-center gap-y-4"
                key={blogArray[0] ? blogArray[0].slug.current : ""}
              >
                {blogArray &&
                  blogArray.map((blog: any, i: number) => {
                    return (
                      <BlogCover
                        key={blog && blog?.slug.current}
                        title={blog && blog?.title}
                        slug={blog && blog?.slug.current}
                        desc={blog && blog?.meta_desc}
                        likesCount={blog && blog?.likesCount}
                        date={blog && blog?.published_at}
                        category={blog?.category}
                        showCat={false}
                        imgSrc={blog && blog?.displayImg?.asset}
                        imgAlt={blog && blog.displayImg?.alt}
                      />
                    );
                  })}
              </div>
            ))}
            <button
              disabled={!hasNextPage}
              onClick={() => fetchNextPage()}
              className={`m-auto cursor-pointer  rounded-full  px-8 py-1 text-lg font-semibold transition-all duration-150 ${
                hasNextPage
                  ? "bg-pri_purple hover:bg-indigo-900 "
                  : "bg-slate-700 hover:bg-slate-800"
              }`}
            >
              {hasNextPage ? "Show more" : "All Caught Up"}
            </button>
          </>
        ) : (
          <div className="flex w-full  min-w-[300px] justify-center lp:min-w-[600px] lcd:min-w-[1000px]">
            <h2 className="text-2xl font-semibold text-white tablet:text-4xl">
              NO POSTS YET!
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
