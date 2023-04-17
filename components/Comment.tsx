import React from "react";
import { IComment } from "@/types";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

export default function Comment(props: IComment) {
  return (
    <div className="border border-gray-400 p-2 flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <Link href={`/users/${props?.userId}`}>
          <div className="flex items-center gap-2">
            <Image
              src={props?.avatar}
              alt="user avatar"
              width={500}
              height={500}
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="font-poppinsSemiBold">{props?.username}</p>
          </div>
        </Link>
        <p className="text-xs opacity-50">
          {moment(props?._createdAt).fromNow()}
        </p>
      </div>
      <p>{props?.content}</p>
    </div>
  );
}
