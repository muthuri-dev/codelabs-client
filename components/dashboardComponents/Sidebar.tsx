"use client";

import Image from "next/image";
import {
  BookSaved,
  Bookmark,
  Element3,
  Headphone,
  Messages2,
  People,
  Profile2User,
  Setting2,
  Setting4,
  Teacher,
} from "iconsax-react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useCentralStore } from "@/store/central.store";
import React from "react";
import { CloudUpload } from "lucide-react";

export const sideBarLinks = [
  { id: 1, url: "/dashboard", icon: Element3, value: "Dashboard" },
  { id: 2, url: "/courses", icon: BookSaved, value: "Courses" },
  { id: 3, url: "/discussions", icon: People, value: "Discussions" },
  { id: 4, url: "/bookmarks", icon: Bookmark, value: "Bookmarks" },
  { id: 5, url: "/upload", icon: CloudUpload, value: "Upload" },
  { id: 6, url: "/instructor", icon: Teacher, value: "Instructor" },
  { id: 7, url: "/chats", icon: Messages2, value: "Chats" },
  { id: 8, url: "/integrations", icon: Setting4, value: "Integrations" },
  { id: 9, url: "/community", icon: Profile2User, value: "Community" },
];

function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const { setIsSidebarOpen, isSidebarOpen } = useCentralStore();
  return (
    <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden z-50">
      <div className="w-full h-full bg-white border-r">
        {/* logo */}
        <div className="p-2 flex cursor-pointer items-center gap-2">
          <Image src="/whitebg.png" alt="logo" height={100} width={100} />
        </div>

        {/* section divider */}
        <hr className="bg-gray-400 mx-2" />

        {/* other section */}
        <div className="flex flex-col h-full justify-between">
          {/* top */}
          <div className="pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-xs">
            {sideBarLinks.map((sidebar) => (
              <Link
                key={sidebar.id}
                href={sidebar.url}
                className={`flex ${
                  pathname === sidebar.url ? "text-violet-500/60" : ""
                } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
              >
                <sidebar.icon variant="Outline" size={16} />
                {sidebar.value}
              </Link>
            ))}
          </div>

          <div>
            <div className="text-gray-500 text-xs font-medium md:px-2">
              <Link
                href={"/settings"}
                className={`flex ${
                  pathname === "/settings" ? "text-violet-500/60" : ""
                } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
              >
                <Setting2 size={16} />
                Settings
              </Link>

              <Link
                href={"/support"}
                className={`flex ${
                  pathname === "/support" ? "text-primary" : ""
                } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
              >
                <Headphone size={16} />
                Support
              </Link>
            </div>

            <hr className="bg-gray-400 mx-2 my-4" />

            {/* bottom */}
            <div className="flex pb-28 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200">
              <div className="flex items-center gap-2">
                <Image
                  src={user?.picture}
                  alt="User"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div className="">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.given_name} {user?.family_name}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const NavbarLink = ({ href, active }: { href: string; active: boolean }) => {
  return <Link href={href}></Link>;
};

const NavLink = React.forwardRef<
  LinkProps,
  React.ComponentPropsWithoutRef<"a">
>(({ className, href, ...props }) => (
  <Link
    href={href!}
    className={`flex ${
      window.location.pathname === href! ? "text-violet-500/60" : ""
    } hover:px-8 duration-200 rounded-md w-full py-2 px-6 items-center gap-2`}
    {...props}
  />
));
NavLink.displayName = "NavLink";

export default Sidebar;
