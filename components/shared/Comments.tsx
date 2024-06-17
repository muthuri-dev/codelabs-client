"use client";
import {
  CREATE_COURSE_COMMENT,
  GET_COURSE_COMMENTS,
} from "@/graphql/comment.actions";
import { GET_USER_BY_ID } from "@/graphql/user.actions";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

type TComment = {
  user_id: string;
  comment: string;
};

type TUser = {
  username: string;
  profile_image: string;
};
export default function Comments({
  course_id,
  user,
}: {
  course_id: string;
  user: any;
}) {
  //getting comments
  const { data: commentData } = useQuery(GET_COURSE_COMMENTS, {
    variables: { course_id },
  });
  const comments: TComment[] = commentData?.getCourseComments;

  //posting comments
  const [createComment] = useMutation(CREATE_COURSE_COMMENT, {
    onCompleted: (data) => {
      toast("Post created");
    },
  });
  const [comment, setComment] = React.useState<string>("");
  const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createComment({
      variables: { comment, user_id: user?.id, course_id },
      refetchQueries: [{ query: GET_COURSE_COMMENTS }],
    });
    setComment("");
  };

  return (
    <div>
      <div className="w-full bg-white rounded-lg border p-2 md:my-4 md:mx-6">
        <h3 className="font-bold">Comments</h3>
        <div className="flex flex-col">
          {comments &&
            comments.map((comment, index) => (
              <div className="border rounded-md p-3 ml-3 my-3" key={index}>
                <UserProfile user_id={comment.user_id} />
                <p className="text-gray-600 mt-2">{comment.comment}</p>
              </div>
            ))}
        </div>
        <form onSubmit={submitComment}>
          <div className="w-full md:px-3 md:my-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 md:py-2 md:px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Type Your Comment"
              required
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            ></textarea>
          </div>
          <div className="w-full flex justify-end px-3">
            <input
              type="submit"
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 cursor-pointer"
              value="Post Comment"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export const UserProfile = ({ user_id }: { user_id: string }) => {
  const { data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: user_id },
  });
  const userProfile: TUser = userData?.getUserById;
  return (
    <div className="flex gap-3 items-center">
      <Image
        src={
          userProfile?.profile_image
            ? userProfile.profile_image
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB730p0ChSl_CNr5N6n05AGzEtEAhFypOFg&s"
        }
        height={200}
        width={200}
        alt=""
        className="object-cover w-8 h-8 rounded-full border-2 border-violet-400  shadow-violet-400"
      />
      <div className="font-bold">
        <h3 className="text-slate-600">{userProfile?.username}</h3>
        <h3 className="text-slate-600 text-xs font-thin">Author</h3>
      </div>
    </div>
  );
};
