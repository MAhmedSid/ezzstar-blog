"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import Reply from "./Reply";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const Comment = ({sessionUserId,userId,text,createdAt,userImg}:{userImg:string,sessionUserId:string|undefined,userId:string,text:string,createdAt:string}) => {


  const supabase = createClientComponentClient();

  const [showReplies, setShowReplies] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({imgUrl: "",username:""});
  


  useEffect(()=>{

    const getData = async()=>{
      
      const {data,error} = await supabase.from("profiles").select("username,avatar_url").eq("id", "289b54be-1441-4268-ab4e-7442574f61ec");
      if(error){
        console.log("Error",error.message);
        return
      }
      setUserData({...userData,username:data[0]?.username, imgUrl: data[0]?.avatar_url})
    }
    
    getData();

  },[])


  return (
    <div className="h-full w-full ">
      <div className="flex h-full w-full  gap-x-2">
        <Image src={ !userData.imgUrl || userData.imgUrl == "" ? "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif" : userData.imgUrl } width={100} height={100} alt="" className="h-[70px] w-[70px] max-h-[70px] max-w-[70px] object-cover rounded-full " />
        <div className=" flex flex-col">
          <p className="text-blue-500">{userData.username !== "" ? userData.username : "Alien 404"}</p>
          <p>{createdAt}</p>
          <p>{text}</p>

          <div className="flex gap-x-2">
            <button onClick={()=>setShowReplies(!showReplies)}>2 replies</button>
            {sessionUserId ? (
              <button onClick={()=>setShowForm(!showForm)}>Reply</button>
            ) : (
              <Link href={"/account/signin"} className="">
                Login to Reply
              </Link>
            )}
          </div>

              <div>

            <Collapsible open={showForm}>
            <CollapsibleContent>
            <div className="flex h-full w-full  gap-x-2">
          <Image
            src={userImg == ""?
              "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif": userImg
            }
            alt=""
            width={70}
            height={70}
            className="h-[60px] max-h-[60px] w-[60px] max-w-[60px] rounded-full object-cover"
          />
          <div>
            <p className="text-blue-500">Username</p>
            <form className="flex flex-col">
              <textarea
                placeholder="Write a Reply..."
                name="comment"
                id="comment"
                cols={30}
                rows={6}
                className="bg-zinc-800"
              />
              <button>-{">"}</button>
            </form>
          </div>
        </div>
            </CollapsibleContent>
            </Collapsible>
            <Collapsible open={showReplies} >
            <CollapsibleContent>
           <Reply/>
           <Reply/>
           <Reply/>
            </CollapsibleContent>
            </Collapsible>
              </div>


        </div>
      </div>
    </div>
  );
};

export default Comment;
