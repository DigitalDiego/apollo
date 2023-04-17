import React from "react";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

export default function LeftBar() {
  return (
    <div className="w-1/4 border-r border-gray-400 h-[88vh] py-2 pr-2 flex flex-col gap-2">
      <Link className="flex items-center gap-2" href="/">
        <AiFillHome />
        <p>Home</p>
      </Link>
    </div>
  );
}
