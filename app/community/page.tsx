import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import { Add, Notification, Profile2User, SearchNormal1 } from "iconsax-react";
import PageContent from "@/layout/PageContent";
import { Button } from "@/components/button";
import Community from "@/views/Community";
import DashboardLayout from "@/layout/DashboardLayout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Teams() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DashboardLayout user={user}>
      <div className="text-gray-500 w-full">
        <PageNavbar>
          <PageNavbarLeftContent>
            <div className="flex justify-center items-center border rounded-full w-10 h-10 all-center">
              <Profile2User size={18} />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-800">Community</h1>
              <p className="text-xs font-medium">
                Collaborate within your app&apos;s community
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
          {/* header */}
          <div
            className={`text-sm md:pb-2 flex items-center justify-between ${
              user ? "" : "blur-md"
            }`}
          >
            <div>
              <h1 className="text-gray-800 font-medium">
                Available community members
              </h1>
              <p className="text-xs">Follow and chat with community members</p>
            </div>

            <div className="flex gap-2">
              <Button variant="default">
                <Add size={16} />
                Invite member
              </Button>
            </div>
          </div>

          <hr className="-mx-4" />

          <Community />
        </PageContent>
      </div>
    </DashboardLayout>
  );
}

export default Teams;
