"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/card";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COURSES } from "@/graphql/course.action";
import Image from "next/image";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { UserProfile } from "@/components/shared/Comments";
import { BookmarkPlus } from "lucide-react";
import { ADD_ENROLL } from "@/graphql/enroll.actions";
import { useRouter } from "next/navigation";
import { ADD_BOOKMARK } from "@/graphql/bookmark.actions";
import { toast } from "sonner";

export type TCourse = {
  id: string;
  main_title: string;
  level_id: string;
  course_thumbnail: string;
  short_description: string;
  course_type: string;
  publish: boolean;
  user_id: string;
};
export default function Courses({ user }: { user: any }) {
  //getting list of courses
  const { data: courseData } = useQuery(GET_COURSES);
  const courses: TCourse[] = courseData?.getCourses;
  //console.log(courses, error);

  //add enroll
  const route = useRouter();
  const [addEnroll] = useMutation(ADD_ENROLL);
  const handleEnroll = (course_id: string) => {
    addEnroll({
      variables: {
        user_id: user?.id,
        course_id,
      },
    });
    route.push(`/course/${course_id}`);
  };
  //console.log(error);

  //ading user bookmarks
  const [addBookmark, { error }] = useMutation(ADD_BOOKMARK, {
    onCompleted: (data) => {
      toast("Bookmark created");
    },
  });
  const handleBookmark = (course_id: string) => {
    addBookmark({
      variables: {
        course_id,
        user_id: user?.id,
      },
    });
  };
  return (
    <div className="sm:w-screen md:w-full md:space-x-2 md:space-y-2 grid grid-cols-1 lg:grid-cols-2">
      {courses &&
        courses
          .filter((course) => course.publish === true)
          .map((course) => (
            <div key={course.id}>
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
                        <BookmarkPlus
                          size="32"
                          className="flex justify-end mb-1 ml-5 cursor-pointer"
                          onClick={() => handleBookmark(course.id)}
                        />
                        <Button
                          onClick={() => handleEnroll(course.id)}
                          size={"sm"}
                        >
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
    </div>
  );
}
