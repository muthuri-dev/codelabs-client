import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import PageNavbar, {
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarRightContent,
} from "@/layout/PageNavbar";
import { SearchNormal1, Setting4, Notification } from "iconsax-react";
import PageContent from "@/layout/PageContent";
import Image from "next/image";
import { Button } from "@/components/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <DashboardLayout user={user}>
      <PageNavbar>
        <PageNavbarLeftContent className="flex gap-4 mr-48 lg:mr-96">
          <div className=" flex justify-center items-center border rounded-full w-10 h-10 all-center ">
            <Setting4 size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">
              Profile settings
            </h1>
            <p className="text-xs font-medium text-gray-500">
              Manage your profile settings to enhance public profile
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
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-4">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <div className="mt-4 mb-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="default" size="lg" className="mt-4">
                save
              </Button>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Payment accounts
              </h2>
              <p className="max-w-2xl text-sm text-gray-500">
                Connect accounts to your account, get paid and pay!.
              </p>
            </div>
            <div className="border-t border-gray-200 space-y-4">
              <div className="flex justify-between items-center py-4">
                <p className="text-sm text-gray-900">TD Canada Trust</p>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </div>
              <div className="flex justify-between items-center py-4">
                <p className="text-sm text-gray-900">Royal Bank of Canada</p>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </div>
              <div className="py-4">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  + Add another Payment
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              variant={"destructive"}
              size={"lg"}
              className="flex justify-end"
            >
              Logout
            </Button>
          </div>
        </form>
      </PageContent>
    </DashboardLayout>
  );
}
