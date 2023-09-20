"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import Reply from "./Reply";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Router, SendHorizonal } from "lucide-react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/store";
import { selectUserData, selectUserID } from "@/store/session/sessionReducer";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";


const Comment = ({
  blogId,
  text,
  createdAt,
  commentId,
  replies,
  commentUserId,
  comments
}: {
  blogId:string,
  comments:any,
  commentUserId:string
  replies: any;
  commentId: string;
  text: string;
  createdAt: string;
}) => {


  const router =  useRouter();
  const supabase = createClientComponentClient();


  const commentID = commentId;
  const userId = useAppSelector(selectUserID);
  const sessionUserData = useAppSelector(selectUserData);

  // const [showReplies, setShowReplies] = useState(false);
  // const [showForm, setShowForm] = useState(false);
  // const [replyText, setReplyText] = useState("");
  const [states, setStates] = useState({showReplies:false,showForm:false,replyText:""});
  
  const [userData, setUserData] = useState({ imgUrl: "", username: "" });
  const [loading, setLoading] = useState({
    isDeleting: false,
    isAdding: false,
  });

  useEffect(() => {
    
    const getData = async () => {
    
        const { data, error } = await supabase
        .from("profiles")
        .select("username,avatar_url")
        .eq("id", commentUserId);
        
        if (error) {
          console.log("Error", error.message);
          return;
        }
        
        setUserData({
          ...userData,
          username: data[0]?.username,
          imgUrl: data[0]?.avatar_url,
        });
    };

    getData();

  }, []);

  const handleDelete = async (e: any) => {

    e.preventDefault();

    try {
      setLoading({ ...loading, isDeleting: true });
      const res = await fetch("/api/deleteComment", {
        method: "DELETE",
        body: JSON.stringify({ commentID }),
        headers: { "Content-Type": "application/json" },
      });
      const body = await res.json();
      if(res.ok === true){
        toast.success(body.message) 
        setLoading({ ...loading, isDeleting: false });
        await fetch(`/api/revalidateTag?tag=getComments`)
        router.refresh();
      }
    } catch (error) {
      console.log((error as { message: string }).message);
      setLoading({ ...loading, isDeleting: false });
    }
  };

  const handleAddReply = async (e: any) => {
    e.preventDefault();

    try {
      setLoading({ ...loading, isAdding: true });
      const res = await fetch("/api/reply", {
        method: "PUT",
        body: JSON.stringify({ userId, text: states.replyText,commentId,isDelete: false, reply_key:"" }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if(res.ok === true){
        toast.success(data.message)
        setStates({...states,replyText:"",showForm:!states.showForm});
        await fetch(`/api/revalidateTag?tag=getComments`);
        router.refresh();
      }      
      setLoading({ ...loading, isAdding: false });
    } catch (error) {
      console.log((error as { message: string }).message);
      setLoading({ ...loading, isAdding: false });
    }
  };

  return (<>
   <div className="h-full w-full ">
      <div className="flex h-full w-full  gap-x-2">
        <Image
          src={
            !userData.imgUrl || userData.imgUrl == ""
              ? "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"
              : userData.imgUrl
          }
          width={100}
          height={100}
          alt=""
          className="h-[70px] max-h-[70px] w-[70px] max-w-[70px] rounded-full object-cover "
        />
        <div className=" flex flex-col">
          <p className="text-blue-500">
            {userData.username !== "" ? userData.username : "Alien 404"}
          </p>
          <p>{createdAt && createdAt}</p>
          <p>{text && text}</p>

          <div className="flex gap-x-2">
            <button onClick={() => setStates({...states,showReplies:!states.showReplies})}>
              {replies && replies.length} {replies && replies.length > 1 ? "reactions" : "reaction"}
            </button>
            {userId ? (
              <button onClick={() => setStates({...states,showForm:!states.showForm})}>Chime In</button>
            ) : (
              <Link href={"/account/signin"} className="">
                Login to Reply
              </Link>
            )}
            {commentUserId == userId && (
              <button disabled={loading.isDeleting} onClick={handleDelete} className="text-red-600">
                {loading.isDeleting ?  <Loading size={"h-8 w-8"} color="border-red-600" />:"Delete"}
              </button>
            )}
          </div>

          <div>
            <Collapsible open={states.showForm}>
              <CollapsibleContent>
                <div className="flex h-full w-full  gap-x-2">
                  <Image
                    src={
                      sessionUserData ? sessionUserData.userImgUrl : ""
                    }
                    alt=""
                    width={70}
                    height={70}
                    className="h-[60px] max-h-[60px] w-[60px] max-w-[60px] rounded-full object-cover"
                  />
                  <div>
                    <p className="text-blue-500">{sessionUserData.userName}</p>

                    <form onSubmit={handleAddReply} className="flex flex-col">
                      <textarea
                        placeholder="Add your thoughts..."
                        name="reply"
                        id="reply"
                        cols={30}
                        rows={6}
                        className="bg-zinc-800 "
                        required
                        minLength={5}
                        value={states.replyText}
                        onChange={(e) => setStates({...states, replyText: e.target.value})}
                      />
                      <button disabled={loading.isAdding} className="w-fit">
                        {loading.isAdding ? (
                          <Loading size={"h-8 w-8"} color="border-pri_yellow" />
                        ) : (
                          <SendHorizonal className="text-pri_yellow" />
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible open={states.showReplies}>
              <CollapsibleContent>
                {replies.length > 0 ? replies.map((reply: any, i: number) => (
                  <Reply
                    key={reply._key}
                    replyKey={reply._key}
                    replyUserId={reply.userId}
                    text={reply.text}
                    createdAt={reply.createdAt}
                    commentId={commentId}
                  />
                )) : <p>No Reactions yet, Add your thoughts... </p> }
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Comment;
