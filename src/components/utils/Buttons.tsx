import React, { PropsWithChildren, ReactNode } from "react";

export const PrimaryButton =  ({children,text, disabled,type}:{type:string,text:string,children:ReactNode,disabled:boolean})=> {
  return <> <button disabled={disabled} className="w-fit bg-pri_purple hover:bg-indigo-900 transition-all duration-150 rounded-full px-8 py-2 text-lg font-semibold ">{text}{children}</button></>;
};


export const CommentButton = ({children,text, disabled,type}:{type:string,text:string,children:ReactNode,disabled:boolean}) => {
  return <> <button type={type === "submit" ? "submit":"button"} disabled={disabled} className={`flex justify-center items-center w-10 h-10 bg-pri_yellow text-black hover:text-pri_yellow hover:bg-zinc-800 hover:bg-opacity-30 ${disabled && "bg-zinc-800 bg-opacity-30"} transition-all duration-150 rounded-full `}>{text}{children}</button></>;
};
