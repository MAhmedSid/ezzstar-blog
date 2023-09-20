import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/utils";
import Link from "next/link";

const BlogCover = ({
  imgSrc,
  category,
  date,
  title,
  slug,
  desc,
  likesCount,
  imgAlt,
}: IProps) => {
  return (
    <Link
      prefetch
      href={`/post/${slug}?cat=${encodeURI(category)}`}
      className=" flex max-w-[500px] flex-col items-center  justify-center gap-y-2 rounded-lg bg-zinc-900 p-2 lp:max-w-[800px] lp:flex-row lp:gap-x-2 lcd:max-w-[1400px] hover:bg-zinc-800 transition-all duration-200"
    >
      <div className="flex w-fit rounded-xl  ">
        <div className="relative flex">
          {category && (
            <p className="absolute bottom-2 left-2 z-10 rounded-full border-[1px] border-white bg-black  px-2 py-1 text-xs">
              {category}
            </p>
          )}
          <Image
            priority
            src={
              imgSrc
                ? urlFor(imgSrc).width(600).height(400).url()
                : "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"
            }
            width={600}
            height={400}
            alt={imgAlt}
            className="h-full max-h-[400px] w-full max-w-[600px] rounded-xl "
          />
        </div>
      </div>

      <div className="flex h-full w-full flex-col justify-between gap-y-3">
        <div>
          <h3 className="text-xl font-semibold ">{title}</h3>
          <p className="">{desc}</p>
        </div>

        <div className="flex justify-between ">
          <div className="flex gap-x-4">
            <div className="flex items-center justify-center gap-x-2">
              <p className="text-pri_yellow">{likesCount ? likesCount : "0"}</p>
              <p className="text-pri_yellow">
                {likesCount > 1 ? "Stars" : "Star"}
              </p>
            </div>
          
          </div>
          <div className="flex flex-col items-center justify-center text-sm text-pri_yellow">
            <p>05:15 AM, SUN</p>
            <p>6 DEC 2023</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCover;
