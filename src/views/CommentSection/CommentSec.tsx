import Image from "next/image";
import React from "react";
import Comment from "./Comment";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import AddCommentComp from "@/components/AddCommentComp";

const CommentSec = async ({blogId,blogSlug}:{blogSlug:string,blogId:string}) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getComments`,{
      method: "PUT",
      body: JSON.stringify({ blogId }),
      headers: { "Content-Type": "application/json" },
      next:{tags:["getComments"]}
    });
    const body = await res.json();
    const comments = body.data;

   
  return (
    <section className="flex h-full w-full flex-col">
      
      <AddCommentComp blogSlug={blogSlug} blogId={blogId} />
      <section className="flex flex-col">
        <p>{comments && comments.length} {comments.length > 1 ? "Comments": "Comment"}</p>
        <div className="h-full w-full flex flex-col gap-y-8">
          {comments.map && comments.map((comment:any,i:number)=>(
            <Comment key={comment._id} comments={comments} commentUserId={comment.userId} replies={comment?.replies} commentId={comment._id} text={comment.commentText} createdAt={comment._createdAt} blogId={blogId}  />
          ))}
        </div>
      </section>
    </section>
  );
};

export default CommentSec;
