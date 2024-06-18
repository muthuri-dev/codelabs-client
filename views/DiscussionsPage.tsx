"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowCircleRight2 } from "iconsax-react";
import { ADD_DISCUSSION, GET_DISCUSSIONS } from "@/graphql/discussion.actions";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { UserProfile } from "@/components/shared/Comments";
import { toast } from "sonner";
import { Input } from "@/components/input";

type TDiscussion = {
  id: string;
  title: string;
  content: string;
  image: string;
  user_id: string;
  created_at: string;
};

export default function DiscussionsPage() {
  //getting all discussions
  const { data: discussionData, loading } = useQuery(GET_DISCUSSIONS);
  const discussions: TDiscussion[] = discussionData?.getDiscussions;

  return (
    <>
      {discussions ? (
        discussions.map((discussion) => (
          <Link
            key={discussion.id}
            href={`/discussion/${discussion.id}`}
            className="group rounded-xl overflow-hidden"
          >
            <div className="sm:flex">
              <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                <Image
                  width={500}
                  height={500}
                  className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                  src={discussion.image && discussion.image}
                  alt="description"
                />
              </div>
              <div className="flex flex-col grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                  {discussion.title}
                </h3>
                <p className="mt-3 text-gray-600">
                  {discussion.content.length > 100
                    ? `${discussion.content.slice(0, 97)}...`
                    : discussion.content}
                </p>
                <p className="mt-4 inline-flex items-center gap-x-1 text-violet-600 decoration-2 hover:underline font-medium">
                  Read more
                  <ArrowCircleRight2 size="20" color="#8F00FF" />
                </p>
                <UserProfile user_id={discussion.user_id} />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <section className="bg-white py-20 dark:bg-dark">
          <div className="container">
            <div className="mx-auto w-full max-w-[700px] items-center gap-8 md:flex">
              <div className="flex h-[200px] w-full max-w-[300px] items-center justify-center rounded-xl bg-gradient-to-r from-gray-1 to-gray-4 text-secondary-color dark:from-dark-4 dark:to-dark-5">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.84995 31.15C4.49995 31.15 4.09995 31.05 3.79995 30.85C3.09995 30.45 2.69995 29.8 2.69995 29V2.99999C2.69995 2.24999 3.09995 1.54999 3.79995 1.14999C4.49995 0.749994 5.29995 0.799994 5.99995 1.19999L28.4 14.25C29.05 14.65 29.4 15.3 29.4 16.05C29.4 16.75 29.05 17.45 28.4 17.8L5.94995 30.8C5.59995 31 5.19995 31.15 4.84995 31.15ZM4.89995 3.19999V28.8L26.9 16L4.89995 3.19999Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="w-full space-y-3">
                <div className="h-3 w-full rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
                <div className="h-3 w-4/6 rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
                <div className="h-3 w-5/6 rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
                <div className="h-3 w-full rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
                <div className="h-3 w-5/6 rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
                <div className="h-3 w-4/6 rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function AddDiscussion({ user }: { user: any }) {
  //adding discussions
  const [title, setTitle] = React.useState<string>();
  const [image, setImage] = React.useState<string>();
  const [content, setContent] = React.useState<string>();
  const [addDiscussion, { error }] = useMutation(ADD_DISCUSSION, {
    onCompleted(data) {
      toast("Discussion Added 💯");
      setTitle("");
      setImage("");
      setContent("");
    },
  });
  const submitDiscussion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addDiscussion({
      variables: {
        title,
        content,
        image,
        user_id: user?.id,
      },
      refetchQueries: [{ query: GET_DISCUSSIONS }],
    });
  };
  return (
    <form onSubmit={submitDiscussion} className="mt-5 border p-4 rounded-2xl">
      <div className="w-full md:px-3 md:my-2">
        <div className="flex mb-4 gap-4">
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="discussion title"
            required
          />
          <Input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="discussion image"
          />
        </div>
        <textarea
          className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 md:py-2 md:px-3 font-mono placeholder-gray-400/85 focus:outline-none focus:bg-white"
          name="body"
          placeholder="Type Your Comment"
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
      </div>
      <div className="w-full flex justify-end px-3">
        <input
          type="submit"
          className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 cursor-pointer"
          value="Post Discussion"
        />
      </div>
    </form>
  );
}
