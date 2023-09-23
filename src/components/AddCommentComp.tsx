"use client";
import { selectUserData, selectUserID } from "@/store/session/sessionReducer";
import { useAppSelector } from "@/store/store";
import AddCommentForm from "@/views/FORMS/AddCommentForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AddCommentComp = ({
  blogSlug,
  blogId,
}: {
  blogSlug: string;
  blogId: string;
}) => {
  const userId = useAppSelector(selectUserID);
  const userData = useAppSelector(selectUserData);

  return (
    <>
      {userId ? (
        <div className="flex h-full w-full flex-col lmb:flex-row gap-x-2  gap-y-2">
          <div className="flex items-center lmb:items-start gap-x-4">
            <Image
              src={userData ? userData.userImgUrl : ""}
              alt={userData ? userData.userName : "Ezzstar member image"}
              width={100}
              height={100}
              className="h-[40px] max-h-[70px] w-[40px] max-w-[70px] rounded-full object-cover tablet:h-[50px] tablet:w-[50px] lp:h-[70px] lp:w-[70px]"
            />
            <p className="text-blue-500 lmb:hidden">{userData.userName}</p>
          </div>
          <div className="w-full">
            <p className="hidden text-blue-500 lmb:flex lp:text-lg">
              {userData.userName}
            </p>
            <AddCommentForm blogSlug={blogSlug} blogId={blogId} />
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col gap-y-2 text-center tablet:text-lg">
          <p>Join the conversation</p>
          <p className="">
            You must be{" "}
            <Link
              href={"/account/signin/#signin"}
              className="text-blue-600 underline"
            >
              logged in
            </Link>{" "}
            to post a comment.
          </p>
        </div>
      )}
    </>
  );
};

export default AddCommentComp;
