import Ad728x90 from "@/components/ADS/Ad728x90";
import AdNativeBanner from "@/components/ADS/AdNativeBanner";
import AnimeUpdates from "@/views/HOME/AnimeUpdates";
import Blogs from "@/views/HOME/Blogs";
import GamesUpdates from "@/views/HOME/GamesUpdates";
import LatestUpdates from "@/views/HOME/LatestUpdates";

export default async function Home() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getHomeData`,
      {
        next: { revalidate: 3600 },
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
      <main className="flex  w-full flex-col  items-center justify-center gap-y-20 pt-20 ">
        <LatestUpdates blogData={res.latestBlogs} />
        <Ad728x90 showMob={true} />

        <GamesUpdates blogsData={res.gamingBlogs} />
        <AdNativeBanner />

        <AnimeUpdates blogsData={res.animeBlogs} />
        <Ad728x90 showMob={true} />

        <Blogs blogData={res.blogs} />
      </main>
    );
  } catch (error) {
    console.log((error as { message: string }).message);
  }
}
