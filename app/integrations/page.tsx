import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import { Add, Notification, SearchNormal1, Setting4 } from "iconsax-react";
import PageContent from "@/layout/PageContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import IntegrationsList from "@/views/Integrations";
import DashboardLayout from "@/layout/DashboardLayout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function Integrations() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent>
          <div className="flex items-center justify-center border rounded-full w-10 h-10 all-center">
            <Setting4 size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">
              Integrations
            </h1>
            <p className="text-xs font-medium text-gray-500">
              Manage your integrations to enhance workflow
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
            <span className="hidden md:inline">Add integration</span>
          </PageNavbarPrimaryButton>
        </PageNavbarRightContent>
      </PageNavbar>

      <PageContent>
        <Tabs defaultValue="All" className="w-full lg:p-10">
          <TabsList>
            <TabsTrigger value="All">All apps</TabsTrigger>
            <TabsTrigger value="Connected">Connected</TabsTrigger>
            <TabsTrigger value="Disconnected">Disconnected</TabsTrigger>
          </TabsList>
          <TabsContent value="All" className={`${user ? "" : "blur-md"}`}>
            <div className="text-sm">
              <h1 className="text-gray-800 font-medium">
                Available integrations
              </h1>
              <p className="text-xs text-gray-500">
                Access the integrated tools and apps ready
              </p>
            </div>

            <IntegrationsList />
          </TabsContent>
          <TabsContent value="Connected">
            Change your password here.
          </TabsContent>
          <TabsContent value="Disconnected">
            Change your password here.
          </TabsContent>
        </Tabs>
      </PageContent>
    </DashboardLayout>
  );
}

export default Integrations;
