"use client";
import Image from "next/image";
import React, {useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { selectUserID } from "@/store/session/sessionReducer";
import Moment from "react-moment";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";

const Reply = ({
  replyKey,
  text,
  replyUserId,
  commentId,
  createdAt,
  blogId
}: {
  createdAt: string;
  commentId: string;
  replyKey: string;
  text: string;
  replyUserId: string;
  blogId:string
}) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const userId = useAppSelector(selectUserID);
  const [states, setStates] = useState({
    isDeleting: false,
  });

  const { isLoading, error, data, isFetching,isSuccess } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const { data, error } = await supabase
      .from("profiles")
      .select("username,avatar_url")
      .eq("id", replyUserId);

      const res = data && data[0] ? data[0] : {username:"",avatar_url:"https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"};
      return res
    },
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10,
  })



  const handleDeleteReply = async (e: any) => {
    e.preventDefault();

    try {
      setStates({ ...states, isDeleting: true });
      const res = await fetch("/api/reply", {
        method: "PUT",
        body: JSON.stringify({
          isDelete: true,
          reply_key: replyKey,
          userId: "",
          text: "",
          commentId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok === true) {
        toast.success("Reply Deleted");
        await fetch(`/api/revalidateTag?tag=getComments${blogId}`);
        router.refresh();
      }
      setStates({ ...states, isDeleting: false });
    } catch (error) {
      console.log((error as { message: string }).message);
      setStates({ ...states, isDeleting: false });
    }
  };

  return (
    <div className="h-full w-full p-4 ">
      <div className="flex h-full w-full  gap-x-2">
        <Image
          src={
             !data || data.avatar_url === ""
              ? "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"
              : data.avatar_url
          }
          width={70}
          height={70}
          alt={data ? data.username : "Ezzstar member image"}
          className="h-[40px] tablet:h-[50px] tablet:w-[50px] lp:h-[70px] lp:w-[70px] max-h-[70px] w-[40px] max-w-[70px] rounded-full object-cover"
        />
        <div className="w-full flex flex-col">
          <p className="text-blue-500 lp:text-lg">{data && data.username}</p>
          <div className="flex gap-x-4">
            {createdAt && (
              <p className="text-xs tablet:text-sm text-zinc-600">
                <Moment format="MMM D, YYYY [at] h:mm A" date={createdAt} />
              </p>
            )}

            {userId === replyUserId && (
              <button onClick={handleDeleteReply} className="text-red-600">
                {states.isDeleting ? (
                  <Loading size="h-5 w-5" color="border-red-600" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
          <p className="text-sm pt-4">{text}</p>
        </div>
      </div>
          <Separator className="mt-5" />
    </div>
  );
};

export default Reply;
