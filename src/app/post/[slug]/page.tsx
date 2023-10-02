import BlogCard from "@/components/BlogCard";
import Date from "@/components/Date";
import LikeIcon from "@/components/LikeIcon";
import CommentSec from "@/views/CommentSection/CommentSec";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import React from "react";
import BlogPageShareIcons from "@/components/BlogPageShareIcons";
import { Metadata } from "next";
import adImg from "/public/images/ad.png"

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug);
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getHeadData`, {
    method: "PUT",
    body: JSON.stringify({ slug }),
    headers: { "Content-Type": "application/json" },
    next:{revalidate: 360}
  });

  if (!res.ok) {
    return {
      title: "Post - EZZSTAR",
      description: `trending updates of Metaverse, Gaming , Web3.0 from future by EZZSTAR`,
    };
  }
  const body = await res.json();
  return {
    title: body.data.title ? body.data.title + " - EZZSTAR" : "Post - EZZSTAR",
    description: body.data.meta_desc
      ? body.data.meta_desc
      : `trending updates of Metaverse, Gaming , Web3.0 from future by EZZSTAR`,
  };
}

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) => {

  const cat = decodeURIComponent(searchParams.cat && searchParams.cat);
  const slug = decodeURIComponent(params.slug);

  try {
    
 
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/getBlogData`,
    {
      cache:"no-cache",
      method: "PUT",
      body: JSON.stringify({
        slug,
        cat: cat ? cat : "",
      }),
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!response.ok) {
    throw Error(
      "Internal Server Error, Something Went Wrong, please Try Again Later",
    );
  }

  const data = await response.json();
  const res = data.data;

  const blogData = res && res.blogData;
  const contentArr = blogData && blogData.pageContent;
  const commentNumber = res && res.commentNumber;
  const morePosts = res && res.morePost;

  const components: PortableTextComponents = {
    list: {
      bullet: ({ children }) => (
        <ul className="my-2 flex list-disc flex-col gap-y-4 px-3 py-10 ">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mt-lg ml-5 flex list-decimal flex-col gap-y-4 py-10">
          {children}
        </ol>
      ),
    },
    marks: {
      em: ({ children }) => <em className="mt-4">{children}</em>,
      code: ({ children }) => (
        <code className="my-4 bg-[#121212] text-white ">{children}</code>
      ),

      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            className="text-pri_yellow hover:underline"
          >
            {children}
          </a>
        );
      },
    },
    block: {
      // Ex. 1: customizing common block types
      h1: ({ children }) => (
        <h1 className="my-5 text-2xl font-bold tablet:text-3xl lp:text-4xl">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="my-5 text-2xl  font-bold tablet:text-3xl  lp:text-4xl">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="my-5 text-xl  font-bold tablet:text-2xl lp:text-3xl">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="my-5  font-bold tablet:text-xl lp:text-2xl">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="my-5 font-bold  lp:text-lg">{children}</h5>
      ),
      h6: ({ children }) => <h6 className="my-5   font-bold">{children}</h6>,

      normal: ({ children }) => <p className="mt-5 ">{children}</p>,

      blockquote: ({ children }) => (
        <blockquote className="border-l-purple-500">{children}</blockquote>
      ),
    },
  };

  return (
    <>
      <main
        id={slug && slug}
        className="flex w-full flex-col items-center justify-center gap-y-10 pt-14"
      >
        <div className="flex w-full max-w-[1300px] flex-col gap-y-4  ">
          <div className="flex h-full w-full flex-col justify-center gap-y-2 px-5  tablet:flex-row tablet:gap-x-10">
            <section className="w-full">
              <div className="flex h-full w-full flex-col  gap-y-3">
                <div className="mt-20 flex flex-col">
                  <div className="flex w-full flex-col gap-y-7 ">
                    <h1 className="text-2xl font-semibold tablet:text-3xl lp:text-4xl ">
                      {blogData && blogData.title}
                    </h1>
                    <div className="flex justify-between ">
                      <div className="flex gap-x-4">
                        <div className="flex items-center justify-center gap-x-2">
                          <p className="text-pri_yellow">
                            {!blogData ||
                            (blogData && blogData.likesCount === 0) ||
                            (blogData && blogData.likesCount === null)
                              ? "0"
                              : blogData.likesCount}
                          </p>
                          <p className="text-pri_yellow">
                            {blogData && blogData.likesCount > 1
                              ? "Stars"
                              : "Star"}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-x-2">
                          <p className="text-pri_yellow">
                            {commentNumber && commentNumber}
                          </p>

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
                      <Date date={blogData && blogData.published_at} />
                    </div>
                  </div>

                  <section className="mt-14 flex w-full flex-col">
                    {contentArr &&
                      contentArr.length > 0 &&
                      contentArr.map((sect: any, i: number) => {
                        return (
                          <div
                            key={sect._key}
                            className="flex w-full flex-col "
                          >
                            {sect.body && sect.body.length !== 0 && (
                              <PortableText
                                value={sect.body}
                                components={components}
                              />
                            )}
                            {sect && sect.image && (
                              <div className="flex w-full justify-center ">
                                <Image
                                  src={sect.image.url}
                                  width={1000}
                                  height={600}
                                  alt={sect.image.alt}
                                  className="my-2 w-fit"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </section>
                </div>

                <div className="mt-20 flex flex-col gap-x-14 gap-y-5  tablet:flex-row ">
                  <div className="flex flex-col items-center gap-y-3">
                    <p>Did you like this?</p>
                    <LikeIcon
                      blogId={blogData && blogData?._id}
                      slug={blogData && blogData?.slug}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-y-3">
                    <BlogPageShareIcons
                      title={blogData && blogData?.title}
                      slug={blogData && blogData?.slug?.current}
                      cat={blogData && blogData?.category}
                    />
                  </div>
                </div>

                <section className="mt-20 flex flex-col items-center gap-y-5">
                  <h3 className="w-full text-2xl underline ">Read More</h3>
                  <div className="grid w-full max-w-[250px] grid-cols-1  place-items-center gap-x-10 gap-y-10  lmb:max-w-[300px] tablet:max-w-full tablet:grid-cols-2 lp:grid-cols-3">
                    {morePosts.length > 0 &&
                      morePosts.map((blog: any, i: any) => {
                        return (
                          <BlogCard
                            key={blog?.slug}
                            title={blog?.title}
                            slug={blog?.slug}
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

                <div className="mt-28 w-full">
                  <CommentSec
                    blogSlug={slug}
                    blogId={blogData && blogData._id}
                  />
                </div>
              </div>
            </section>

            <div className="sticky top-20 hidden h-[100px] w-full bg-slate-500 tablet:flex tablet:h-[600px] tablet:w-[200px]"><Image src={adImg} alt="ad"  className="h-full w-full"/></div>
          </div>
        </div>
      </main>
    </>
  );
} catch (error) {
    console.log((error as {message:string}).message);
}
};

export default page;
