"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { selectUserID } from "@/store/session/sessionReducer";


const Reply = ({replyKey,text,replyUserId,commentId,createdAt}:{createdAt:string,commentId:string,replyKey:string,text:string,replyUserId:string}) => {

  const router = useRouter()
  const supabase = createClientComponentClient();
  const userId = useAppSelector(selectUserID);
  const [states, setStates] = useState({isDeleting:false,userData:{imgUrl:"",username:""}});
  

  useEffect(()=>{

    const getData = async()=>{
     
        const {data,error} = await supabase.from("profiles").select("username,avatar_url").eq("id", replyUserId);
        if(error){
          console.log("Error",error.message);
          return
        }
        setStates({...states, userData:{username:data[0]?.username, imgUrl: data[0]?.avatar_url } })
      }
    
    
    getData();

  },[])


  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_OUT')     setStates({...states, userData:{username:"", imgUrl: "" }})
  })



  const handleDeleteReply = async (e: any) => {
    e.preventDefault();

    try {
      setStates({...states,isDeleting:true})
      const res = await fetch("/api/reply", {
        method: "PUT",
        body: JSON.stringify({ isDelete: true, reply_key: replyKey,userId:"", text:"", commentId }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if(res.ok === true){
        toast.success(data.message)
        await fetch(`/api/revalidateTag?tag=getComments`);
        router.refresh();
      }      
      setStates({...states,isDeleting:false})
    } catch (error) {
      console.log((error as { message: string }).message);
      setStates({...states,isDeleting:false})
    }
  };
  

  return (
    <div className="h-full w-full ">
      <div className="flex h-full w-full  gap-x-2">
        <Image src={ !states.userData.imgUrl || states.userData.imgUrl == "" ? "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif" :  states.userData.imgUrl }  width={70}
            height={70} alt=""
            className="h-[60px] w-[60px] max-h-[60px] max-w-[60px] rounded-full object-cover" />
        <div className=" flex flex-col">
          <p className="text-blue-500">{states.userData.username}</p>
          <div className="flex gap-x-4">
          <p>{createdAt}</p>

        {userId === replyUserId &&  <button onClick={handleDeleteReply} className="text-red-600">
          {states.isDeleting ? <Loading size="h-8 w-8" color="border-red-600" /> :"Delete"}
          </button>}

          </div>
          <p>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
