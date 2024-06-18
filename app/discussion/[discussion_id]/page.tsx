import Discussion from "@/views/Discussion";
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

export default async function page({
  params,
}: {
  params: { discussion_id: string };
}) {
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
        <Discussion discussion_id={params.discussion_id} user={user} />
      </PageContent>
    </DashboardLayout>
  );
}
