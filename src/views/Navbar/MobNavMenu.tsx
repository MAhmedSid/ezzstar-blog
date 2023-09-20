"use client";
import React, { useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toast } from "react-hot-toast";
import { removeSession } from "@/store/session/sessionReducer";
import useSaveSession from "@/hooks/useSaveSession";

const MobNavMenu = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      }
      toast.success("You have Suxxessfully logged out.");
      dispatch(removeSession);
      window.location.reload();
    } catch (error) {}
  };

  const supabase = createClientComponentClient();

  const userId = useSaveSession();
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu onOpenChange={toggleMenu}>
      <DropdownMenuTrigger className="block tablet:hidden">
        {open === false ? (
          <Menu className="h-9  w-9 flex-[0.1] rounded-md border-2 border-pri_blue stroke-pri_blue  animate-in" />
        ) : (
          <X className="h-9 w-9  flex-[0.1] rounded-md border-2 border-pri_blue stroke-pri_blue  animate-in" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className=" bg-gradient-to-b from-pri_yellow  to-pri_blue p-[2px]">
          <div className="flex flex-col items-center justify-center rounded-md bg-black text-white  child-hover:text-pri_yellow ">
            <DropdownMenuItem>
              <Link prefetch href={"/"} className="text-lg">
                HOME
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link prefetch href={"/gaming"} className="text-lg">
                GAMES
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link prefetch href={"/anime"} className="text-lg">
                ANIME
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link prefetch href={"/blogs"} className="text-lg">
                BLOGS
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link prefetch href={"/events"} className="text-lg">
                EVENTS
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              {userId === "" ? (
                <Link prefetch href={"/account/signin/#signin"} className="text-lg">
                  Sign In
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <p className="text-lg">ACCOUNT</p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="w-full bg-gradient-to-b from-pri_yellow  to-pri_blue p-[2px]">
                      <div className="flex flex-col items-center  justify-center   rounded-md bg-black px-4 py-2 text-white  child-hover:text-pri_yellow">
                        <Link prefetch href={"/account/setting/#setting"} className="text-lg">
                          Setting
                        </Link>
                        <button onClick={handleSignout} className="text-lg">
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobNavMenu;
