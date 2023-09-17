"use client";
import React, { useEffect, useState } from "react";
import BlogCover from "./BlogCover";
import { cdnClient, client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import toast from "react-hot-toast";

const BlogList = ({ cat }: { cat: string }) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [lastLength, setLastLength] = useState(0);
  const [isMutating, setIsMutating] = useState(false);

  let length = 0;

  const getData = async () => {
    try {
      setIsMutating(true);
      if (length == 0) {
        const lengthRes = await cdnClient.fetch(
          groq`count(*[_type == "blogs" && category == '${cat}'])`,
        );
        length = lengthRes;
      }
      if (lastLength > length) {
        toast.success("You have reached the End.");
        setIsMutating(false);
        return;
      }

      const data =
        await cdnClient.fetch(groq`*[_type == "blogs" && category == '${cat}'] | order(published_at desc) [${lastLength}...${
          lastLength + 9
        }] {
        title,
            slug,
            meta_desc,
            displayImg,
            published_at,
            category,
            "likesCount": length(likes)
          }`);
      setBlogs([...blogs, ...data]);
      setLastLength(lastLength + 9);
      setIsMutating(false);
    } catch (error) {
      toast.error(
        `Error on our side: ${
          (error as { message: string }).message
        } , please try again`,
      );
      setIsMutating(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="flex flex-col gap-y-2">
      <div className="flex flex-col items-center gap-y-3  tablet:items-start ">
        {blogs.length > 0 &&
          blogs.map((blog: any, i: number) => {
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
      <div className="flex  justify-center min-w-[300px] lp:min-w-[600px] lcd:min-w-[1000px]">

      {isMutating ? (
          <p className=" text-2xl font-semibold text-pri_yellow">LOADING!!!</p>
        ) : (
          <button
            onClick={() => getData()}
            className="rounded-full bg-pri_purple px-8 py-1 text-lg font-semibold"
          >
            Load more
          </button>
        )}

      </div>
    </section>
  );
};

export default BlogList;
