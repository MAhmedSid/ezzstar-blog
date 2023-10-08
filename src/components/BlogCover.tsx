import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/utils";
import Link from "next/link";
import Date from "./Date";


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
    <Link prefetch href={{ pathname: `${process.env.NEXT_PUBLIC_HOST}/post/${slug}`, query: { cat: category } }} as={`${process.env.NEXT_PUBLIC_HOST}/post/${slug}#${slug}`} 
    className=" flex h-fit  w-[250px] lmb:w-[300px] flex-col gap-y-2  rounded-lg  bg-zinc-900 transition-all duration-200   hover:bg-zinc-800 tablet:h-fit   tablet:w-full  tablet:flex-row lp:h-fit lp:max-w-[800px]  lcd:h-fit lcd:max-w-[1400px]"
    >

      <div className="flex h-full w-full tablet:w-[240px] lp:w-[280px] lcd:w-[320px] rounded-xl   ">
        <div className="relative flex h-full w-full">
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
            className="h-[180px] max-h-[400px] w-full  max-w-[400px] rounded-xl  object-cover tablet:h-full  tablet:max-w-[500px] "
          />
        </div>
      </div>

      <div className="flex h-fit w-full tablet:w-fit flex-col justify-between gap-y-4 px-2 pb-3 tablet:h-[240px]  tablet:flex-auto tablet:py-2 tablet:pb-2 ">
        <div className="flex  w-full flex-col gap-y-3">
          <h3 className="text-lg lmb:text-xl lp:text-2xl font-semibold ">{title && title}</h3>
          <p className="text-sm lp:text-base">{desc && desc}...</p>
        </div>

        <div className="flex  h-fit w-full justify-between ">
          <div className="flex gap-x-4">
            <div className="flex items-center justify-center gap-x-2">
              <p className={` text-pri_yellow font-bold`}>{likesCount ? likesCount : "0"}</p>
              <p className={` text-pri_yellow font-bold`}>
                {likesCount > 1 ? "Stars" : "Star"}
              </p>

              <svg
      xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 "
      enableBackground="new 0 0 512 512"
      viewBox="0 0 511.987 511"
    >
      <path
        fill="#ffc107"
        d="M510.652 185.902a27.158 27.158 0 00-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418a27.208 27.208 0 00-23.402 18.71c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0010.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 007.98-28.927zm0 0"
        data-original="#ffc107"
      ></path>
    </svg>
            </div>
          </div>

          <Date date={date && date } />
        </div>
      </div>
    </Link>
  );
};

export default BlogCover;
