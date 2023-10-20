"use client";
import Script from "next/script";
import React, { memo } from "react";
import Ad300x250 from "./Ad300x250";

function AdNativeBanner() {
  return (
    <>
      <Script
        async
        data-cfasync="false"
        src="//g9qnk89pd5ic.com/068485164a9f58b49c59ed8cd4b6ace6/invoke.js"
        strategy="afterInteractive"
      />
      <div
        id="container-068485164a9f58b49c59ed8cd4b6ace6"
        className="hidden tablet:flex"
      />
      <div className="tablet:hidden">
        <Ad300x250 />
      </div>
    </>
  );
}

export default AdNativeBanner;
