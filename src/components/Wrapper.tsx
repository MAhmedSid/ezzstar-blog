import React, { ReactNode } from "react";

const Wrapper = ({children}:{children:ReactNode}) => {
  return <div className="w-full max-w-[1200px] flex flex-col items-center justify-center ">
    {children}
  </div>;
};

export default Wrapper;
