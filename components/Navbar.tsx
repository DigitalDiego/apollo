import React from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";

export default function Navbar() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="w-full h-[12vh] border-b border-gray-400">
      <div className="w-3/4 mx-auto flex h-full">
        <div className="w-1/4 flex justify-start items-center border-r border-gray-400">
          <Link className="font-lobster text-4xl" href="/">
            apollo
          </Link>
        </div>
        <form className="flex items-center w-1/2 px-2 gap-2">
          <AiOutlineSearch />
          <input
            className="grow bg-transparent outline-none"
            type="text"
            placeholder="Search"
          />
        </form>
        <div className="w-1/4 border-l border-gray-400 flex justify-end items-center gap-2">
          {isSignedIn ? (
            <>
              <SignOutButton>
                <button className="px-4 py-1 bg-[#212121] text-gray-200 rounded-lg">
                  Sign Out
                </button>
              </SignOutButton>
              <Image
                src={user?.profileImageUrl}
                alt="user avatar"
                width={500}
                height={500}
                className="w-7 h-7 rounded-full object-cover"
              />
            </>
          ) : (
            <SignInButton>
              <button className="px-4 py-1 bg-[#212121] text-gray-200 rounded-lg">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
