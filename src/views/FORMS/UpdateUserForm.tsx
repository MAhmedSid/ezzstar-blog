"use client";
import Loading from "@/components/Loading";
import { selectUserID } from "@/store/session/sessionReducer";
import { useAppSelector } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UpdateForm = () => {
  const supabase = createClientComponentClient();
  const userId = useAppSelector(selectUserID);
  const [states, setStates] = useState<{
    image: null | string;
    username: string;
    walletAddress: string;
    isMutating: boolean;
  }>({ image: null, username: "", walletAddress: "", isMutating: false });

  useEffect(() => {
    const getData = async () => {
      const { data: auth, error } = await supabase.auth.getSession();
      if (auth.session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("wallet_address ,username,avatar_url")
          .eq("id", auth.session.user.id);

        if (error) {
          console.log(`${error.message}`);
          return;
        }

        setStates({
          ...states,
          username: data[0].username,
          walletAddress: data[0].wallet_address,
          image: data[0].avatar_url,
        });
      }
    };
    getData();
  }, []);

  const handleChange = (e: any, type: string) => {
    if (type === "username") {
      setStates({ ...states, username: e.target.value });
    } else {
      setStates({ ...states, walletAddress: e.target.value });
    }
  };

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["image/jpeg", "image/gif"];
    if (fileTypes.includes(selectedFile.type)) {
      const url = URL.createObjectURL(selectedFile);
      setStates({ ...states, image: url });
    } else {
      toast.error(`Only .gif and .jpg files are allowed`);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStates({ ...states, isMutating: true });
    try {
      const formData = new FormData(e.target);
      const imageFile = formData.get("avatar") as File;
      const walletAddress = formData.get("walletAddress");
      const username = formData.get("username");

      if (imageFile && imageFile.type.split("/")[0] === "image") {
        if (imageFile.size > 250000) {
          toast.error("Image size should less than 250kb");
          setStates({ ...states, isMutating: false });
          return;
        }
        const path = `${userId}.${imageFile.name.split(".").pop()}`;
        const { data: pathData, error: storageError } = await supabase.storage
          .from("avatars")
          .upload(path, imageFile, { upsert: true });

        if (storageError) {
          toast.error(`Image Storing Issue: ${storageError.message}`);
          setStates({ ...states, isMutating: false });
          return;
        }

        const { data: avatarData } = supabase.storage
          .from("avatars")
          .getPublicUrl(pathData.path);

        const res = await supabase
          .from("profiles")
          .update({
            username,
            avatar_url: avatarData.publicUrl,
            wallet_address: walletAddress,
          })
          .eq("id", userId)
          .returns();

        if (res.error) {
          console.log(`Error: ${res.error} , Try Again.`);
          setStates({ ...states, isMutating: false });
        } else {
          toast.success("Profile is updated Successfully");
          setStates({ ...states, isMutating: false });
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("wallet_address ,username,avatar_url")
          .eq("id", userId);

        if (!error) {
          setStates({ ...states, image: data[0].avatar_url });
        } else {
          console.log(`${error.message}`);
        }
      } else {
        const res = await supabase
          .from("profiles")
          .update({
            username,
            wallet_address: walletAddress,
          })
          .eq("id", userId)
          .returns();

        if (res.error) {
          setStates({ ...states, isMutating: false });
          console.log(`Error: ${res.error} , Try Again.`);
        } else {
          setStates({ ...states, isMutating: false });
          toast.success("Profile is updated Successfully");
        }
      }
    } catch (error) {
      setStates({ ...states, isMutating: false });
      console.log((error as { message: string }).message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-5"
      >
        {states.image && (
          <div className="relative h-[150px]    w-[150px] rounded-full">
            <button
              onClick={() => setStates({ ...states, image: null })}
              className="absolute right-4 top-0 rounded-full bg-red-700 hover:bg-red-600"
            >
              <X />
            </button>
            <Image
              priority
              src={states.image}
              width={400}
              height={400}
              alt="Ezzstar member image"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        )}
        <label
          className={`${
            states.image
              ? "h-0 w-0"
              : "min-h-[150px] w-[150px] lmb:min-h-[150px]"
          }  flex cursor-pointer items-center justify-center  rounded-full bg-zinc-300 text-black hover:text-pri_pink`}
        >
          <p className={`${states.image && "h-0 w-0"} text-4xl `}>+</p>
          <input
            placeholder="Avatar"
            name="avatar"
            type="file"
            className={`flex h-0 w-0 cursor-pointer appearance-none items-center justify-center  rounded-full bg-zinc-300 text-black hover:text-pri_pink`}
            onChange={uploadImage}
          />
        </label>

        <input
          required
          placeholder="Username"
          name="username"
          type="text"
          value={states.username}
          onChange={(e) => {
            handleChange(e, "username");
          }}
          className="min-h-[40px] w-full rounded-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 lmb:min-h-[50px]"
        />

        <input
          required
          placeholder="Wallet Address"
          name="walletAddress"
          type="text"
          value={states.walletAddress}
          onChange={(e) => {
            handleChange(e, "walletAddress");
          }}
          className="min-h-[40px] w-full rounded-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 lmb:min-h-[50px]"
        />
        <button
          type="submit"
          disabled={states.isMutating}
          className="flex h-[40px] w-[200px] items-center justify-center rounded-2xl bg-pri_yellow py-1 text-lg font-bold text-black transition-all duration-150 hover:bg-yellow-600 lmb:text-xl "
        >
          {states.isMutating ? (
            <Loading size="h-6 w-6" color="border-black" />
          ) : (
            "Save"
          )}
        </button>
      </form>
      <Link
        href={"/account/updatepassword#up"}
        className="text-center text-pri_yellow  hover:underline"
      >
        Update Password
      </Link>
    </>
  );
};

export default UpdateForm;
