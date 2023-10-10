"use client"
import React, { useEffect } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Skeleton } from "@/components/ui/skeleton"


export default function TwitterPreview({url}:{url:string}) {

  const twitterUrl = url;
  if(!twitterUrl) return;

  return (
    <div className="max-w-[300px]">
      <TwitterTweetEmbed  placeholder={<Skeleton className="min-h-[450px]  w-[300px]" />
} tweetId={(twitterUrl.split("/").pop()) as string} />
    </div>
  );
}
