"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppDispatch } from "@/store/store";
import { toast } from "react-hot-toast";
import { removeSession } from "@/store/session/sessionReducer";
import useSaveSession from "@/hooks/useSaveSession";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        console.log(error.message);
      }
      toast.success("Successfully logged out.");
      dispatch(removeSession);
      window.location.reload();
    } catch (error) {}
  };

  const supabase = createClientComponentClient();
  const dispatch = useAppDispatch();
  const path = usePathname();
  const userId = useSaveSession();

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
          <div className="flex flex-col items-center justify-center rounded-md bg-black bg-opacity-90 text-white drop-shadow-lg  child-hover:text-pri_yellow ">
            <DropdownMenuItem>
              <Link
                prefetch
                href={"/#t"}
                className={`${path === "/" && "text-pri_yellow "}text-lg`}
              >
                HOME
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                prefetch
                href={"/gaming"}
                className={`${path === "/gaming" && "text-pri_yellow "}text-lg`}
              >
                GAMES
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                prefetch
                href={"/anime"}
                className={`${path === "/anime" && "text-pri_yellow "}text-lg`}
              >
                ANIME
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                prefetch
                href={"/blogs"}
                className={`${path === "/blogs" && "text-pri_yellow "}text-lg`}
              >
                BLOGS
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              {userId === "" ? (
                <Link
                  prefetch
                  href={"/account/signin/#signin"}
                  className={`${
                    path === "/account/signin" && "text-pri_yellow "
                  }text-lg`}
                >
                  SIGN IN
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <p className="">ACCOUNT</p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="w-full bg-gradient-to-b from-pri_yellow  to-pri_blue p-[2px]">
                      <div className="flex flex-col items-center justify-center gap-y-4 rounded-md bg-black py-2  text-white  ">
                        <Link
                          prefetch
                          href={"/account/setting/#setting"}
                          className={`${
                            path === "/account/setting" &&
                            "text-lg text-pri_yellow"
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
