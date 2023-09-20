import BlogCard from "@/components/BlogCard";
import GetSessionComp from "@/components/GetSessionComp";
import LikeIcon from "@/components/LikeIcon";
import { cdnClient } from "@/lib/sanityClient";
import CommentSec from "@/views/CommentSection/CommentSec";
import { groq } from "next-sanity";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) => {
  const cat = decodeURI(searchParams.cat);
  const slug = params.slug;

  const res = await cdnClient.fetch(groq`{
    "blogData": *[_type == "blogs" && slug.current == '${slug}'][0]{
      title,
      category,
      published_at,
      slug,
      _id,
      pageContent,
      "likesCount": length(likes),
    },
    "commentNumber": count(*[_type == "comments" && blogSlug == '${slug}'])
    ,
    "morePost": *[_type == "blogs" ${
      cat != "undefined" ? `&& category == '${cat}'` : ""
    } ]  | order(published_at desc)  [0...3]{
      title,
      category,
      published_at,
      slug,
      displayImg,
      "likesCount": length(likes),
    }
  }`);

  const blogData = res.blogData;
  const commentNumber = res.commentNumber;
  const morePosts = res.morePost;

  return (
    <>
      <GetSessionComp />
      <main className="flex w-full flex-col items-center justify-center gap-y-10">
        <div className="flex w-full max-w-[1300px] flex-col gap-y-4  ">
          <div className="flex h-full w-full flex-col justify-center gap-y-2 px-5  tablet:flex-row tablet:gap-x-10">
            <section className="w-full">
              <div className="flex h-full w-full flex-col  gap-y-3">
                <div>
                  <h1 className="text-3xl font-semibold lp:text-5xl  ">
                    {blogData.title}
                  </h1>
                </div>

                <div className="flex justify-between ">
                  <div className="flex gap-x-4">
                    <div className="flex items-center justify-center gap-x-2">
                      <p className="text-pri_yellow">
                        {blogData.likesCount === 0 ? "0" : blogData.likesCount}
                      </p>
                      <p className="text-pri_yellow">
                        {blogData.likesCount > 1 ? "Stars" : "Star"}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                      <p className="text-pri_yellow">{commentNumber}</p>
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
                    <p>05:15 AM, SUN</p>
                    <p>6 DEC 2023</p>
                  </div>
                </div>
                <div className="flex flex-col gap-x-14 gap-y-3 tablet:flex-row  ">
                  <div className="flex flex-col items-center gap-y-3">
                    <p>Did you like this?</p>
                    <LikeIcon
                      blogId={blogData?._id}
                      slug={blogData?.slug.current}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-y-3">
                    <div className="flex flex-col gap-y-3">
                      <p>Share this story</p>
                      <div className="flex gap-x-5">
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
                      </div>
                    </div>
                  </div>
                </div>

                <section className="flex flex-col gap-y-5">
                  <h3 className="text-2xl underline">Read More</h3>
                  <div className=" grid grid-cols-1 place-items-center  gap-x-10 gap-y-10 tablet:grid-cols-2 lp:grid-cols-3 ">
                    {morePosts.map((blog: any, i: any) => {
                      return (
                        <BlogCard
                          key={blog?.slug.current}
                          title={blog?.title}
                          slug={blog?.slug.current}
                          desc={blog?.meta_desc}
                          likesCount={blog?.likesCount}
                          date={blog?.published_at}
                          category={blog?.category}
                          imgSrc={blog?.displayImg?.asset}
                          imgAlt={blog.displayImg?.alt}
                        />
                      );
                    })}
                  </div>
                </section>

                <CommentSec blogSlug={slug} blogId={blogData._id} />
              </div>
            </section>

            <div className="sticky top-10 h-[100px] w-full bg-slate-500 tablet:h-[600px] tablet:w-[200px]"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
