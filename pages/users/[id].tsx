import React from "react";
import Head from "next/head";
import { IPost } from "@/types";
import { client } from "@/utils/client";
import { getUserPosts } from "@/utils/queries";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Post } from "@/components";

interface IProps {
  posts: [IPost];
}

export default function User({ posts }: IProps) {
  return (
    <>
      <Head>
        <title>apollo | {posts[0]?.username}</title>
      </Head>
      <div className="w-1/2 p-2 flex flex-col gap-2 h-[88vh] overflow-y-scroll no-scrollbar">
        <div className="w-full border border-gray-400 flex items-center gap-2 p-2">
          <Image
            src={posts[0]?.avatar}
            alt="user avatar"
            width={500}
            height={500}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-poppinsSemiBold">{posts[0]?.username}</p>
        </div>
        {posts?.map((post) => (
          <Post {...post} key={post?._id} />
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const id = params?.id;
  const query = getUserPosts(id);
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
