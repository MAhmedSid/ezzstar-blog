"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "/public/images/logo.webp";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobNavMenu from "./MobNavMenu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { removeSession } from "@/store/session/sessionReducer";
import useSaveSession from "@/hooks/useSaveSession";

const Navbar = () => {
  const userId = useSaveSession();

  const supabase = createClientComponentClient();
  const dispatch = useAppDispatch();
  const path = usePathname();

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

  return (
    <header className="flex w-full items-center justify-between gap-y-2 px-6 py-4 font-medium text-white tablet:justify-center tablet:gap-x-10  lp:px-24 lp:text-lg lcd:gap-x-24">
      <nav className=" hidden gap-x-4 child-hover:text-pri_yellow tablet:flex  lp:gap-x-12 lcd:gap-x-16 child:lcd:text-lg">
        <Link href={"/"} className={`${path === "/" && "text-pri_yellow"}`}>
          HOME
        </Link>
        <Link
          href={"/gaming"}
          className={`${path === "/world" && "text-pri_yellow"}`}
        >
          GAMES
        </Link>
        <Link
          href={"/anime"}
          className={`${path === "/nft" && "text-pri_yellow"}`}
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

      <nav className=" hidden gap-x-4 child-hover:text-pri_yellow tablet:flex  lp:gap-x-12 lcd:gap-x-16 child:lcd:text-lg">
        <Link
          href={"/blogs"}
          className={`${path === "/events" && "text-pri_yellow"}`}
        >
          BLOGS
        </Link>
        <Link
          href={"/events"}
          className={`${path === "/merch" && "text-pri_yellow"}`}
        >
          EVENTS
        </Link>
        {userId === "" ? (
          <Link href={"/account/signin/#signin"}>Sign In</Link>
        ) : (
          <Popover>
            <PopoverTrigger>
              <p className={`${path === "/future" && "text-pri_yellow"}`}>
                ACCOUNT
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <div className=" rounded-md bg-gradient-to-b from-pri_yellow  to-pri_blue p-[2px]">
                <div className="flex flex-col items-center justify-center rounded-md bg-black py-2  text-white child-hover:text-pri_yellow ">
                  <Link href={"/account/setting/#setting"} className="text-lg">
                    Setting
                  </Link>
                  <button onClick={handleSignout} className="text-lg">
                    LOG OUT
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
