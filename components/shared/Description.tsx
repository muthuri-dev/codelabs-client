"use client";
import { GET_COURSE_BY_ID } from "@/graphql/course.action";
import { useQuery } from "@apollo/client";
import React from "react";

export default function Description({ course_id }: { course_id: string }) {
  const { data } = useQuery(GET_COURSE_BY_ID, { variables: { id: course_id } });
  const course = data?.getCourseById;
  return (
    <div className="w-full bg-white rounded-lg border p-2 md:my-4 md:mx-6">
      <h3 className="font-bold">Description</h3>
      <p>{course && course.course_description}</p>
    </div>
  );
}
