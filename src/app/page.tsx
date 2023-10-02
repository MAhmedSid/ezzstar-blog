import AnimeUpdates from "@/views/HOME/AnimeUpdates";
import Blogs from "@/views/HOME/Blogs";
import GamesUpdates from "@/views/HOME/GamesUpdates";
import LatestUpdates from "@/views/HOME/LatestUpdates";
import adlandscape from "/public/images/adlandscape.png"
import Image from "next/image";

// export const revalidate = 3600 ;

export default async function Home() {



  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getHomeData`,
      {
        // next:{revalidate: 3600},
        cache:"no-store",
        method: "GET",
      },
    );
      
    if (!response.ok) {
      throw Error(
        "Internal Server Error, Something Went Wrong, please Try Again Later",
      );
    }
  
    const data = await response.json();
    const res = data.data;
    

    return (
      <main className="flex w-full flex-col gap-y-20 pt-20 ">

        <LatestUpdates blogData={res.latestBlogs} />
        <div className="h-[150px] w-full   bg-slate-500"><Image src={adlandscape} alt="ad" className="w-full h-full object-cover"/></div>
        <GamesUpdates blogsData={res.gamingBlogs} />
        <div className="h-[150px] w-full   bg-slate-500"><Image src={adlandscape} alt="ad" className="w-full h-full object-cover"/></div>
        <AnimeUpdates blogsData={res.animeBlogs} />
        <div className="h-[150px] w-full   bg-slate-500"><Image src={adlandscape} alt="ad" className="w-full h-full object-cover"/></div>
        <Blogs blogData={res.blogs} />

        <div className="my-10 h-[30px] w-[60%] bg-gradient-to-r from-pri_yellow from-80% to-black " />
        
      </main>
    );
  } catch (error) {
    console.log((error as { message: string }).message);
  }
}
