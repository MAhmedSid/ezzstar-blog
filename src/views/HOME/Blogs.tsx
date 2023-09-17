import BlogCover from "@/components/BlogCover";
import Wrapper from "@/components/Wrapper";
import React from "react";

const Blogs = async (blogData:any) => {

  const data = blogData.blogData;

  return (
    <section className="flex flex-col w-full justify-center items-center">
    <Wrapper>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl font-bold text-center tablet:text-left">BLOGS</h2>
        <div className="w-full flex flex-col tablet:flex-row px-2 gap-y-2 tablet:gap-x-5 justify-center">
            <div className="h-[100px] w-full tablet:h-[600px] tablet:w-[200px] bg-slate-500"></div>
          <div className="flex flex-col gap-y-3 items-center tablet:items-start ">
            {data && data.map((blog : any ,i : any)=>{
                return(
                
           (blog && <BlogCover key={blog?.slug.current} title={blog?.title} slug={blog?.slug.current} desc={blog?.meta_desc} likesCount={blog?.likesCount}  date={blog?.published_at} category={blog?.category} imgSrc={blog?.displayImg?.asset} imgAlt={blog.displayImg?.alt} />)
                
                )
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  </section>
);
};

export default Blogs;
