"use client"
import Loading from "@/components/Loading";
import useSaveSession from "@/hooks/useSaveSession";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddCommentForm = ({blogId}:{blogId:string}) => {

  const router = useRouter()
  const userId = useSaveSession();

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
                setIsMutating(false)
                if(res.ok){
                    toast.success("Comment Added Suxxessfully.")
                    router.refresh()
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
    {isMutating ? <Loading size="h-8 w-8" color="border-pri_yellow" /> : <SendHorizonal className="text-pri_yellow" />}
  </button>
</form>;
};

export default AddCommentForm;
