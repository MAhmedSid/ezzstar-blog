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
import Moment from "react-moment";
import { CommentButton } from "@/components/utils/Buttons";
import { Separator } from "@/components/ui/separator";

const Comment = ({
  blogId,
  text,
  createdAt,
  commentId,
  replies,
  commentUserId,
  comments,
}: {
  blogId: string;
  comments: any;
  commentUserId: string;
  replies: any;
  commentId: string;
  text: string;
  createdAt: string;
}) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const commentID = commentId;
  const userId = useAppSelector(selectUserID);
  const sessionUserData = useAppSelector(selectUserData);

  const [states, setStates] = useState({
    showReplies: false,
    showForm: false,
    replyText: "",
  });

  const [userData, setUserData] = useState({ imgUrl: "", username: "" });
  const [loading, setLoading] = useState({
    isDeleting: false,
    isAdding: false,
  });

  useEffect(() => {
    ;(async function(){
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
    })()
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
      if (res.ok === true) {
        toast.success("Comment Deleted");
        setLoading({ ...loading, isDeleting: false });
        await fetch(`/api/revalidateTag?tag=getComments${blogId}`);
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
        body: JSON.stringify({
          userId,
          text: states.replyText,
          commentId,
          isDelete: false,
          reply_key: "",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok === true) {
        toast.success("Your thoughts got saved.");
        setStates({ ...states, replyText: "", showForm: !states.showForm });
        await fetch(`/api/revalidateTag?tag=getComments${blogId}`);
        router.refresh();
      }
      setLoading({ ...loading, isAdding: false });
    } catch (error) {
      console.log((error as { message: string }).message);
      setLoading({ ...loading, isAdding: false });
    }
  };

  return (
    <>
      <div className="h-full w-full rounded-xl ">
        <div className="flex h-full w-full  gap-x-2">
          <Image
            src={
              !userData.imgUrl || userData.imgUrl == ""
                ? "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"
                : userData.imgUrl
            }
            width={100}
            height={100}
            alt={userData ? userData.username : "Ezzstar member image"}
            className="h-[40px] max-h-[70px] w-[40px] max-w-[70px] rounded-full object-cover tablet:h-[50px] tablet:w-[50px] lp:h-[70px] lp:w-[70px] "
          />
          <div className="flex w-full flex-col bg-black">
            <div className="w-full p-4">
              <p className="text-blue-500 lp:text-lg">
                {userData.username !== "" ? userData.username : "Alien 404"}
              </p>
              {createdAt && (
                <p className="text-sm text-zinc-600">
                  <Moment format="MMM D, YYYY [at] h:mm A" date={createdAt} />
                </p>
              )}
              <p className="py-4 text-sm tablet:text-base">{text && text}</p>

              <div className="flex w-full gap-x-6">
                <button
                  onClick={() =>
                    setStates({ ...states, showReplies: !states.showReplies })
                  }
                  className="flex gap-x-2"
                >
                  {replies && <p>{replies.length}</p>}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    enableBackground="new 0 0 512 512"
                    viewBox="0 0 510 510"
                  >
                    <g fill="#f2b41f">
                      <path
                        d="M480 124.394v-60H0v255h60v45h368.787L510 445.607V124.394zm-450 165v-195h420v30H60v165zm450 83.787l-38.787-38.787H90v-180h390z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M120 199.394h240.001v30H120zm0 60h330v30H120z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                </button>
                {userId ? (
                  <button
                    onClick={() =>
                      setStates({ ...states, showForm: !states.showForm })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      enableBackground="new 0 0 512 512"
                      viewBox="0 0 511.999 511.999"
                    >
                      <g
                        fill="none"
                        stroke="#f2b41f"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                      >
                        <path
                          d="M371.43 60l56.568 56.569m-270.236 55.43H75.999c-22.091 0-40 17.909-40 40v160c0 22.091 17.909 40 40 40s40 17.909 40 40v40l64.343-64.343a53.457 53.457 0 0137.8-15.657h217.857c22.091 0 40-17.909 40-40v-160c0-8.31-2.534-16.029-6.872-22.425"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M456.283 31.716c15.621 15.621 15.621 40.948 0 56.568L315.976 228.591 236 251.998l23.407-79.975L399.714 31.716c15.621-15.621 40.948-15.621 56.569 0zM115.999 251.999h40m-40 80h280"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </button>
                ) : (
                  <Link href={"/account/signin#signin"} className=" text-blue-600">
                    Login to Reply
                  </Link>
                )}
                {commentUserId == userId && (
                  <button
                    disabled={loading.isDeleting}
                    onClick={handleDelete}
                    className="text-red-600"
                  >
                    {loading.isDeleting ? (
                      <Loading size={"h-6 w-6"} color="border-red-600" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        enableBackground="new 0 0 512 512"
                        viewBox="0 0 24 24"
                      >
                        <g fill="#bf0909" fillRule="evenodd" clipRule="evenodd">
                          <path
                            d="M10.17 1.25h-.046c-.217 0-.405 0-.583.028A2.25 2.25 0 007.9 2.461c-.083.16-.143.339-.211.544l-.015.044-.097.29a1.25 1.25 0 01-1.263.91h-3a.75.75 0 100 1.501h17.001a.75.75 0 100-1.5h-3.09a1.25 1.25 0 01-1.173-.91l-.097-.291-.015-.044a3.748 3.748 0 00-.211-.544 2.25 2.25 0 00-1.64-1.183 3.733 3.733 0 00-.584-.028h-.046zM8.959 3.935a2.96 2.96 0 01-.136.315h5.983a2.746 2.746 0 01-.136-.314l-.039-.114-.1-.3a3.123 3.123 0 00-.132-.368.75.75 0 00-.547-.395 3.116 3.116 0 00-.393-.009h-3.29c-.288 0-.347.002-.392.01a.75.75 0 00-.547.394c-.02.04-.041.095-.133.369l-.1.3c-.014.044-.026.08-.038.112z"
                            data-original="#999999"
                          ></path>
                          <path
                            d="M5.117 7.752a.75.75 0 01.798.698l.46 6.9c.09 1.347.154 2.285.294 2.99.137.685.327 1.047.6 1.303.274.256.648.422 1.34.512.713.093 1.653.095 3.004.095h.774c1.35 0 2.29-.002 3.004-.095.692-.09 1.066-.256 1.34-.512.273-.256.463-.618.6-1.303.14-.705.204-1.643.294-2.99l.46-6.9a.75.75 0 111.497.1l-.464 6.952c-.085 1.282-.154 2.318-.316 3.132-.169.845-.455 1.551-1.047 2.104-.591.554-1.315.793-2.17.904-.822.108-1.86.108-3.146.108h-.879c-1.285 0-2.324 0-3.146-.107-.854-.112-1.578-.351-2.17-.905-.591-.553-.877-1.26-1.046-2.104-.162-.814-.23-1.85-.316-3.132L4.418 8.55a.75.75 0 01.699-.798z"
                            data-original="#222222"
                          ></path>
                        </g>
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="">
              <Collapsible open={states.showForm}>
                <CollapsibleContent>
                  
                    <div className="flex flex-col h-full w-full  gap-x-2 bg-zinc-900 p-4">
                    <div className="flex h-full w-full  gap-x-2  ">
                      <Image
                        src={sessionUserData ? sessionUserData.userImgUrl : ""}
                        alt={userData ? userData.username : "Ezzstar member image"}
                        width={70}
                        height={70}
                        className="h-[40px] max-h-[70px] w-[40px] max-w-[70px] rounded-full object-cover tablet:h-[50px] tablet:w-[50px] lp:h-[70px] lp:w-[70px]"
                      />
                      <div className="w-full">
                        <p className="text-blue-500 lp:text-lg">
                          {sessionUserData.userName}
                        </p>

                        <form
                          onSubmit={handleAddReply}
                          className="flex w-full flex-col gap-y-3"
                        >
                          <textarea
                            placeholder="Chime in..."
                            name="reply"
                            id="reply"
                            cols={30}
                            rows={6}
                            className="max-h-[100px] min-h-[100px] w-full max-w-[600px] rounded-xl  bg-zinc-800 p-3 text-sm tablet:max-h-[200px] tablet:text-base"
                            required
                            minLength={5}
                            value={states.replyText}
                            onChange={(e) =>
                              setStates({
                                ...states,
                                replyText: e.target.value,
                              })
                            }
                          />
                          <CommentButton
                            type="submit"
                            disabled={loading.isAdding}
                            text=""
                          >
                            {loading.isAdding ? (
                              <Loading
                                size="h-6 w-6"
                                color="border-pri_yellow"
                              />
                            ) : (
                              <SendHorizonal className="h-6 w-6" />
                            )}
                          </CommentButton>
                        </form>
                      </div>
                      </div>
                      <Separator className="mt-5" />
                    </div>
               
                </CollapsibleContent>
              </Collapsible>
              <Collapsible open={states.showReplies}>
                <CollapsibleContent className="flex flex-col bg-zinc-900  tablet:gap-y-5">
                  {replies.length > 0 ? (
                    replies.map((reply: any, i: number) => (
                      <Reply
                        key={reply._key}
                        replyKey={reply._key}
                        replyUserId={reply.userId}
                        text={reply.text}
                        createdAt={reply.createdAt}
                        commentId={commentId}
                        blogId={blogId}
                      />
                    ))
                  ) : (
                    <p className="p-4">No thoughts yet, chime in... </p>
                  )}
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
