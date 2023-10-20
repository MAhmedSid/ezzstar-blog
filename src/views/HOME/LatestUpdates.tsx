import BlogCover from "@/components/BlogCover";
import Wrapper from "@/components/Wrapper";
import React from "react";
import Ad160x600 from "@/components/ADS/Ad160x600";

function LatestUpdates({ blogData }: { blogData: any }) {
  const data = blogData;

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <Wrapper>
        <div className="flex w-full flex-col gap-y-4  px-4">
          <h2 className="text-center text-2xl font-bold tablet:text-left">
            LATEST UPDATES
          </h2>
          <div className="flex w-full flex-col justify-center gap-y-2 px-2 tablet:flex-row tablet:gap-x-5">
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
                        category={blog?.category}
                        showCat={true}
                        imgSrc={blog?.displayImg?.asset}
                        imgAlt={blog.displayImg?.alt}
                      />
                    )
                  );
                })}
            </div>

            <div className="hidden  tablet:flex tablet:h-[600px] tablet:w-[160px]">
              <Ad160x600 />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}

export default LatestUpdates;
