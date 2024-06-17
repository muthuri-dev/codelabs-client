import DashboardLayout from "@/layout/DashboardLayout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
  Teacher,
} from "iconsax-react";
import { Button } from "@/components/button";
import PageContent from "@/layout/PageContent";
import Courses from "@/views/Courses";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent>
          <Teacher size="20" />
          <div className="">
            <p className="text-sm font-semibold text-gray-800">Courses</p>
            <p className="text-xs font-medium text-gray-500">
              Explore variety of categories
            </p>
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
        <Courses user={user} />
      </PageContent>
    </DashboardLayout>
  );
}
