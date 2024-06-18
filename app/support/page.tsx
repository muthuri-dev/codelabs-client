import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import { SearchNormal1, Notification, Headphone } from "iconsax-react";
import PageContent from "@/layout/PageContent";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Email from "@/components/shared/Email";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent className="flex gap-4 mr-48 lg:mr-96">
          <div className=" flex justify-center items-center border rounded-full w-10 h-10 all-center ">
            <Headphone size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">Support</h1>
            <p className="text-xs font-medium text-gray-500">
              Get support you need using this application
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
        <>
          <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark">
            <div className="container mx-auto">
              <div className="flex flex-wrap items-center justify-between -mx-4">
                <div className="w-full px-4 lg:w-6/12">
                  <div className="flex items-center -mx-3 sm:-mx-4">
                    <div className="w-full px-3 sm:px-4 xl:w-1/2">
                      <div className="py-3 sm:py-4">
                        <Image
                          width={300}
                          height={300}
                          src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                          alt=""
                          className="w-full rounded-2xl"
                        />
                      </div>
                      <div className="py-3 sm:py-4">
                        <Image
                          src="https://i.ibb.co/rfHFq15/image-2.jpg"
                          alt=""
                          className="w-full rounded-2xl"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:px-4 xl:w-1/2">
                      <div className="relative z-10 my-4">
                        <Image
                          width={300}
                          height={300}
                          src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                          alt=""
                          className="w-full rounded-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                  <Email />
                </div>
              </div>
            </div>
          </section>
        </>
      </PageContent>
    </DashboardLayout>
  );
}
