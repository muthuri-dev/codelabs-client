"use client";
import { Badge } from "@/components/badge";
import { ScrollArea } from "@/components/scroll-area";
import { GET_COURSE_BY_ID } from "@/graphql/course.action";
import { GET_USER_BY_ID } from "@/graphql/user.actions";
import { useQuery } from "@apollo/client";
import { TimerStart } from "iconsax-react";
import Image from "next/image";
import React from "react";
import * as timeago from "timeago.js";

interface ICourse {
  id: string;
  main_title: string;
  level_id: string;
  course_thumbnail: string;
  course_description: string;
  short_description: string;
  course_type: string;
  course_content: ICourseContent[];
  user_id: string;
  create_at: string;
}

interface ICourseContent {
  title: string;
  subTopics: ISubtopic[];
}

interface ISubtopic {
  content: string[];
  title: string;
}

interface IUserProfile {
  username: string;
  profile_image: string;
}

export default function CoursePage({ course_id }: { course_id: string }) {
  const { data: courseData, error } = useQuery(GET_COURSE_BY_ID, {
    variables: { id: course_id },
  });
  const course: ICourse = courseData?.getCourseById;

  // getting course author
  const { data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: course?.user_id },
  });
  const userProfile: IUserProfile = userData?.getUserById;
  //console.log(userProfile);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  //table of content track
  return (
    <>
      <ScrollArea className="w-full md:w-[80%] overflow-y-hidden p-4 border border-r">
        <div className="flex rounded-lg">
          <Image
            src={course?.course_thumbnail}
            alt="thumbnail"
            className=" object-cover rounded-lg"
            height={100}
            width={200}
          />
          <div className="ml-8">
            <div className="flex text-sm text-gray-500 mt-2 mb-2 md:mt-0">
              <span className="mr-4">
                <TimerStart size="20" />
              </span>
              {timeago.format(course?.create_at)}

              <Badge className="pr-4 mx-4">{course?.level_id}</Badge>
            </div>
            <h2 className="text-xl font-mono mt-2">{course?.main_title}</h2>
            <p className="text-gray-700 mt-2">{course?.short_description}</p>
            <div className="flex gap-5 mt-3">
              <Image
                src={userProfile?.profile_image}
                alt="author"
                className="w-10 h-10 rounded-full"
                height={200}
                width={200}
              />
              <div className="gap-4">
                <p className="text-sm font-mono ">{userProfile?.username}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border p-4 m-3 w-full rounded-lg">
          {course &&
            course.course_content.map((content, index) => (
              <div key={index} id={`content-${index}`}>
                <h2 className="text-violet-500/60 mt-4 text-2xl text-center font-bold">
                  {content.title}
                </h2>
                {content.subTopics.map((sub, subIndex) => (
                  <div key={subIndex} id={`sub-${index}-${subIndex}`}>
                    <h3 className="text-xl font-mono m-3 ">{sub.title}</h3>
                    <p className="font-extralight ">{sub.content}</p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </ScrollArea>
      <ScrollArea className="hidden md:block w-[20%] overflow-y-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="sticky top-0 pt-4">
          <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
          {course &&
            course.course_content.map((content, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-violet-600">
                  {content.title}
                </h3>
                <ul className="ml-4 space-y-2">
                  {content.subTopics.map((sub, subIndex) => (
                    <li
                      key={subIndex}
                      className="text-sm text-gray-500 hover:text-violet-600 transition-colors duration-300"
                    >
                      <a
                        href="#"
                        onClick={(e) =>
                          handleLinkClick(e, `sub-${index}-${subIndex}`)
                        }
                        className="flex items-center"
                      >
                        <span className="mr-2 opacity-0 transition-opacity duration-300">
                          &rarr;
                        </span>
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </ScrollArea>
    </>
  );
}
