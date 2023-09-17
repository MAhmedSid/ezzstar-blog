import BlogCard from "@/components/BlogCard";
import Wrapper from "@/components/Wrapper";
import React from "react";

const AnimeUpdates = (blogData:any) => {

  const data = blogData.blogsData;

  return (
    <section className="flex w-full  flex-col items-center justify-center gap-y-10  px-2 tablet:px-5 ">
      <Wrapper>
        <div className="flex w-full flex-col gap-y-3">
          <h2 className="text-center text-2xl font-bold tablet:text-left">
            ANIME UPDATES
          </h2>
          <div className=" grid grid-cols-1 place-items-center  gap-x-10 gap-y-10 tablet:grid-cols-3">
          {data && data.map((blog : any ,i : any)=>{
                  return(
                  
             (blog && <BlogCard key={blog?.slug.current} title={blog?.title} slug={blog?.slug.current} desc={blog?.meta_desc} likesCount={blog?.likesCount}  date={blog?.published_at} category={blog?.category} imgSrc={blog?.displayImg?.asset} imgAlt={blog.displayImg?.alt} />)
                  
                  )
              })}
          </div>
        </div>
      </Wrapper>
      <button className="rounded-full bg-pri_purple px-8 py-1 text-lg font-semibold">
        View More
      </button>
    </section>
  );
};

export default AnimeUpdates;
