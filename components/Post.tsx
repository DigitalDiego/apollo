import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { IPost } from "@/types";
import Image from "next/image";
import { client } from "@/utils/client";
import { getPostComments, getPostLikes } from "@/utils/queries";

export default function Post(props: IPost) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const getComments = async (id: any) => {
    const query = getPostComments(id);
    await client.fetch(query).then((data) => {
      setComments(data);
    });
  };

  const getLikes = async (id: any) => {
    const query = getPostLikes(id);
    await client.fetch(query).then((data) => {
      setLikes(data);
    });
  };
  useEffect(() => {
    getComments(props?._id);
  }, []);
  useEffect(() => {
    getLikes(props?._id);
  }, []);
  return (
    <Link className="w-full" href={`/posts/${props?._id}`}>
      <div className="p-2 border border-gray-400 flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2 font-poppinsSemiBold">
            <Image
              src={props?.avatar}
              alt="user avatar"
              width={500}
              height={500}
              className="w-7 h-7 rounded-full object-cover"
            />
            <p>{props?.username}</p>
          </div>
          <p className="text-xs opacity-50">
            {moment(props?._createdAt).fromNow()}
          </p>
        </div>
        {props?.content !== "null" && <p>{props?.content}</p>}
        {props?.image !== "null" && (
          <div className="w-full h-[300px] grid place-items-center">
            <Image
              src={props?.image}
              alt="post image"
              width={500}
              height={500}
              className="h-[300px] object-contain"
            />
          </div>
        )}
        <div className="w-full flex justify-end items-center gap-4">
          <div className="flex items-center gap-1">
            <AiFillHeart />
            <p>{likes?.length}</p>
          </div>
          <div className="flex items-center gap-1">
            <AiOutlineComment />
            <p>{comments?.length}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
