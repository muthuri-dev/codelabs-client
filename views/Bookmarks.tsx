"use client";
import { GET_COURSES, GET_COURSE_BY_ID } from "@/graphql/course.action";
import { useQuery } from "@apollo/client";
import React from "react";
import { TCourse } from "./Courses";
import { Card, CardContent, CardHeader } from "@/components/card";
import { Button } from "@/components/button";
import { UserProfile } from "@/components/shared/Comments";
import { Badge } from "@/components/badge";
import Image from "next/image";
import { GET_BOOKMARKS } from "@/graphql/bookmark.actions";

interface IBookmark {
  course_id: string;
  user_id: string;
}
export default function Bookmarks({ user }: { user: any }) {
  //getting all user bookmarks
  const { data: bookmarkData, error } = useQuery(GET_BOOKMARKS);
  const bookmarks: IBookmark[] = bookmarkData?.getBookmarks;
  console.log(bookmarks, error);

  return (
    <>
      {bookmarks &&
        bookmarks
          .filter((bookmark) => bookmark.user_id === user?.id)
          .map((bookmark, index) => (
            <div
              key={index}
              className="sm:w-screen md:w-full md:space-x-2 md:space-y-2 grid grid-cols-1 lg:grid-cols-2"
            >
              <BookmarkedCourses course_id={bookmark.course_id} />
            </div>
          ))}
    </>
  );
}

function BookmarkedCourses({ course_id }: { course_id: string }) {
  //getting courses
  const {
    data: courseData,
    loading,
    error,
  } = useQuery(GET_COURSE_BY_ID, {
    variables: { id: course_id },
  });
  const course: TCourse = courseData?.getCourseById;

  //console.log(course, error);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center animate-pulse">
          Loading...
        </div>
      ) : (
        <Card className="w-screen md:w-full md:px-2 h-fit flex justify-center items-center">
          <CardHeader className="">
            <Image
              src={course.course_thumbnail}
              alt="course_thumbnail"
              width={200}
              height={200}
              className="rounded-md object-center w-full h-fit"
            />
          </CardHeader>
          <CardContent className="h-full w-full">
            <div className="w-full rounded-t-md lg:rounded-lg">
              <div className="flex flex-col justify-between w-full h-full">
                <h2 className="text-xl text-gray-800 font-mono mt-3">
                  {course.main_title}
                  <Badge variant={"default"} className="ml-1 md:ml-4">
                    {course.level_id}
                  </Badge>
                </h2>
                <p className="text-gray-600 font-light mb-4">
                  {course.short_description}
                </p>
              </div>
              <div className="flex justify-between mt-2 ">
                <UserProfile user_id={course.user_id} />
                <div className="md:flex gap-1">
                  <Button size={"sm"}>Enroll</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
