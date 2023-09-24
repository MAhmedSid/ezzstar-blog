"use client";
import Loading from "@/components/Loading";
import { CommentButton } from "@/components/utils/Buttons";
import useSaveSession from "@/hooks/useSaveSession";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddCommentForm = ({
  blogId,
  blogSlug,
}: {
  blogSlug: string;
  blogId: string;
}) => {
  const router = useRouter();

  const userId = useSaveSession();

  const [states, setStates] = useState({ isMutating: false, commentText: "" });

  const handleAddComment = async (e: any) => {
    e.preventDefault();
    try {
      setStates({ ...states, isMutating: true });
      const res = await fetch("/api/addComment", {
        method: "POST",
        body: JSON.stringify({
          blogSlug,
          blogId,
          commentText: states.commentText,
          userId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setStates({ ...states, isMutating: false });
      if (res.ok) {
        toast.success("Comment added Successfully.");
        setStates({ ...states, commentText: "" });
        await fetch(`/api/revalidateTag?tag=getComments`);
        router.refresh();
      }
    } catch (error) {
      console.log((error as { message: string }).message);
      setStates({ ...states, isMutating: false });
      toast.error("Adding comment Failed, Try Again.");
    }
  };

  return (
    <form onSubmit={handleAddComment} className="flex flex-col gap-y-2">
      <textarea
        placeholder="Write a Comment..."
        name="comment"
        id="comment"
        className="max-h-[200px] min-h-[200px] w-full max-w-[600px] rounded-xl bg-zinc-800 p-3"
        required
        minLength={5}
        value={states.commentText}
        onChange={(e) => setStates({ ...states, commentText: e.target.value })}
      />

      <CommentButton type="submit" disabled={states.isMutating} text="">
        {states.isMutating ? (
          <Loading size="h-6 w-6" color="border-pri_yellow" />
        ) : (
          <SendHorizonal className="h-6 w-6" />
        )}
      </CommentButton>
    </form>
  );
};

export default AddCommentForm;
