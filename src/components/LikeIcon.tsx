"use client";
import { client } from "@/lib/sanityClient";
import { addSession, selectUserID } from "@/store/session/sessionReducer";
import { useAppDispatch } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const LikeIcon = ({
  blogId,
  slug
}: {
  blogId:string,
  slug:string,
}) => {

  
  const supabase= createClientComponentClient();

  const dispatch = useAppDispatch();
  const userId = useSelector(selectUserID);

  const [isLiked, setIsLiked] = useState(false);
  

  useEffect(()=>{

    const getLikeStatus = async()=>{
      try {

        const {data} = await supabase.auth.getSession();
        const userID = data.session?.user.id;
        if (data.session) {
          dispatch(addSession(data.session.user.id));
        }

        if(!userID){
            return;
        }
        const res = await client.fetch(groq`*[_type == "blogs" && slug.current == '${slug}'][0]{
          "likeStatus": '${userID}' in likes[].userId ,
        }`)
        setIsLiked(res?.likeStatus);


      } catch (error) {
        console.log((error as {message:string}).message);
      }
    }
    getLikeStatus();
  },[])





  const handleLike = async () => {
    try {
      if (userId === "") {
        toast.error("Sign In to give Star");
        return;
      }
      setIsLiked(!isLiked)
    const res = await fetch("/api/like", {
        method: "PUT",
        body: JSON.stringify({blogId, like: isLiked, userId }),
        headers:{'Content-Type': 'application/json'}
      });
      
        const data = await res.json();
        setIsLiked(data.likeStatus)
        
      
    } catch (error) {
      console.log("ERROR",(error as { message: string }).message);
    }
  };

  return (
    <>
      {isLiked ? (
       
        <button onClick={handleLike} className="">
        <svg
      xmlns="http://www.w3.org/2000/svg"
    className="h-14 w-14 active:animate-ping active:animate-once animate-duration-[550ms] "
      enableBackground="new 0 0 512 512"
      viewBox="0 0 511.987 511"
    >
      <path
        fill="#ffc107"
        d="M510.652 185.902a27.158 27.158 0 00-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418a27.208 27.208 0 00-23.402 18.71c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0010.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 007.98-28.927zm0 0"
        data-original="#ffc107"
      ></path>
    </svg>
        </button>
      ) : (
         <button onClick={handleLike} className="flex w-full justify-center">
           <svg
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-14 h-14 fill-pri_yellow active:animate-ping active:animate-once animate-duration-[550ms]`}
      enableBackground="new 0 0 512 512"
      viewBox="0 0 511.987 511"
    >
      <path
        d="M114.594 491.14c-5.61 0-11.18-1.75-15.934-5.187a27.223 27.223 0 01-10.582-28.094l32.938-145.09L9.312 214.81a27.188 27.188 0 01-7.976-28.907 27.208 27.208 0 0123.402-18.71l147.797-13.419L230.97 17.027C235.277 6.98 245.089.492 255.992.492s20.715 6.488 25.024 16.512l58.433 136.77 147.774 13.417c10.882.98 20.054 8.344 23.425 18.711 3.372 10.368.254 21.739-7.957 28.907L390.988 312.75l32.938 145.086c2.414 10.668-1.727 21.7-10.578 28.098-8.832 6.398-20.61 6.89-29.91 1.3l-127.446-76.16-127.445 76.203c-4.309 2.559-9.11 3.864-13.953 3.864zm141.398-112.874c4.844 0 9.64 1.3 13.953 3.859l120.278 71.938-31.086-136.942a27.21 27.21 0 018.62-26.516l105.473-92.5-139.543-12.671a27.18 27.18 0 01-22.613-16.493L255.992 39.895 200.844 168.96c-3.883 9.195-12.524 15.512-22.547 16.43L38.734 198.062l105.47 92.5c7.554 6.614 10.858 16.77 8.62 26.54l-31.062 136.937 120.277-71.914c4.309-2.559 9.11-3.86 13.953-3.86zm-84.586-221.848s0 .023-.023.043zm169.13-.063l.023.043c0-.023 0-.023-.024-.043zm0 0"
        data-original="#000000"
      ></path>
    </svg>
       </button>
      )}
    </>
  );
};

export default LikeIcon;
