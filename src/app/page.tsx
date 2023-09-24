import { cdnClient } from "@/lib/sanityClient";
import AnimeUpdates from "@/views/HOME/AnimeUpdates";
import Blogs from "@/views/HOME/Blogs";
import GamesUpdates from "@/views/HOME/GamesUpdates";
import LatestUpdates from "@/views/HOME/LatestUpdates";
import { groq } from "next-sanity";

export default async function Home() {



  try {
    const res = await cdnClient.fetch(groq`{
      "latestBlogs": [
        *[_type == "blogs" && category == "Blog"] | order(published_at desc) [0] {
          title,
          slug,
          meta_desc,
          displayImg,
          published_at,
          category,
          "likesCount": length(likes)
        },
        *[_type == "blogs" && category == "Games"] | order(published_at desc) [0] {
          title,
          slug,
          meta_desc,
          displayImg,
          published_at,
          category,
          "likesCount": length(likes)
        },
        *[_type == "blogs" && category == "Anime"] | order(published_at desc) [0] {
          title,
          slug,
          meta_desc,
          displayImg,
          published_at,
          category,
          "likesCount": length(likes)
        }
      ],
      "gamingBlogs": *[_type == "blogs" && category == "Games"] | order(length(likes) desc) [0...6] {
        title,
        slug,
        meta_desc,
        displayImg,
        published_at,
        category,
        "likesCount": length(likes)
      },
      "blogs": *[_type == "blogs" && category == "Blog"] | order(length(likes) desc) [0...3] {
        title,
        slug,
        meta_desc,
        displayImg,
        published_at,
        category,
        "likesCount": length(likes)
      },
      "animeBlogs": *[_type == "blogs" && category == "Anime"] | order(length(likes) desc) [0...6] {
        title,
        slug,
        meta_desc,
        displayImg,
        published_at,
        category,
        "likesCount": length(likes)
      }
    }
    `);    

    return (
      <main className="flex w-full flex-col gap-y-20 pt-20 ">

        <LatestUpdates blogData={res.latestBlogs} />
        <div className="h-[150px] w-full   bg-slate-500"></div>
        <GamesUpdates blogsData={res.gamingBlogs} />
        <div className="h-[150px] w-full   bg-slate-500"></div>
        <AnimeUpdates blogsData={res.animeBlogs} />
        <div className="h-[150px] w-full   bg-slate-500"></div>
        <Blogs blogData={res.blogs} />

        <div className="my-10 h-[30px] w-[60%] bg-gradient-to-r from-pri_yellow from-80% to-black " />
        
      </main>
    );
  } catch (error) {
    console.log((error as { message: string }).message);
  }
}
