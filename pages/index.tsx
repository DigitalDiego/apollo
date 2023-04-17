import React from "react";
import Head from "next/head";
import { Wizard, Post } from "../components";
import { client } from "@/utils/client";
import { getPosts } from "@/utils/queries";
import { IPost } from "@/types";
import { useUser } from "@clerk/nextjs";
interface IProps {
  posts: [IPost];
}

export default function Home({ posts }: IProps) {
  const { isSignedIn } = useUser();

  return (
    <>
      <Head>
        <title>apollo</title>
      </Head>
      <div className="w-1/2 h-[88vh] p-2 flex flex-col gap-2 overflow-y-scroll no-scrollbar">
        {isSignedIn && <Wizard />}
        {posts?.map((post) => (
          <Post {...post} key={post?._id} />
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = getPosts();
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
