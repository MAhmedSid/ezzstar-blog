"use client";
import { addSession, selectUserID } from "@/store/session/sessionReducer";
import { useAppDispatch } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSaveSession = () => {
  const dispatch = useAppDispatch();
  const supabase = createClientComponentClient();
  const userId = useSelector(selectUserID);

  const [userid, setUserId] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await supabase.auth.getSession();
        if (res.data.session) {
          dispatch(addSession(res.data.session.user.id));
          setUserId(res.data.session.user.id);
        }
      } catch (error) {
        console.log(
          "Error from useSaveSession",
          (error as { message: string }).message,
        );
      }
    };
    fetchSession();
  }, [userId]);

  return userid;
};

export default useSaveSession;
