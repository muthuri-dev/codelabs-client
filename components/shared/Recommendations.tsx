"use client";
import {
  CREATE_RECOMMENDATION,
  GET_COURSE_RECOMMENDATIONS,
} from "@/graphql/recommendation.actions";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { UserProfile } from "./Comments";
import { toast } from "sonner";

type TRecommendation = {
  user_id: string;
  recommendation: string;
  done: boolean;
};
export default function Recommendations({
  course_id,
  user,
}: {
  course_id: string;
  user: any;
}) {
  //get course recommendations
  const { data: recommendationData } = useQuery(GET_COURSE_RECOMMENDATIONS, {
    variables: { course_id },
  });
  const recommendations: TRecommendation[] =
    recommendationData?.getCourseRecomm;

  //creating a recommendation
  const [createRecomm, { error }] = useMutation(CREATE_RECOMMENDATION, {
    onCompleted: (data) => {
      toast("Recommendatioon submitted");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error creating course!!!!!", {
        description: error.message,
      });
    },
  });
  // console.log(error);
  const [recomm, setRecomm] = React.useState<string>("");
  const submiRecomm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createRecomm({
      variables: {
        recommendation: recomm,
        user_id: user?.id,
        course_id,
      },
      refetchQueries: [{ query: GET_COURSE_RECOMMENDATIONS }],
    });
    setRecomm("");
  };
  return (
    <div>
      <div className="w-full bg-white rounded-lg border p-2 md:my-4 md:mx-6">
        <h3 className="font-bold">Recommendations</h3>
        <div className="flex flex-col">
          {recommendations &&
            recommendations.map((recomm, index) => (
              <div className="border rounded-md p-3 ml-3 my-3" key={index}>
                <UserProfile user_id={recomm.user_id} />
                <p className="text-gray-600 mt-2">{recomm.recommendation}</p>
                <h4 className="flex justify-end text-xs font-mono text-violet-500/60">
                  {recomm.done === true ? "DONE" : "NOT DONE"}
                </h4>
              </div>
            ))}
        </div>
        <form onSubmit={submiRecomm}>
          <div className="w-full md:px-3 md:my-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 md:py-2 md:px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Recommend anything towards the course"
              required
              value={recomm}
              onChange={(event) => setRecomm(event.target.value)}
            ></textarea>
          </div>
          <div className="w-full flex justify-end px-3">
            <input
              type="submit"
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 cursor-pointer"
              value="Recommend to course"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
