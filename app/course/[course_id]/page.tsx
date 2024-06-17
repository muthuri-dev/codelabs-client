import React from "react";
import { Button } from "@/components/button";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import {
  Add,
  CalendarEdit,
  DirectNotification,
  SearchNormal1,
  Teacher,
} from "iconsax-react";
import Image from "next/image";
import PageContent from "@/layout/PageContent";
import CoursePage from "@/views/CoursePage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CourseFooter from "@/views/CourseFooter";

export default async function page({
  params,
}: {
  params: { course_id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  //const handleourseTitle = (title: string) => {};

  return (
    <div className="h-screen w-screen flex flex-col">
      <PageNavbar>
        <PageNavbarLeftContent>
          <Teacher size="20" />
          <div className="">
            <p className="text-sm font-semibold text-gray-800">The Course</p>
            <p className="text-xs font-medium text-gray-500">Enjoy learning</p>
          </div>
        </PageNavbarLeftContent>

        <PageNavbarRightContent>
          <PageNavbarIconButton className="all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg">
            <SearchNormal1 size={16} />
          </PageNavbarIconButton>

          <PageNavbarIconButton className="all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg">
            <DirectNotification size={16} />
          </PageNavbarIconButton>

          <Button variant="outline">
            <CalendarEdit size={16} />
            <span className="hidden md:inline">Schedule</span>
          </Button>

          <PageNavbarPrimaryButton className="h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center">
            <Add size={16} />
            <span className="hidden md:inline">Create request</span>
          </PageNavbarPrimaryButton>
        </PageNavbarRightContent>
      </PageNavbar>

      <div className="flex-grow flex flex-col relative">
        <PageContent>
          <div
            className="absolute inset-0 flex"
            style={{ top: "0", bottom: "20vh" }}
          >
            <CoursePage course_id={params.course_id} />
          </div>
        </PageContent>
      </div>

      <div className="bg-gray-50 fixed bottom-0 h-[20vh] w-full px-10 overflow-x-hidden">
        <CourseFooter course_id={params.course_id} user={user} />
      </div>
    </div>
  );
}
