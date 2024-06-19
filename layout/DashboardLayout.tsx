"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/dashboardComponents/Sidebar";
import { useCentralStore } from "@/store/central.store";
import { ScrollArea } from "@/components/scroll-area";

import useWindowSize from "@/hooks/useWindowSize";

const DashboardLayout = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useCentralStore();

  //screen size responsiveness
  const { width } = useWindowSize();

  const bodyWidth = width && width > 60 ? `${width - 250}px` : "100%";
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isSidebarOpen ? "overflow-hidden" : ""} h-screen`}
    >
      {/* backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsSidebarOpen(false)}
            className="bg-black/60 absolute top-0 left-0 md:hidden w-full h-screen z-20"
          />
        )}
      </AnimatePresence>

      {/* mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
            className="absolute md:hidden z-50 bg-white top-0 left-0"
          >
            <Sidebar user={user} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 fixed w-screen overflow-x-hidden">
        <div className="hidden md:block flex-none">
          <Sidebar user={user} />
        </div>
        <ScrollArea className="sm:flex md:hidden w-full h-screen">
          <div
            className={`md:hidden flex-1 overflow-x-auto max-w-[1440px] mx-auto md:pr-96 sm:w-screen `}
          >
            {children}
          </div>
        </ScrollArea>
        <ScrollArea className="hidden md:block w-full h-screen">
          <div
            className={`flex-1 overflow-x-auto max-w-[1440px] mx-auto md:pr-96 sm:w-screen `}
            style={{ width: bodyWidth }}
          >
            {children}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
