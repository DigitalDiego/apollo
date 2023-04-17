import React, { useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import { client } from "@/utils/client";
import { Loader } from "../components";
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import { BsFillTrash2Fill } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";

export default function Wizard() {
  const [content, setContent] = useState("");
  const [handler, setHandler] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState<string | null>(null);
  const { user } = useUser();

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          const image = document?.url;
          setImageAsset(image);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const createPost = async () => {
    const doc = {
      _type: "post",
      username: user?.firstName,
      avatar: user?.profileImageUrl,
      content: content.replace(/\s/g, "").length !== 0 ? content : "null",
      image: imageAsset ? imageAsset : "null",
    };
    await client.create(doc).then(() => {
      window.location.reload();
    });
  };
  return (
    <div className="w-full p-2 flex flex-col gap-2 border border-gray-400">
      <input
        className="grow bg-transparent outline-none"
        type="text"
        placeholder="What&#39;s on your mind?"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      {handler && (
        <div className="w-full h-[300px]">
          {!imageAsset && !loading ? (
            <label className="relative w-full h-[300px] grid place-items-center">
              <input
                className="w-0 h-0 absolute"
                type="file"
                onChange={uploadImage}
              />
              <AiOutlineUpload className="text-base" />
            </label>
          ) : loading ? (
            <Loader />
          ) : (
            imageAsset && (
              <div className="relative w-full h-[300px] grid place-items-center">
                <Image
                  src={imageAsset}
                  alt="post image"
                  width={500}
                  height={500}
                  className="h-[300px] object-contain"
                />
                <BsFillTrash2Fill
                  className="text-base absolute top-2 right-2 text-red-400 cursor-pointer"
                  onClick={() => setImageAsset(null)}
                />
              </div>
            )
          )}
        </div>
      )}
      <div className="w-full flex justify-end items-center gap-2">
        <AiFillFileImage
          className="text-base cursor-pointer"
          onClick={() => setHandler(!handler)}
        />
        <button
          className="px-4 py-1 bg-[#212121] text-gray-200 rounded-lg disabled:opacity-50"
          disabled={!imageAsset && content.replace(/\s/g, "").length === 0}
          onClick={createPost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
