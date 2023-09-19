"use client"
import { selectUserData, selectUserID } from "@/store/session/sessionReducer";
import { useAppSelector } from "@/store/store";
import AddCommentForm from "@/views/FORMS/AddCommentForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AddCommentComp = ({ blogId}:{blogId:string}) => {

    const userId = useAppSelector(selectUserID);
    const userData = useAppSelector(selectUserData);

  return <>
  {userId ? (
    <div className="flex h-full w-full  gap-x-2">
      <Image
        src={userData ? userData.userImgUrl : ""}
        alt=""
        width={100}
        height={100}
        className="h-[70px] w-[70px] max-h-[70px] max-w-[70px] object-cover rounded-full"
      />
      <div>
        <p className="text-blue-500">{userData.userName}</p>
        <AddCommentForm blogId={blogId} />
      </div>
    </div>
  ) : (
    <div className="flex h-full w-full flex-col gap-y-4">
      <p>Join the conversation</p>
      <p className=" px-4 py-2">
        You must be{" "}
        <Link href={"/account/signin/#signin"} className="text-blue-600 underline">
          logged in
        </Link>{" "}
        to post a comment.
      </p>
    </div>
  )}
  </>
};

export default AddCommentComp;
