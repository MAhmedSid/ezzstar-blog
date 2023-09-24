import Image from "next/image";
import React from "react";
import Comment from "./Comment";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import AddCommentComp from "@/components/AddCommentComp";

const CommentSec = async ({blogId,blogSlug}:{blogSlug:string,blogId:string}) => {

    const res = await fetch(`https://www.ezzstar.com/api/getComments`,{
      method: "PUT",
      body: JSON.stringify({ blogId }),
      headers: { "Content-Type": "application/json" },
      // next:{tags:["getComments"]},
      cache:"no-store"
    });
    const body = res && await res.json();

    const comments = body &&  body.data;

   
  return (
    <section className="flex h-full w-full flex-col gap-y-5">
      
      {/* <AddCommentComp blogSlug={blogSlug} blogId={blogId} /> */}
      <section className="flex flex-col bg-zinc-950 p-4 gap-y-10 rounded-xl">
        <p>{comments && comments.length} {comments && comments.length > 1 ? "Comments": "Comment"}</p>
        {/* <div className="h-full w-full flex flex-col gap-y-8">
          {comments && comments.map((comment:any,i:number)=>(
            <Comment key={comment._id} comments={comments} commentUserId={comment.userId} replies={comment?.replies} commentId={comment._id} text={comment.commentText} createdAt={comment._createdAt} blogId={blogId}  />
          ))}
          {comments && comments.length === 0 && <p className="text-xl text-center">No Comments Yet!</p> }
        </div> */}
      </section>
    </section>
  );
};

export default CommentSec;
