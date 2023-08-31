import { supabase } from "@/lib/supabaseClient";
import AnimeUpdates from "@/views/HOME/AnimeUpdates";
import Blogs from "@/views/HOME/Blogs";
import GamesUpdates from "@/views/HOME/GamesUpdates";
import HeroComp from "@/views/HOME/HeroComp";
import LatestUpdates from "@/views/HOME/LatestUpdates";
import Navbar from "@/views/Navbar/Navbar";

export default async function Home() {

  const { data, error } = await supabase.auth.getSession();
  console.log("Session Data",data);

  return (
    <main className="flex w-full  flex-col gap-y-10 ">
      <p className="fixed text-2xl top-10 left-5 bg-black font-semibold p-2"></p>
      <LatestUpdates/>
      <GamesUpdates/>
      <AnimeUpdates/>
      <Blogs/>

      <div className="h-[30px] w-[60%] bg-gradient-to-r from-pri_yellow to-black from-80% my-10 " />

      


      
  

    </main>
  )
}
