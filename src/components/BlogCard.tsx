import { urlFor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Date from "./Date";

const BlogCard = ({
  imgSrc,
  category,
  date,
  title,
  slug,
  desc,
  likesCount,
  imgAlt,
}: IProps) => {
  return (
    <Link
      prefetch
      href={`/post/${slug && encodeURIComponent(slug)}?cat=${encodeURI(category)}`}
      className="flex max-w-[500px] h-[450px] lmb:h-[500px] lp:h-[530px] flex-col  rounded-xl bg-zinc-900 transition-all duration-200   hover:bg-zinc-800 lp:max-w-[300px] "
    >
      <div className="w-full ">
        <div className="flex w-full items-center justify-center">
          <Image
            src={
              imgSrc
                ? urlFor(imgSrc).width(400).height(250).url()
                : "https://ydnjcrmmrqnylligfbpk.supabase.co/storage/v1/object/public/avatars/nft.gif"
            }
            width={400}
            height={250}
            alt={imgAlt}
            className="h-full max-h-[400px] w-full max-w-[600px] rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between gap-y-5 px-3 py-3">
        <h3 className="text-lg lmb:text-xl  lp:text-2xl">{title}</h3>
        <div className="flex justify-between gap-x-5">
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center gap-x-2">
              <p className={` text-[#fcd484] font-bold`}>{likesCount ? likesCount : "0"}</p>
              <p className={` text-[#fcd484] font-bold`}>
                {likesCount > 1 ? "Stars" : "Star"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="h-8 w-8"
                enableBackground="new 0 0 512 512"
                viewBox="0 0 512 512"
              >
                <linearGradient id="a">
                  <stop offset="0" stopColor="#fef0ae"></stop>
                  <stop offset="1" stopColor="#fbc56d"></stop>
                </linearGradient>
                <linearGradient
                  id="c"
                  x1="24.524"
                  x2="275.651"
                  y1="55.555"
                  y2="308.445"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#a"
                ></linearGradient>
                <linearGradient id="b">
                  <stop offset="0" stopColor="#dc8758" stopOpacity="0"></stop>
                  <stop
                    offset="0.215"
                    stopColor="#dd8654"
                    stopOpacity="0.215"
                  ></stop>
                  <stop
                    offset="0.429"
                    stopColor="#e28448"
                    stopOpacity="0.429"
                  ></stop>
                  <stop
                    offset="0.642"
                    stopColor="#ea8034"
                    stopOpacity="0.642"
                  ></stop>
                  <stop
                    offset="0.854"
                    stopColor="#f47b18"
                    stopOpacity="0.854"
                  ></stop>
                  <stop offset="1" stopColor="#fe7701"></stop>
                </linearGradient>
                <linearGradient
                  id="d"
                  x1="291.335"
                  x2="443.773"
                  y1="245.015"
                  y2="341.06"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="e"
                  x1="377.906"
                  x2="348.388"
                  y1="391.827"
                  y2="321.776"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="f"
                  x1="405.196"
                  x2="396.972"
                  y1="190.357"
                  y2="148.649"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="g"
                  x1="151.592"
                  x2="197.412"
                  y1="273.174"
                  y2="455.278"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="h"
                  x1="116.508"
                  x2="332.635"
                  y1="177.797"
                  y2="393.924"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#a"
                ></linearGradient>
                <linearGradient
                  id="i"
                  x1="248.623"
                  x2="188.705"
                  y1="305.456"
                  y2="234.083"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="j"
                  x1="223.377"
                  x2="278.889"
                  y1="314.171"
                  y2="282.449"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="k"
                  x1="253.914"
                  x2="175.491"
                  y1="251.686"
                  y2="243.756"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="l"
                  x1="199.487"
                  x2="237.376"
                  y1="313.22"
                  y2="225.106"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="m"
                  x1="1201.851"
                  x2="1239.74"
                  y1="313.22"
                  y2="225.106"
                  gradientTransform="matrix(-1 0 0 1 1464.632 0)"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="n"
                  x1="311.39"
                  x2="372.483"
                  y1="378.002"
                  y2="372.715"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="o"
                  x1="294.614"
                  x2="276.991"
                  y1="400.191"
                  y2="443.661"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="p"
                  x1="171.62"
                  x2="186.306"
                  y1="407.201"
                  y2="440.684"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="q"
                  x1="354.943"
                  x2="397.238"
                  y1="249.297"
                  y2="291.592"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="r"
                  x1="170.596"
                  x2="138.288"
                  y1="389.037"
                  y2="354.378"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <linearGradient
                  id="s"
                  x1="281.721"
                  x2="314.617"
                  y1="389.938"
                  y2="369.965"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                ></linearGradient>
                <path
                  fill="url(#c)"
                  d="M506.107 222.403c11.545-11.261 5.167-30.889-10.791-33.201l-125.991-18.318a19.456 19.456 0 01-14.66-10.642L298.326 46.08c-3.572-7.231-10.519-10.852-17.453-10.852h-49.739V180.54A398.475 398.475 0 0199.173 476.77h49.43l.074-.062c3.424.26 7.008-.408 10.445-2.213l112.691-59.244a19.489 19.489 0 0118.121 0l73.446 61.518h49.343l-.012-.025c10.914-.593 20.247-10.581 18.145-22.768l-21.52-125.484a19.464 19.464 0 015.599-17.231z"
                  data-original="url(#c)"
                ></path>
                <path
                  fill="url(#d)"
                  d="M495.316 189.203l-125.991-18.318a19.456 19.456 0 01-14.66-10.642L317.56 85.054v353.338l45.82 38.378h49.343l-.012-.025c10.914-.593 20.247-10.581 18.145-22.768l-21.52-125.484a19.464 19.464 0 015.599-17.231l91.171-88.86c11.546-11.259 5.167-30.888-10.79-33.199z"
                  data-original="url(#d)"
                ></path>
                <path
                  fill="url(#e)"
                  d="M359.338 324.204L348.92 464.658l14.46 12.112h49.343l-.012-.025c10.914-.593 20.247-10.581 18.145-22.768l-21.52-125.484a19.36 19.36 0 01-.248-4.289z"
                  data-original="url(#e)"
                ></path>
                <path
                  fill="url(#f)"
                  d="M316.371 265.239h145.786l43.95-42.836c11.545-11.261 5.167-30.889-10.791-33.201l-125.991-18.318a19.339 19.339 0 01-3.206-.751h-49.748z"
                  data-original="url(#f)"
                ></path>
                <path
                  fill="url(#g)"
                  d="M99.173 476.77h49.43l.074-.062c3.424.26 7.008-.408 10.445-2.213l112.691-59.244c1.111-.584 2.273-1.018 3.452-1.373v-61.113h-83.277A398.314 398.314 0 0199.173 476.77z"
                  data-original="url(#g)"
                ></path>
                <path
                  fill="url(#h)"
                  d="M248.586 46.078l56.343 114.164a19.467 19.467 0 0014.656 10.649l125.987 18.307c15.966 2.32 22.341 21.941 10.788 33.203l-91.165 88.864a19.465 19.465 0 00-5.598 17.23l21.521 125.478c2.727 15.902-13.963 28.028-28.244 20.52L240.188 415.25a19.467 19.467 0 00-18.116 0l-112.686 59.243c-14.281 7.508-30.971-4.619-28.244-20.52l21.521-125.478a19.465 19.465 0 00-5.598-17.23L5.9 222.4c-11.553-11.262-5.178-30.882 10.788-33.203l125.987-18.307a19.463 19.463 0 0014.656-10.649l56.343-114.164c7.141-14.467 27.772-14.467 34.912.001z"
                  data-original="url(#h)"
                ></path>
                <path
                  fill="url(#i)"
                  d="M445.573 189.197L319.586 170.89a19.454 19.454 0 01-3.215-.756L86.705 471.165c5.666 5.512 14.56 7.596 22.68 3.327l112.686-59.243a19.467 19.467 0 0118.116 0l112.686 59.243c14.281 7.508 30.971-4.619 28.244-20.52l-21.521-125.478a19.465 19.465 0 015.598-17.23l91.165-88.864c11.555-11.262 5.18-30.883-10.786-33.203z"
                  data-original="url(#i)"
                ></path>
                <path
                  fill="url(#j)"
                  d="M16.688 189.197l125.987-18.307a19.454 19.454 0 003.215-.756l229.665 301.032c-5.666 5.512-14.56 7.596-22.68 3.327L240.189 415.25a19.467 19.467 0 00-18.116 0l-112.686 59.243c-14.281 7.508-30.971-4.619-28.244-20.52l21.521-125.478a19.465 19.465 0 00-5.598-17.23L5.9 222.4c-11.554-11.262-5.178-30.883 10.788-33.203z"
                  data-original="url(#j)"
                ></path>
                <path
                  fill="url(#k)"
                  d="M240.189 415.249l112.686 59.243c14.281 7.508 30.971-4.619 28.244-20.52l-21.521-125.478a19.465 19.465 0 015.598-17.23l91.165-88.864c11.553-11.262 5.178-30.882-10.788-33.202L319.586 170.89a19.464 19.464 0 01-14.656-10.648L248.586 46.078c-3.57-7.234-10.513-10.851-17.456-10.851v377.786c3.112 0 6.223.746 9.059 2.236z"
                  data-original="url(#k)"
                ></path>
                <path
                  fill="url(#l)"
                  d="M.287 205.269c-1.002 5.896.643 12.286 5.613 17.13l91.165 88.864a19.465 19.465 0 015.598 17.23L81.142 453.972c-2.727 15.902 13.963 28.028 28.244 20.52l112.686-59.243a19.467 19.467 0 0118.116 0l112.686 59.243c14.281 7.508 30.971-4.619 28.244-20.52l-21.521-125.478c-.246-1.432-.32-2.87-.246-4.291z"
                  data-original="url(#l)"
                ></path>
                <path
                  fill="url(#m)"
                  d="M461.981 205.269c1.002 5.896-.643 12.286-5.613 17.13l-91.165 88.864a19.465 19.465 0 00-5.598 17.23l21.521 125.478c2.727 15.902-13.963 28.028-28.244 20.52l-112.686-59.243a19.467 19.467 0 00-18.116 0l-112.686 59.243c-14.281 7.508-30.971-4.619-28.244-20.52l21.521-125.478c.246-1.432.32-2.87.246-4.291z"
                  data-original="url(#m)"
                ></path>
                <path
                  fill="url(#n)"
                  d="M381.119 453.972l-21.521-125.478c-.014-.084-.015-.168-.029-.252a19.51 19.51 0 01-.187-1.66c-.008-.115-.021-.231-.027-.346a19.348 19.348 0 01-.003-1.881c.002-.05-.003-.101 0-.152l-128.217-42.469-.003.001v131.279h.003a19.455 19.455 0 019.062 2.236l112.687 59.243c3.122 1.641 6.359 2.344 9.483 2.274 11.162-.254 20.883-10.373 18.752-22.795z"
                  data-original="url(#n)"
                ></path>
                <path
                  fill="url(#o)"
                  d="M381.119 453.972l-21.521-125.478c-.014-.084-.015-.168-.029-.252a19.51 19.51 0 01-.187-1.66c-.008-.115-.021-.231-.027-.346a19.348 19.348 0 01-.003-1.881c.002-.05-.003-.101 0-.152l-128.217-42.469-.003.001v131.279h.003a19.455 19.455 0 019.062 2.236l112.687 59.243c3.122 1.641 6.359 2.344 9.483 2.274 11.162-.254 20.883-10.373 18.752-22.795z"
                  data-original="url(#o)"
                ></path>
                <path
                  fill="url(#p)"
                  d="M102.918 324.204l128.216-42.471v131.281c-3.115 0-6.23.754-9.06 2.237l-112.679 59.244c-14.289 7.503-30.976-4.623-28.244-20.519l21.52-125.484c.247-1.432.321-2.866.247-4.288z"
                  data-original="url(#p)"
                ></path>
                <path
                  fill="url(#q)"
                  d="M456.356 222.403l-91.159 88.86a19.502 19.502 0 00-5.859 12.941l-128.204-42.471V35.227c6.934 0 13.881 3.622 17.453 10.852l56.339 114.162a19.452 19.452 0 0014.66 10.642l125.991 18.318c15.958 2.313 22.336 21.942 10.779 33.202z"
                  data-original="url(#q)"
                ></path>
                <path
                  fill="url(#r)"
                  d="M86.705 471.165c5.666 5.512 14.56 7.596 22.68 3.327l112.686-59.243a19.455 19.455 0 019.062-2.236V281.857z"
                  data-original="url(#r)"
                ></path>
                <path
                  fill="url(#s)"
                  d="M352.875 474.492c8.12 4.269 17.015 2.185 22.68-3.327L231.13 281.862v131.152c3.111 0 6.223.745 9.058 2.236z"
                  data-original="url(#s)"
                ></path>
              </svg>
            </div>
          </div>
          <Date date={date} />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
