import DashboardLayout from "@/layout/DashboardLayout";
import PageContent from "@/layout/PageContent";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import InstructorPage from "@/views/InstructorPage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SearchNormal1, Notification, Teacher } from "iconsax-react";
import React from "react";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent>
          <div className="border rounded-full w-10 h-10 flex justify-center items-center">
            <Teacher size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">
              Instructor Dashboard
            </h1>
            <p className="text-xs font-medium text-gray-500">
              Get course analytics here
            </p>
          </div>
        </PageNavbarLeftContent>

        <PageNavbarRightContent>
          <PageNavbarIconButton>
            <SearchNormal1 size={16} />
          </PageNavbarIconButton>
          <PageNavbarIconButton>
            <Notification size={16} />
          </PageNavbarIconButton>
        </PageNavbarRightContent>
      </PageNavbar>
      <PageContent>
        <InstructorPage user={user} />
      </PageContent>
    </DashboardLayout>
  );
}
