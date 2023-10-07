import { urlFor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Date from "./Date";

const BlogCard = ({
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
      href={`/post/${slug && encodeURIComponent(slug)}#${slug && encodeURIComponent(slug)}?cat=${category ? encodeURIComponent(
        category
      ):encodeURIComponent(
        "")}`}
      className="flex h-[370px] max-w-[500px] flex-col rounded-xl bg-zinc-900  transition-all duration-200 hover:bg-zinc-800 lmb:h-[390px] tablet:h-[390px] lp:h-[390px] lp:max-w-[300px] "
    >
      <div className="w-full ">
        <div className="flex w-full items-center justify-center">
          <Image
            src={
              imgSrc
                ? urlFor(imgSrc).width(400).height(250).url()
                : "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"
            }
            width={400}
            height={250}
            alt={imgAlt}
            className="h-[150px]  w-full max-w-[600px] rounded-xl"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-y-5 px-3 py-3">
        <h3 className="text-lg lmb:text-xl  lp:text-2xl">{title}</h3>
        <div className="flex justify-between gap-x-5">
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center gap-x-2">
              <p className={` font-bold text-pri_yellow`}>
                {likesCount ? likesCount : "0"}
              </p>
              <p className={` font-bold text-pri_yellow`}>
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
          <Date date={date} />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
