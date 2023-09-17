import Image from "next/image";
import Link from "next/link";
import React from "react";
import Comment from "./Comment";
import AddComment from "../FORMS/AddComment";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

const CommentSec = async ({blogId}:{blogId:string}) => {

  const supabase = createServerComponentClient({cookies});
  const {data} = await supabase.auth.getSession();
  const userId = data.session ? data.session?.user.id : undefined ;
  let userDetails = {username:"Alien 404",imgUrl:""};

  if(userId){
    const {data,error} = await supabase.from('profiles').select("username,avatar_url")
    .eq("id", userId);
    if(error){
      return 
    }
    userDetails =  {username: data[0]?.username , imgUrl: data[0]?.avatar_url } ; 
  }
  const comments = await client.fetch(groq`*[_type == "comments" && blogId == '${blogId}']`)
  

  return (
    <section className="flex h-full w-full flex-col">
      {userId ? (
        <div className="flex h-full w-full  gap-x-2">
          <Image
            src={userDetails.imgUrl == "" ?  "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif" : userDetails.imgUrl
            }
            alt=""
            width={100}
            height={100}
            className="h-[70px] w-[70px] max-h-[70px] max-w-[70px] object-cover rounded-full"
          />
          <div>
            <p className="text-blue-500">{userDetails.username}</p>
            <AddComment blogId={blogId} userId={userId} />
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col gap-y-4">
          <p>Join the conversation</p>
          <p className=" px-4 py-2">
            You must be{" "}
            <Link href={"/account/signin"} className="text-blue-600 underline">
              logged in
            </Link>{" "}
            to post a comment.
          </p>
        </div>
      )}

      <section className="flex flex-col">
        <p>67 Comments</p>
        <div className="h-full w-full flex flex-col gap-y-8">
          {comments.map((comment:any,i:number)=>(
            <Comment key={comment._id} userId={comment.userId} sessionUserId={userId} text={comment.commentText} createdAt={comment._createdAt} userImg={userDetails.imgUrl} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default CommentSec;
