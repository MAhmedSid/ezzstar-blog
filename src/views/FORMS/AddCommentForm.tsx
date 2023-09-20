"use client"
import Loading from "@/components/Loading";
import useSaveSession from "@/hooks/useSaveSession";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddCommentForm = ({blogId,blogSlug}:{blogSlug:string,blogId:string}) => {

  const router = useRouter()

  const userId = useSaveSession();

  
    const [states, setStates] = useState({isMutating:false,commentText:""});

    
    const handleAddComment = async (e:any)=>{
        e.preventDefault();
        try {
            setStates({...states,isMutating:true});
            const res = await fetch("/api/addComment",{
                method: "POST",
                body: JSON.stringify({blogSlug,blogId,  commentText: states.commentText, userId }),
                headers:{'Content-Type': 'application/json'}
              });
                const data = await res.json()
                setStates({...states,isMutating:false});
                if(res.ok){
                    toast.success("Comment Added Suxxessfully.")
                    setStates({...states,commentText:""})
                    await fetch(`/api/revalidateTag?tag=getComments`)
                    router.refresh();
                }
            
        } catch (error) {
            console.log((error as {message:string}).message);
            setStates({...states,isMutating:false});
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
    value={states.commentText}
    onChange={(e)=>setStates({...states,commentText:e.target.value})}
  />
  <button disabled={states.isMutating} className="w-fit">
    {states.isMutating ? <Loading size="h-8 w-8" color="border-pri_yellow" /> : <SendHorizonal className="text-pri_yellow" />}
  </button>
</form>;
};

export default AddCommentForm;
