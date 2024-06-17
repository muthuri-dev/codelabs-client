import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import { SearchNormal1, Notification, BookSaved } from "iconsax-react";
import PageContent from "@/layout/PageContent";
import { Button } from "@/components/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MyCourse from "@/views/MyCourse";

export default async function page({
  params,
}: {
  params: { course_id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent className="flex gap-4">
          <div className="border rounded-full w-10 h-10 flex justify-center items-center">
            <BookSaved size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">Edit course</h1>
            <p className="text-xs font-medium text-gray-500">
              Add all that matters to your course and publish
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
        {/* <div className="flex min-w-full bg-blue-900 mx-auto p-4 sm:p-6 lg:p-8 rounded-lg"> */}
        <MyCourse user={user} course_id={params.course_id} />
        {/* </div> */}
      </PageContent>
    </DashboardLayout>
  );
}
