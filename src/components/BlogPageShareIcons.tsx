"use client"
import { FacebookShareButton, TwitterShareButton } from "next-share";
import React from "react";

const BlogPageShareIcons = ({slug,cat,title}:{title:string,slug:string,cat:string}) => {
  return  <div className="flex flex-col gap-y-3">
  <p>Share this story</p>
  <div className="flex gap-x-5">

  <FacebookShareButton
   url={`https://ezzstar.com/post/${slug && slug}?cat=${cat && cat}`}
   quote={title}
   hashtag={'#EZZSTAR'}
   blankTarget
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 24 24"
    >
      <path
        fill="#1877f2"
        d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0 8.064 0 9.95 7.85 9.674 9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877c.188-2.824-.761-5.016 2.051-5.016z"
        data-original="#3b5999"
      ></path>
    </svg>
    </FacebookShareButton>


    <TwitterShareButton
  url={`https://ezzstar.com/post/${slug && slug}?cat=${cat && cat}`}
  title={title}
  hashtags={["EZZSTAR","BLOG","UPDATES","METAVERSE","SPICA","ANIME","GAMING","FUTURE"]}
  blankTarget
>
    <svg

      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512 512"
    >
      <path
        fill="#03a9f4"
        d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
        data-original="#03a9f4"
      ></path>
    </svg>
    </TwitterShareButton>
  </div>
</div>
};

export default BlogPageShareIcons;
