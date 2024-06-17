"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { useQuery } from "@apollo/client";
import { GET_USER_UPLOADED } from "@/graphql/course.action";
import * as timeago from "timeago.js";
import { DirectRight } from "iconsax-react";
import { Progress } from "@/components/progress";
import Chart from "./Chart";
import { useRouter } from "next/navigation";

interface ICourse {
  id: string;
  main_title: string;
  category_id: string;
  level_id: string;
  course_thumbnail: string;
  course_type: string;
  publish: boolean;
  create_at: string;
  updated_at: string;
}

export default function InstructorPage({ user }: { user: any }) {
  const { data, refetch, error } = useQuery(GET_USER_UPLOADED, {
    variables: { user_id: user?.id },
    skip: !user?.id,
  });
  const courses: ICourse[] = data?.getUserUploadedCourses;
  console.log(courses, error);
  // Calculate the percentage
  const totalCourses = courses ? courses.length : 0;

  const publishedCourses = courses
    ? courses.filter((course) => course.publish === true).length
    : 0;

  const percentage =
    totalCourses > 0 ? (publishedCourses / totalCourses) * 100 : 0;

  //router
  const route = useRouter();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6 mx-auto loopple-min-height-78vh text-slate-500">
      <div className="flex flex-wrap -mx-3 mb-5 removable">
        <div className="w-full px-3 mb-6 lg:w-8/12">
          <div className="relative flex flex-col break-words min-w-0 bg-clip-border rounded-xl bg-violet-500/50 mb-5">
            {/* card body */}
            <div className="flex-auto block py-8 px-6 lg:px-9 bg-gradient-to-r from-violet-500/60 to-white">
              <div className="m-0 z-20 relative">
                <div className="relative z-20 text-2xl lg:text-3xl font-mono text-white w-full lg:w-3/4">
                  {user?.given_name} {user?.family_name}
                </div>
                <p className="mb-7 text-white">
                  We are happy to see you again.
                </p>
                <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row">
                  <Dialog>
                    <DialogTrigger className="py-2 text-black ">
                      Whats new
                    </DialogTrigger>
                    <DialogContent className="bg-black/70 text-violet-500">
                      <DialogHeader>
                        <DialogTitle>Here&apos;s whats new!!</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          <h3 className="font-bold mb-4">Courses</h3>
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 mb-5">
            {/* card header */}
            <div className="px-6 lg:px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-lg lg:text-xl/tight text-dark">
                <span className="mr-3 font-thin text-dark">
                  Uploaded Courses
                </span>
              </h3>
              <Button size={"sm"} onClick={() => refetch()}>
                refresh
              </Button>
            </div>
            {/* end card header */}
            {/* card body */}
            <div className="flex-auto block py-8 pt-6 px-6 lg:px-9">
              <div className="overflow-x-auto">
                {/* from here */}
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  <thead className="align-bottom">
                    <tr className="font-mono text-sm lg:text-[0.95rem] text-secondary-dark">
                      <th className="pb-3 text-start min-w-[150px] lg:min-w-[175px]">
                        COURSE
                      </th>
                      <th className="pb-3 text-center min-w-[80px] lg:min-w-[100px]">
                        CATEGORY
                      </th>
                      <th className="pb-3 text-center min-w-[80px] lg:min-w-[100px]">
                        TYPE
                      </th>
                      <th className="pb-3 pr-8 lg:pr-12 text-center min-w-[150px] lg:min-w-[175px]">
                        PUBLISHED
                      </th>
                      <th className="pb-3 pr-8 lg:pr-12 text-center min-w-[80px] lg:min-w-[100px]">
                        UPLOADED
                      </th>
                      <th className="pb-3 text-end min-w-[50px]">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses &&
                      courses.map((course) => (
                        <tr
                          key={course.id}
                          className="border-b border-dashed last:border-b-0"
                        >
                          <td className="p-3 pl-0">
                            <div className="flex items-center">
                              <div className="relative inline-block shrink-0 rounded-2xl mr-3">
                                <Image
                                  width={50}
                                  height={50}
                                  src={
                                    course.course_thumbnail
                                      ? course.course_thumbnail
                                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWdwRcfe7k_08XvavaV2sWeSTamozq7Hxeg&s"
                                  }
                                  className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                  alt="Add"
                                />
                              </div>
                              <div className="flex flex-col justify-start">
                                <a
                                  href={`/course/${course.id}`}
                                  className="mb-1 font-extralight text-normal text-secondary-inverse hover:text-violet-500 hover:underline"
                                >
                                  {course.main_title
                                    ? course.main_title
                                    : course.id}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 pr-0 text-center">
                            <span className="font-extralight text-light-inverse text-md/normal">
                              {course.category_id}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-center font-extralight">
                            {course.course_type}
                          </td>
                          <td className="p-3 pr-8 lg:pr-12 text-end">
                            <span
                              className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-extralight leading-none rounded-lg`}
                            >
                              {course.publish === true ? "TRUE" : "FALSE"}
                            </span>
                          </td>
                          <td className="p-3 pr-8 lg:pr-0 text-center">
                            <span className="font-extralight text-light-inverse text-md/normal">
                              {course.updated_at
                                ? timeago.format(course.updated_at)
                                : timeago.format(course.create_at)}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                route.push(`/mycourse/${course.id}`)
                              }
                            >
                              <DirectRight size="16" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* to here */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-3 mb-6 lg:w-4/12">
          <div className="relative flex flex-col min-w-0 break-words border-0 bg-clip-border rounded-2xl mb-5 bg-gradient-to-r from-white to-violet-500/50">
            {/* card header */}
            <div className="px-6 lg:px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <div className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-lg lg:text-xl text-dark">
                {/*begin::Amount*/}
                <span className="text-dark text-4xl lg:text-5xl font-semibold mr-2 tracking-[-0.115rem]">
                  {courses ? courses.length.toString() : "0"}
                </span>
                {/*end::Amount*/}
                {/*begin::Subtitle*/}
                <span className="pt-1 font-medium text-dark text-lg">
                  Courses Uploaded
                </span>
                {/*end::Subtitle*/}
              </div>
            </div>
            {/* card body */}
            <div className="flex items-end flex-auto py-8 pt-0 px-6 lg:px-9">
              {/*begin::Progress*/}
              <div className="flex flex-col items-center w-full mt-3">
                <div className="flex justify-between w-full mt-auto mb-2 font-mono text-dark text-lg/normal">
                  <span className="mr-4 text-dark">
                    {courses
                      ? courses
                          .filter((course) => course.publish === true)
                          .length.toString()
                      : "0"}
                  </span>
                  <span>{percentage.toFixed(2)}% published!</span>
                </div>
                <Progress
                  className=" bg-black w-[80%]"
                  value={
                    parseFloat(percentage.toFixed(2)) === 0
                      ? 10
                      : parseFloat(percentage.toFixed(2))
                  }
                />
              </div>
              {/*end::Progress*/}
            </div>
          </div>
          {/* end card body */}
          <h3 className="font-mono mb-5 text-xl">Activity</h3>
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 mb-5">
            {/* card body */}
            <div className="flex-auto block py-8 pt-6 px-6 lg:px-9">
              <Chart courses={courses} />
            </div>
            {/* end card body */}
          </div>
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
            {/* card header */}
            <div className="px-6 lg:px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <div className="flex flex-col m-2 ml-0">
                {/*begin::Amount*/}
                <span className="text-4xl lg:text-5xl tracking-[-0.115rem] font-semibold text-dark mr-2">
                  529
                </span>
                {/*end::Amount*/}
                {/*begin::Subtitle*/}
                <span className="pt-1 font-medium text-secondary-dark text-lg">
                  Attendees
                </span>
                {/*end::Subtitle*/}
              </div>
            </div>
            {/* card body */}
            <div className="flex flex-col justify-between flex-auto py-8 px-6 lg:px-9">
              <span className="block mb-2 font-bold text-lg text-secondary-inverse">
                Top Performers
              </span>
              <div className="flex flex-wrap items-center ml-[10px]">
                {/*begin::User*/}
                <div
                  className="group inline-block rounded-full relative z-0 hover:z-10 -ml-[10px] transition-all duration-300 ease-in-out cursor-pointer shrink-0"
                  data-bs-toggle="tooltip"
                  aria-label="Emma Smith"
                  data-kt-initialized="1"
                  data-original-title=""
                  title=""
                >
                  <Image
                    width={50}
                    height={50}
                    alt="Pic"
                    className="w-[35px] h-[35px] rounded-full inline-block shrink-0 border-2 border-white/50"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg"
                  />
                  <span className="absolute z-10 self-center hidden px-4 py-3 mb-2 text-sm text-center transform -translate-x-1/2 bg-white shadow-sm whitespace-nowrap rounded-2xl left-1/2 bottom-full text-dark group-hover:block">
                    {" "}
                    Alex Kenzie{" "}
                  </span>
                </div>
                {/*begin::User*/}
                {/*begin::User*/}
                {/*begin::User*/}
                <div
                  className="group inline-block rounded-full relative z-0 hover:z-10 -ml-[10px] transition-all duration-300 ease-in-out cursor-pointer shrink-0"
                  data-bs-toggle="tooltip"
                  data-kt-initialized="1"
                  data-original-title=""
                  title=""
                >
                  <span className="relative flex items-center justify-center text-sm font-semibold bg-dark text-secondary border-2 border-white/50 w-[35px] h-[35px] rounded-full shrink-0">
                    +9
                  </span>
                  <span className="absolute z-10 self-center hidden px-4 py-3 mb-2 text-sm text-center transform -translate-x-1/2 bg-white shadow-sm whitespace-nowrap rounded-2xl left-1/2 bottom-full text-dark group-hover:block">
                    {" "}
                    +9 others{" "}
                  </span>
                </div>
                {/*begin::User*/}
              </div>
            </div>
            {/* end card body */}
          </div>
        </div>
      </div>
    </div>
  );
}
