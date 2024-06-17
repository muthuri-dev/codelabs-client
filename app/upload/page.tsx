import CourseUpload from "@/views/CourseUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import DashboardLayout from "@/layout/DashboardLayout";
import PageContent from "@/layout/PageContent";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SearchNormal1, Notification } from "iconsax-react";
import { CloudUpload } from "lucide-react";
import React from "react";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent>
          <div className="border rounded-full w-10 h-10 flex justify-center items-center">
            <CloudUpload size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">
              Upload course
            </h1>
            <p className="text-xs font-medium text-gray-500">
              Come up with interesting topic and write in details
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
        <Tabs defaultValue="step1" className="w-full overflow-x-hidden">
          <TabsList>
            <TabsTrigger value="step1">Plan a course</TabsTrigger>
            <TabsTrigger value="step2">Create course</TabsTrigger>
            <TabsTrigger value="step3">Create a course now</TabsTrigger>
          </TabsList>
          <TabsContent value="step1">Planing course</TabsContent>
          <TabsContent value="step2">How to create</TabsContent>
          <TabsContent value="step3">
            <div className="flex justify-center content-center items-center md:hidden">
              Use a tablet or computer to create a course
            </div>
            <div className="hidden md:block">
              <CourseUpload user={user} />
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </DashboardLayout>
  );
}
