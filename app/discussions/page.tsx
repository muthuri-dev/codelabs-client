import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import { Add, Notification, People, SearchNormal1 } from "iconsax-react";
import PageContent from "@/layout/PageContent";
import DashboardLayout from "@/layout/DashboardLayout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DiscussionsPage, { AddDiscussion } from "@/views/DiscussionsPage";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent>
          <div className="flex items-center justify-center border rounded-full w-10 h-10 all-center">
            <People size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">Discussions</h1>
            <p className="text-xs font-medium text-gray-500">
              Get treding news and discussions you can contribute
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
          <PageNavbarPrimaryButton>
            <Add size={16} />
            <span className="hidden md:inline">Discuss here</span>
          </PageNavbarPrimaryButton>
        </PageNavbarRightContent>
      </PageNavbar>

      <PageContent>
        <div
          className={`max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ${
            user ? "" : "blur-md"
          }`}
        >
          {/* Grid */}
          <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
            {/* Card */}
            <DiscussionsPage />
          </div>
          <div className="fixed bottom-0 sm:w-full md:w-[70%] bg-white">
            <AddDiscussion user={user} />
          </div>
        </div>
      </PageContent>
    </DashboardLayout>
  );
}
