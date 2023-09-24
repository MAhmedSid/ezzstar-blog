import BlogCover from "@/components/BlogCover";
import Wrapper from "@/components/Wrapper";
import React from "react";

const Blogs = async (blogData: any) => {
  const data = blogData.blogData;

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <Wrapper>
        <div className="flex w-full flex-col gap-y-4 px-4">
          <h2 className="text-center text-2xl font-bold tablet:text-left">
            BLOGS
          </h2>
          <div className="flex w-full flex-col justify-center gap-y-2 px-2 tablet:flex-row tablet:gap-x-5">
            <div className="hidden bg-slate-500 tablet:flex tablet:h-[600px] tablet:w-[200px]"></div>
            <div className="flex w-full flex-col items-center gap-y-3 tablet:items-start ">
              {data &&
                data.map((blog: any, i: any) => {
                  return (
                    blog && (
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
                    )
                  );
                })}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Blogs;
