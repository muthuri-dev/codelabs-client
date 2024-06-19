"use client";
import {
  ADD_DISCUSSION_COMMENT,
  ADD_NESTED,
  DISCUSSION_COMMENTS,
  GET_DISCUSSIONS,
  NESTED_COMMENTS,
} from "@/graphql/discussion.actions";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { UserProfile } from "@/components/shared/Comments";
import { Button } from "@/components/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/alert-dialog";

type TDiscussion = {
  id: string;
  title: string;
  content: string;
  image: string;
  user_id: string;
  created_at: string;
};
export default function Discussion({
  discussion_id,
  user,
}: {
  discussion_id: string;
  user: any;
}) {
  //get discussion
  const { data: discussionData } = useQuery(GET_DISCUSSIONS);
  const discussions: TDiscussion[] = discussionData?.getDiscussions;

  //adding discussions
  const [content, setContent] = React.useState<string>();
  const [addDiscussion, { error }] = useMutation(ADD_DISCUSSION_COMMENT, {
    onCompleted(data) {
      toast("Comment Added 😊");
      setContent("");
    },
  });

  //onsole.log(error);

  const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addDiscussion({
      variables: {
        content,
        user_id: user?.id,
        discussion_id,
      },
      refetchQueries: [{ query: DISCUSSION_COMMENTS }],
    });
  };

  return (
    <div
      className={`w-full lg:max-w-[70%] mx-auto p-4 ${user ? "" : "blur-md"}`}
    >
      {discussions &&
        discussions
          .filter((discussion) => discussion.id === discussion_id)
          .map((discussion) => (
            <div
              key={discussion.id}
              className="mb-4 border border-b-0 p-4 rounded-lg"
            >
              <div className="flex items-center mb-2">
                <UserProfile user_id={discussion.user_id} />
              </div>
              <p className="mb-2 text-sm font-extralight">
                {discussion.content}
              </p>
              <form
                onSubmit={submitComment}
                className="mt-5 border p-4 rounded-2xl"
              >
                <div className="w-full md:px-3 md:my-2">
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
                    value="Post Comment"
                  />
                </div>
              </form>
              <h2 className="text-xl font-mono mt-4">{}</h2>
            </div>
          ))}
      <DiscussionComments discussion_id={discussion_id} user={user} />
    </div>
  );
}

interface IDiscussionComment {
  id: string;
  content: string;
  discussion_id: string;
  user_id: string;
  created_at: string;
}
function DiscussionComments({
  discussion_id,
  user,
}: {
  discussion_id: string;
  user: any;
}) {
  //getting comment on discussions
  //console.log(discussion_id);
  const { data: commentData } = useQuery(DISCUSSION_COMMENTS, {
    variables: { id: discussion_id },
  });
  const discussionComments: IDiscussionComment[] =
    commentData?.getDiscussionComments;

  //submitting nested data
  const [content, setContent] = React.useState<string>();
  const [addNested, { error }] = useMutation(ADD_NESTED);

  //console.log(error);

  const submitNested = (
    event: React.FormEvent<HTMLFormElement>,
    comment_id: string
  ) => {
    event.preventDefault();
    addNested({
      variables: {
        content,
        user_id: user?.id,
        comment_id,
      },
      refetchQueries: [{ query: NESTED_COMMENTS }],
    });
    //console.log(comment_id);
  };
  return (
    <div className="ml-5">
      {discussionComments &&
        discussionComments.map((comment) => (
          <div key={comment.id} className="mb-4 border rounded-lg p-5">
            <div className="flex items-center mb-2">
              <UserProfile user_id={comment.user_id} />
            </div>
            <p className="mb-2 text-sm font-extralight">{comment.content}</p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={"sm"}>Reply</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <form
                  onSubmit={(event) => submitNested(event, comment.id)}
                  className="w-full rounded-2xl"
                >
                  <div className="w-full md:px-3 md:my-2">
                    <textarea
                      className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 md:py-2 md:px-3 font-mono placeholder-gray-700/85 focus:outline-none focus:bg-white"
                      name="body"
                      placeholder="Type Your Comment"
                      required
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="w-full flex justify-end px-3 gap-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <input
                      type="submit"
                      className="py-1 px-2 rounded-md text-white bg-violet-600 text-sm cursor-pointer"
                      value="Post Comment"
                    />
                  </div>
                </form>
              </AlertDialogContent>
            </AlertDialog>

            <NestedComments comment_id={comment.id} />
          </div>
        ))}
    </div>
  );
}

interface INestedComment {
  id: string;
  content: string;
  comment_id: string;
  user_id: string;
  created_at: string;
}
function NestedComments({ comment_id }: { comment_id: string }) {
  //nested comments
  const { data: nestedData, error } = useQuery(NESTED_COMMENTS, {
    variables: { id: comment_id },
  });
  const nestedComments: INestedComment[] = nestedData?.getNestedComments;
  //console.log(nestedComments, error);

  return (
    <div className="ml-5 mt-5">
      {nestedComments &&
        nestedComments.map((nested) => (
          <div key={nested.id} className="mb-4 border rounded-lg p-5">
            <div className="flex items-center mb-2">
              <UserProfile user_id={nested.user_id} />
            </div>
            <p className="mb-2 text-sm font-extralight">{nested.content}</p>
          </div>
        ))}
    </div>
  );
}
