import React, { useState } from "react";
import { client } from "@/utils/client";
import { getPost, getPostComments, getLikes } from "@/utils/queries";
import { AiOutlineHeart, AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import { IPost, IComment, ILike } from "@/types";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { Comment } from "@/components";
import Link from "next/link";

interface IProps {
  post: IPost;
  comments: [IComment];
  likes: [ILike];
}

export default function Post({ post, comments, likes }: IProps) {
  const [content, setContent] = useState("");
  const { user, isSignedIn } = useUser();
  const likeExists = !!likes?.filter((like) => like?.userId === user?.id)
    ?.length;
  const like = likes?.filter((like) => like?.userId === user?.id)[0];

  const createComment = async () => {
    const doc = {
      _type: "comment",
      avatar: user?.profileImageUrl,
      username: user?.firstName,
      content,
      postId: post?._id,
    };
    await client.create(doc).then(() => {
      window.location.reload();
    });
  };

  const createLike = async () => {
    const doc = {
      _type: "like",
      postId: post?._id,
      userId: user?.id,
    };
    await client.create(doc).then(() => {
      window.location.reload();
    });
  };

  const deleteLike = async (id: any) => {
    await client.delete(id).then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      <Head>
        <title>apollo</title>
      </Head>
      <div className="w-full lg:w-1/2 p-2 h-screen lg:h-[88vh] overflow-y-scroll no-scrollbar flex flex-col gap-2 mb-[10vh] lg:mb-0">
        <div className="p-2 border border-gray-400 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center">
            <Link href={`/users/${post?.userId}`}>
              <div className="flex items-cenetr items-center gap-2">
                <Image
                  src={post?.avatar}
                  alt="user avatar"
                  width={500}
                  height={500}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <p className="font-poppinsSemiBold">{post?.username}</p>
              </div>
            </Link>
            <p className="text-xs opacity-50">
              {moment(post?._createdAt).fromNow()}
            </p>
          </div>
          {post?.content !== "null" && <p>{post?.content}</p>}
          {post?.image !== "null" && (
            <div className="w-full h-[300px] grid place-items-center">
              <Image
                src={post?.image}
                alt="post image"
                width={500}
                height={500}
                className="h-[300px] object-contain"
              />
            </div>
          )}
          {isSignedIn && (
            <div className="w-full flex justify-end items-center">
              {likeExists ? (
                <AiFillHeart
                  className="text-base cursor-pointer"
                  onClick={() => deleteLike(like?._id)}
                />
              ) : (
                <AiOutlineHeart
                  className="text-base cursor-pointer"
                  onClick={createLike}
                />
              )}
            </div>
          )}
        </div>
        {isSignedIn && (
          <div className="w-full flex items-center gap-2 border border-gray-400 p-2">
            <input
              className="grow outline-none bg-transparent"
              type="text"
              placeholder="Comment"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <button
              className="disabled:opacity-50"
              disabled={content.replace(/\s/g, "").length === 0}
              onClick={createComment}
            >
              <AiOutlinePlus className="text-base" />
            </button>
          </div>
        )}
        {comments?.length > 0 && (
          <p className="font-poppinsSemiBold">Comments</p>
        )}
        {comments?.map((comment) => (
          <Comment {...comment} key={comment?._id} />
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const id = params?.id;
  const query = getPost(id);
  const data = await client.fetch(query);
  const commentsQuery = getPostComments(id);
  const comments = await client.fetch(commentsQuery);
  const likes = await client.fetch(getLikes());

  return {
    props: {
      post: data[0],
      comments,
      likes,
    },
  };
};
