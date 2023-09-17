"use client";
import { selectUserID } from "@/store/session/sessionReducer";
import { useAppSelector } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateForm = () => {
  const supabase = createClientComponentClient();
  const userId = useSelector(selectUserID);

  const [image, setImage] = useState<null | string>(null);
  const [username, setUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("wallet_address ,username,avatar_url")
        .eq("id", userId);

      if (error) {
        toast.error(`${error.message}`);
        return;
      }

      setUsername(data[0].username);
      setWalletAddress(data[0].wallet_address);
      setImage(data[0].avatar_url);
    };
    getData();
  }, []);

  const handleChange = (e: any, type: string) => {
    if (type === "username") {
      setUsername(e.target.value);
    } else {
      setWalletAddress(e.target.value);
    }
  };

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["image/jpeg", "image/gif"];
    if (fileTypes.includes(selectedFile.type)) {
      const url = URL.createObjectURL(selectedFile);
      setImage(url);
    } else {
      toast.error(`Only .gif and .jpg files are allowed`);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const imageFile = formData.get("avatar") as File;
      const walletAddress = formData.get("walletAddress");
      const username = formData.get("username");

      if (imageFile && imageFile.type.split("/")[0] === "image") {
        if (imageFile.size > 250000) {
          toast.error("Image size should less than 250kb");
          return;
        }
        const path = `${userId}.${imageFile.name.split(".").pop()}`;
        const { data: pathData, error: storageError } = await supabase.storage
          .from("avatars")
          .upload(path, imageFile, { upsert: true });

        if (storageError) {
          toast.error(`Image Storing Issue: ${storageError.message}`);
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
          toast.error(`Error: ${res.error} , Try Again.`);
        } else {
          toast.success("Profile is updated Successfully");
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("wallet_address ,username,avatar_url")
          .eq("id", userId);

        if (!error) {
          setImage(data[0].avatar_url);
        } else {
          toast.error(`${error.message}`);
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
          toast.error(`Error: ${res.error} , Try Again.`);
        } else {
          toast.success("Profile is updated Successfully");
        }
      }
    } catch (error) {
      console.log((error as { message: string }).message);
      toast.error(`${(error as { message: string }).message}, Try Again!`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-5"
    >
      {image && (
        <div className="relative h-[150px]    w-[150px] rounded-full">
          <button
            onClick={() => setImage(null)}
            className="absolute right-4 top-0 rounded-full bg-red-700 hover:bg-red-600"
          >
            <X />
          </button>
          <img
            src={image}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      )}
      <label
        className={`${
          image ? "h-0 w-0" : "min-h-[150px] w-[150px] lmb:min-h-[150px]"
        }  flex cursor-pointer items-center justify-center  rounded-full bg-zinc-300 text-black hover:text-pri_pink`}
      >
        <p className={`${image && "h-0 w-0"} text-4xl `}>+</p>
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
        value={username}
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
        value={walletAddress}
        onChange={(e) => {
          handleChange(e, "walletAddress");
        }}
        className="min-h-[40px] w-full rounded-lg bg-zinc-300 px-2 py-1 text-black placeholder:text-gray-500 lmb:min-h-[50px]"
      />
      <button
        type="submit"
        className="rounded-2xl bg-pri_yellow px-12 py-1 text-lg font-bold text-black lmb:px-16 lmb:text-xl"
      >
        Save
      </button>
    </form>
  );
};

export default UpdateForm;
