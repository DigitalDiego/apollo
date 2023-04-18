import React from "react";
import { AiFillHome, AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function MobileNavbar() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="fixed lg:hidden bottom-0 w-full h-[10vh] bg-[#212121] text-gray-200 z-[4000] flex">
      <Link className="w-1/2 h-full grid place-items-center" href="/">
        <AiFillHome className="text-base" />
      </Link>
      {isSignedIn ? (
        <SignOutButton>
          <div className="w-1/2 h-full grid place-items-center">
            <Image
              src={user?.profileImageUrl!}
              alt="user avatar"
              width={500}
              height={500}
              className="w-6 h-6 rounded-full object-cover"
            />
          </div>
        </SignOutButton>
      ) : (
        <SignInButton>
          <button className="w-1/2 h-full grid place-items-center">
            <AiOutlineUser className="text-base" />
          </button>
        </SignInButton>
      )}
    </div>
  );
}
