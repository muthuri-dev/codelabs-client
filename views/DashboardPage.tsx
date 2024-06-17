"use client";
import React from "react";
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
} from "iconsax-react";
import PageContent from "@/layout/PageContent";
import TraningAnalysis from "@/components/dashboardComponents/TrainingAnalysis";
import CourseProgress from "@/components/dashboardComponents/CourseProgress";
import EmployeeSpotlight from "@/components/dashboardComponents/EmployeeSpotlight";
import TimeTracker from "@/components/dashboardComponents/TimeTracker";
import Notes from "@/components/dashboardComponents/Notes";

import StatusTracker from "@/components/dashboardComponents/StatusTracker";
import CurrentProject from "@/components/dashboardComponents/CurrentProject";

import Image from "next/image";
import { Button } from "@/components/button";
import DashboardLayout from "@/layout/DashboardLayout";
import { useRouter } from "next/navigation";

function DashboardPage({ user }: { user: any }) {
  //login user after 5-seconds in the dashboard
  const route = useRouter();
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        route.push("/api/auth/login");
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [user, route]);

  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent>
          <Image
            src={user?.picture}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="">
            <p className="text-sm font-semibold text-gray-800">
              {user?.given_name} {user?.family_name}
            </p>
            <p className="text-xs font-medium text-gray-500">Welcome back</p>
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

      <PageContent>
        <div
          className={`space-y-4 columns-1 sm:columns-2 lg:columns-3 ${
            !user ? "blur-sm" : ""
          }`}
        >
          <div className="break-inside-avoid-column space-y-4">
            <TraningAnalysis />
          </div>

          <div className="break-inside-avoid-column space-y-4">
            <CourseProgress />
          </div>

          <div className="break-inside-avoid-column space-y-4">
            <EmployeeSpotlight />
          </div>

          <div className="break-inside-avoid-column space-y-4">
            <TimeTracker />
          </div>

          <div className="break-inside-avoid-column space-y-4">
            <Notes />
          </div>

          <div className="break-inside-avoid-column space-y-4">
            <StatusTracker />
          </div>

          <div className="break-inside-avoid-column space-y-4">
            <CurrentProject />
          </div>
        </div>
      </PageContent>
    </DashboardLayout>
  );
}

export default DashboardPage;
