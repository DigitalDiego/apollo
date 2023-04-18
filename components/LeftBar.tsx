import React from "react";
import { AiFillHome, AiFillBell, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { FaHashtag } from "react-icons/fa";
import { BsFillEnvelopeFill, BsFillBookmarkFill } from "react-icons/bs";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

export default function LeftBar() {
  const data = [
    {
      id: 1,
      icon: <AiFillHome className="text-base" />,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      icon: <FaHashtag className="text-base" />,
      text: "Explore",
      link: "/",
    },
    {
      id: 3,
      icon: <AiFillBell className="text-base" />,
      text: "Notifications",
      link: "/",
    },
    {
      id: 4,
      icon: <BsFillEnvelopeFill className="text-base" />,
      text: "Messages",
      link: "/",
    },
    {
      id: 5,
      icon: <BsFillBookmarkFill className="text-base" />,
      text: "Bookmarks",
      link: "/",
    },
    {
      id: 6,
      icon: <AiOutlineUser className="text-base" />,
      text: "Profile",
      link: "/",
    },
    {
      id: 7,
      icon: <HiOutlineDotsCircleHorizontal className="text-base" />,
      text: "More",
      link: "/",
    },
  ];

  return (
    <div className="w-1/4 border-r border-gray-400 h-[88vh] py-2 pr-2 hidden lg:flex flex-col gap-4">
      {data.map(({ id, icon, text, link }) => (
        <Link className="flex items-center gap-2" href={link} key={id}>
          {icon}
          <p>{text}</p>
        </Link>
      ))}
    </div>
  );
}
