import BlogCard from "@/components/BlogCard";
import Date from "@/components/Date";
import LikeIcon from "@/components/LikeIcon";
import { cdnClient } from "@/lib/sanityClient";
import CommentSec from "@/views/CommentSection/CommentSec";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { groq } from "next-sanity";
import Image from "next/image";
import React from "react";
import BlogPageShareIcons from "@/components/BlogPageShareIcons";

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
  pageContent[]{
    ...,
    image {
      alt,
      "url": asset->url
    }
  },
  "likesCount": length(likes),
},
    "commentNumber": count(*[_type == "comments" && blogSlug == '${slug}'])
    ,
    "morePost": *[_type == "blogs" ${
      cat !== "" && cat !== "undefined" ? `&& category == '${cat}'` : ""
    } ]  | order(published_at desc)  [0...3]{
      title,
      category,
      published_at,
      slug,
      displayImg,
      "likesCount": length(likes),
    }
  }`);

  const blogData = res && res.blogData;
  const contentArr = blogData && blogData.pageContent;
  const commentNumber = res && res.commentNumber;
  const morePosts = res && res.morePost;

  const components: PortableTextComponents = {
    list: {
      bullet: ({ children }) => (
        <ul className="flex flex-col gap-y-4 py-10 my-2 list-disc px-3 ">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="flex flex-col ml-5 gap-y-4 mt-lg list-decimal py-10">{children}</ol>
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
        <h1 className="my-5 text-2xl tablet:text-3xl lp:text-4xl font-bold">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="my-5 text-xl  tablet:text-2xl lp:text-3xl  font-bold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="my-5 text-lg  tablet:text-xl lp:text-2xl font-bold">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="my-5  tablet:text-lg lp:text-xl font-bold">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="my-5 lp:text-lg  font-bold">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="my-5   font-bold">{children}</h6>
      ),
      p: ({ children }) => (
        <p className="my-5   ">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-purple-500">{children}</blockquote>
      ),

     
    },
  };

  return (
    <>
      <main className="flex w-full flex-col items-center justify-center gap-y-10 mt-14">
        <div className="flex w-full max-w-[1300px] flex-col gap-y-4  ">
          <div className="flex h-full w-full flex-col justify-center gap-y-2 px-5  tablet:flex-row tablet:gap-x-10">
            <section className="w-full">
              <div className="flex h-full w-full flex-col  gap-y-3">


                <div className="flex flex-col mt-20">

                  <div className="w-full flex flex-col gap-y-7 ">
                  <h1 className="text-2xl font-semibold tablet:text-3xl lp:text-4xl ">
                    {blogData && blogData.title}
                  </h1>
                  <div className="flex justify-between ">
                    <div className="flex gap-x-4">
                      <div className="flex items-center justify-center gap-x-2">
                        <p className="text-pri_yellow">
                          {blogData && blogData.likesCount === 0 ||
                          blogData && blogData.likesCount === null
                            ? "0"
                            : blogData.likesCount}
                        </p>
                        <p className="text-pri_yellow">
                          {blogData && blogData.likesCount > 1 ? "Stars" : "Star"}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-x-2">
                        <p className="text-pri_yellow">{commentNumber && commentNumber}</p>
                 
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


                  <section className="w-full flex flex-col mt-14">
                    
                    {contentArr.length > 0 && contentArr.map((sect:any,i:number)=>{
                      return(

                        <div key={sect._key} className="flex w-full flex-col">
                          {sect.body.length !== 0 &&
                            <PortableText
                              value={sect.body}
                              components={components}
                              />
                            }
                        {sect.image && (
                          <div className="w-full flex justify-center ">

                          <Image
                            src={sect.image.url}
                            width={1000}
                            height={600}
                            alt={sect.image.alt}
                            className="w-fit "
                            />
                            </div>
                        )}
                      </div>
                      
                      )
                    })}

                  </section> 



                </div>


                <div className="flex flex-col gap-x-14 gap-y-5 tablet:flex-row  mt-20 ">
                  <div className="flex flex-col items-center gap-y-3">
                    <p>Did you like this?</p>
                    <LikeIcon
                      blogId={blogData && blogData?._id}
                      slug={blogData && blogData?.slug.current}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-y-3">
                  <BlogPageShareIcons title={blogData && blogData?.title} slug={blogData && blogData?.slug?.current} cat={blogData && blogData?.category} />
                  </div>
                </div>

                <section className="flex flex-col items-center gap-y-5 mt-20">
                  <h3 className="w-full text-2xl underline ">Read More</h3>
                  <div className="grid w-full max-w-[250px] grid-cols-1  place-items-center gap-x-10 gap-y-10  lmb:max-w-[300px] tablet:max-w-full tablet:grid-cols-2 lp:grid-cols-3">
                    {morePosts.length > 0 && morePosts.map((blog: any, i: any) => {
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

                {/* <div className="w-full mt-28">
                <CommentSec blogSlug={slug} blogId={blogData && blogData._id} />
                </div> */}



              </div>
            </section>

            <div className="sticky top-20 hidden h-[100px] w-full bg-slate-500 tablet:flex tablet:h-[600px] tablet:w-[200px]"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
