"use client";
import Image from "next/image";
import React from "react";
import logo from "/public/images/logo.webp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobNavMenu from "./MobNavMenu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { removeSession } from "@/store/session/sessionReducer";
import useSaveSession from "@/hooks/useSaveSession";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const supabase = createClientComponentClient();
  const dispatch = useAppDispatch();
  const path = usePathname();
  const userId = useSaveSession();
  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error.message);
      }
      toast.success("Successfully logged out.");
      dispatch(removeSession);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-y-2 bg-black bg-opacity-70 px-6 py-4 font-medium text-white backdrop-blur-md tablet:justify-center tablet:gap-x-10  lp:px-24 lp:text-lg lcd:gap-x-24">
      <nav className=" hidden gap-x-4 child-hover:text-pri_yellow tablet:flex  lp:gap-x-12 lcd:gap-x-16 child:lcd:text-lg">
        <Link
          prefetch
          href={"/#t"}
          className={`${path === "/" && "text-pri_yellow"}`}
        >
          HOME
        </Link>
        <Link
          prefetch
          href={"/gaming"}
          className={`${path === "/gaming" && "text-pri_yellow"}`}
        >
          GAMES
        </Link>
        <Link
          prefetch
          href={"/anime"}
          className={`${path === "/anime" && "text-pri_yellow"}`}
        >
          ANIME
        </Link>
      </nav>
      <Image
        priority
        src={logo}
        alt="EZZSTAR logo"
        className="  max-w-[220px]  "
      />

      <nav className=" hidden items-center gap-x-4 child-hover:text-pri_yellow tablet:flex lp:gap-x-12 lcd:gap-x-16 child:lcd:text-lg">
        <Link
          prefetch
          href={"/blogs"}
          className={`${path === "/blogs" && "text-pri_yellow"}`}
        >
          BLOGS
        </Link>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="cursor-not-allowed text-white">EVENTS</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming Soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {userId === "" ? (
          <Link
            prefetch
            href={"/account/signin/#signin"}
            className={`${path === "/account/signin" && "text-pri_yellow"}`}
          >
            SIGN IN
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger>
              <p className="hover:text-pri_yellow">ACCOUNT</p>
            </PopoverTrigger>
            <PopoverContent>
              <div className=" rounded-md bg-gradient-to-b from-pri_yellow  to-pri_blue p-[2px]">
                <div className="flex flex-col items-center justify-center gap-y-3 rounded-md bg-black py-2  text-white  ">
                  <Link
                    prefetch
                    href={"/account/setting/#setting"}
                    className={`${
                      path === "/account/setting" && "text-lg text-pri_yellow"
                    } hover:text-pri_yellow`}
                  >
                    Setting
                  </Link>
                  <button
                    onClick={handleSignout}
                    className={`flex items-center justify-center gap-x-3 text-lg text-red-700 hover:text-red-600`}
                  >
                    <span className="font-medium">Sign Out</span>
                    <LogOut />
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </nav>
      <MobNavMenu />
    </header>
  );
};

export default Navbar;
