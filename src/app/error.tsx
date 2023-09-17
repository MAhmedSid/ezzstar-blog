"use client"
import React from "react";


export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return <div className="px-20  h-[80vh] w-full max-w-full bg-pri_maroon flex justify-center items-center text-center text-3xl font-bold lmb:text-3xl tablet:text-4xl tablet:h-screen text-white">
    Something went wrong! Please try again later.
  </div>;
};
