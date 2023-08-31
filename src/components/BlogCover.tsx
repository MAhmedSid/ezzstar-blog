import Image from "next/image";
import React from "react";
const BlogCover = () => {
  return <div className="flex flex-col lp:flex-row items-center  max-w-[500px] lp:max-w-[800px] lcd:max-w-[1000px] justify-center bg-zinc-900 rounded-lg p-2 gap-y-2 lp:gap-x-2">

   
    <div className="w-full lp:w-[1500px] flex justify-center rounded-xl ">
      <div className="w-full flex items-center justify-center relative">
          <p className="absolute text-xs bg-black border-white border-[1px] py-1 px-2 rounded-full  bottom-2 left-2 z-10">GAMES</p>
          <video src={'/giflike.webm'} muted autoPlay loop className="h-full w-full rounded-xl object-fill"></video>
      </div>
    </div>


    <div className="flex flex-col gap-y-3" >
        <h3 className="text-xl font-semibold">Pushing the envelope: Achieving next-level clouds in Horizon Forbidden West: Burning Shores</h3>
        <p>he world of Horizon is vast and majestic, featuring lush landscapes crowned by seemingly endless skies. When the team at Guerrilla began creating this world, developers of various disciplines considered how to bring an immersive level of life to the world.</p>
        <div className="flex justify-between ">
          <div className="flex gap-x-2">
            <div className="flex justify-center items-center gap-x-2">
              <p className="text-pri_yellow">4.2k</p>
              {false ?<svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 fill-pri_yellow"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512.001 512"
    >
      <path
        d="M256 455.516a30.022 30.022 0 01-19.793-7.438c-20.684-18.086-40.625-35.082-58.219-50.074l-.09-.078c-51.582-43.957-96.125-81.918-127.117-119.313C16.137 236.81 0 197.172 0 153.871c0-42.07 14.426-80.883 40.617-109.293C67.121 15.832 103.488 0 143.031 0c29.555 0 56.621 9.344 80.446 27.77C235.5 37.07 246.398 48.453 256 61.73c9.605-13.277 20.5-24.66 32.527-33.96C312.352 9.344 339.418 0 368.973 0c39.539 0 75.91 15.832 102.414 44.578C497.578 72.988 512 111.801 512 153.871c0 43.3-16.133 82.938-50.777 124.738-30.993 37.399-75.532 75.356-127.106 119.309-17.625 15.016-37.597 32.039-58.328 50.168a30.046 30.046 0 01-19.789 7.43zM143.031 29.992c-31.066 0-59.605 12.399-80.367 34.914-21.07 22.856-32.676 54.45-32.676 88.965 0 36.418 13.535 68.988 43.883 105.606 29.332 35.394 72.961 72.574 123.477 115.625l.093.078c17.66 15.05 37.68 32.113 58.516 50.332 20.961-18.254 41.012-35.344 58.707-50.418 50.512-43.051 94.137-80.223 123.469-115.617 30.344-36.618 43.879-69.188 43.879-105.606 0-34.516-11.606-66.11-32.676-88.965-20.758-22.515-49.3-34.914-80.363-34.914-22.758 0-43.653 7.235-62.102 21.5-16.441 12.719-27.894 28.797-34.61 40.047-3.452 5.785-9.53 9.238-16.261 9.238s-12.809-3.453-16.262-9.238c-6.71-11.25-18.164-27.328-34.61-40.047-18.448-14.265-39.343-21.5-62.097-21.5zm0 0"
        data-original="#000000"
      ></path>
              </svg>:<svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 fill-pri_yellow"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512 512"
    >
      <path
        d="M471.383 44.578C444.879 15.832 408.512 0 368.973 0c-29.555 0-56.621 9.344-80.45 27.77C276.5 37.07 265.605 48.45 256 61.73c-9.602-13.277-20.5-24.66-32.527-33.96C199.648 9.344 172.582 0 143.027 0c-39.539 0-75.91 15.832-102.414 44.578C14.426 72.988 0 111.801 0 153.871c0 43.3 16.137 82.938 50.781 124.742 30.992 37.395 75.535 75.356 127.117 119.313 17.614 15.012 37.579 32.027 58.309 50.152A30.023 30.023 0 00256 455.516a30.03 30.03 0 0019.785-7.43c20.73-18.129 40.707-35.152 58.328-50.172 51.575-43.95 96.117-81.906 127.11-119.305C495.867 236.81 512 197.172 512 153.867c0-42.066-14.426-80.879-40.617-109.289zm0 0"
        data-original="#000000"
      ></path>
              </svg>}
            </div>
            <div className="flex justify-center items-center gap-x-2">
              <p className="text-pri_yellow">2k</p>
              <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 26 28"
    >
      <path
        stroke="#F9B920"
        d="M.5.535h.01L.544.5H25.5v26.227l-5.634-6.067-.148-.16H.5V.535z"
      ></path>
    </svg>
              
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-pri_yellow text-sm">
          <p>05:15 AM, SUN</p>
          <p>6 DEC 2023</p>
          </div>
        </div>
    </div>
   
  </div>;
};

export default BlogCover;
