import { urlFor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({imgSrc,category,date,title,slug,desc,likesCount,imgAlt}:IProps) => {


  return (
    <Link  href={`/post/${slug}?cat=${encodeURI(category)}`} className="flex max-w-[500px] flex-col justify-between gap-y-10 lp:max-w-[800px] lcd:max-w-[1000px]">
      <div className="w-full">
      <div className="flex w-full items-center justify-center">
      <Image
          src={imgSrc ? urlFor(imgSrc).width(400).height(250).url() : "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"}
          width={400}
          height={250}
          alt={imgAlt}
          className="h-full max-h-[400px] w-full max-w-[600px] rounded-xl "
          />
      </div>
      <h3>
        {title}
      </h3>
  </div>
      <div className="flex justify-between ">
        <div className="flex gap-x-2">
          <div className="flex items-center justify-center gap-x-2">
            <p className="text-pri_yellow">{likesCount ? likesCount : "0"}</p>
            <p className="text-pri_yellow">{likesCount > 1 ? "Stars" : "Star"}</p>

          </div>
          <div className="flex items-center justify-center gap-x-2">
            <p className="text-pri_yellow">2k</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 26 28"
            >
              <path
                stroke="#F9B920"
                d="M.5.535h.01L.544.5H25.5v26.227l-5.634-6.067-.148-.16H.5V.535z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-sm text-pri_yellow">
          <p>6 DEC 2023</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
