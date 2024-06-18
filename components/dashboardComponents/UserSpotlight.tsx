"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MagicStar, Send2 } from "iconsax-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "@/graphql/course.action";

interface ICourse {
  main_title: string;
  course_thumbnail: string;
  publish: boolean;
  user_id: string;
  short_description: string;
}

function UserSpotlight({ user }: { user: any }) {
  const [comment1Liked, setComment1Liked] = useState(true);

  //geting four recent courses
  const { data: courseData } = useQuery(GET_COURSES);
  const courses: ICourse[] = courseData?.getCourses;

  // console.log(user?.id);
  return (
    <div className="border text-gray-500 w-full p-3 rounded-2xl space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm gap-2">
          <MagicStar size={18} />
          <p className="text-gray-800 font-medium">User Spotlight</p>
        </div>
        <button className="border flex items-center gap-1 px-2 py-1 rounded-lg text-xs">
          <Send2 size={14} />
          share
        </button>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">Recent courses</TabsTrigger>
          <TabsTrigger value="uploads">My course uploads</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <div className="space-y-3">
            {courses &&
              courses
                .filter((course) => course.publish === true)
                .map((course, index) => (
                  <div key={index}>
                    <div
                      onDoubleClick={() => setComment1Liked(!comment1Liked)}
                      className="flex items-center justify-between w-full select-none cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            course.course_thumbnail && course.course_thumbnail
                          }
                          alt="course"
                          height={200}
                          width={200}
                          className="rounded-full h-10 w-10"
                        />
                        <div className="font-medium">
                          <p className="text-xs text-gray-500">
                            {course.main_title}
                          </p>
                          <p className="text-xm text-gray-700 font-thin">
                            {course.short_description.slice(0, 30)}...
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setComment1Liked(!comment1Liked)}
                        className={`${
                          comment1Liked ? "text-red-500" : "text-gray-400"
                        } duration-200 active:scale-50`}
                      >
                        <Heart
                          size={20}
                          variant={comment1Liked ? "Bold" : "Linear"}
                        />
                      </button>
                    </div>

                    <hr className="bg-gray-400" />
                  </div>
                ))}
          </div>
        </TabsContent>
        <TabsContent value="uploads">
          <div className="space-y-3">
            {courses && user?.id ? (
              courses
                .filter(
                  (course) =>
                    course.user_id !== null && course.user_id === user.id
                )
                .slice(0, 5)
                .map((course, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between w-full select-none cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            course.course_thumbnail
                              ? course.course_thumbnail
                              : "https://utfs.io/f/0c22695f-7f3f-4d07-819c-c88e9fd54b30-4hgl4c.png"
                          }
                          alt="course"
                          height={200}
                          width={200}
                          className="rounded-full h-10 w-10"
                        />
                        <div className="font-medium">
                          <p className="text-xs text-gray-500">
                            {course.main_title
                              ? course.main_title
                              : "Add title for the course"}
                          </p>
                          <p className="text-xm text-gray-700 font-thin">
                            {course.short_description
                              ? course.short_description.slice(0, 30)
                              : "add short description for the course"}
                          </p>
                        </div>
                      </div>
                      <h6 className="text-xs text-violet-500 font-thin">
                        {course.publish ? "True" : "False"}
                      </h6>
                    </div>

                    <hr className="bg-gray-400" />
                  </div>
                ))
            ) : (
              <>Upload courses to view them here</>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserSpotlight;
