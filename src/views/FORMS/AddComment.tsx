"use client"
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddComment = ({blogId,userId}:{blogId:string,userId:string}) => {

    const [commentText, setCommentText] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    
    const handleAddComment = async (e:any)=>{
        e.preventDefault();
        try {
            setIsMutating(true);
            const res = await fetch("/api/addComment",{
                method: "POST",
                body: JSON.stringify({blogId, commentText, userId }),
                headers:{'Content-Type': 'application/json'}
              });
                const data = await res.json()
                console.log("Add Comment Response",data);
                setIsMutating(false)
                if(data.ok){
                    toast.success("Comment Added Suxxessfully.")
                }
            
        } catch (error) {
            console.log((error as {message:string}).message);
            setIsMutating(false);
            toast.error("Adding comment Failed, Try Again.")
        }

    }




  return <form onSubmit={handleAddComment} className="flex flex-col">
  <textarea
    placeholder="Write a Comment..."
    name="comment"
    id="comment"
    cols={50}
    rows={10}
    className="bg-zinc-800"
    required
    minLength={5}
    value={commentText}
    onChange={(e)=>setCommentText(e.target.value)}
  />
  <button disabled={isMutating} className="w-fit">
    {isMutating ?   <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto", background: "#fff" }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="#f2b41f"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth="2"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>: <SendHorizonal className="text-pri_yellow" />}
  </button>
</form>;
};

export default AddComment;
