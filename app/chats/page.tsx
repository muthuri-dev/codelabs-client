import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import { SearchNormal1, Setting4, Notification } from "iconsax-react";
import PageContent from "@/layout/PageContent";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Chat from "@/views/Chat";

export const dynamic = "force-dynamic";
export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  //console.log(user);
  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent className="flex gap-4 mr-48 lg:mr-96">
          <div className=" flex justify-center items-center border rounded-full w-10 h-10 all-center ">
            <Setting4 size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">Chat</h1>
            <p className="text-xs font-medium text-gray-500">
              Connect with community member
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
        <Chat user={user} />
      </PageContent>
    </DashboardLayout>
  );
}
