"use client";
import { AlignRight } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "../button";
import { Drawer, DrawerContent, DrawerTrigger } from "../drawer";
import Login from "../shared/Login";
import { TextalignRight } from "iconsax-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Developers", href: "/developers" },
];

export default function LandingPageNavbar({
  authenticated,
  user,
}: {
  authenticated: any;
  user: any;
}) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`sticky inset-x-0 top-0 z-50`}>
      <nav
        className={`flex items-center justify-between lg:px-8 ${
          isScrolled ? "bg-black/10 backdrop-blur" : "bg-transparent"
        }`}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only"></span>
            <Image src="/whitebg.png" height={100} width={100} alt="logo" />
          </a>
        </div>
        <div className="sm:flex lg:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant={"ghost"} className="flex md:hidden">
                <TextalignRight color="#8F00FF" variant="Outline" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col items-center top-0 -right-0 w-1/2 bg-white">
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-violet-500/60 hover:text-black "
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <Login authenticated={authenticated} user={user} />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Login authenticated={authenticated} user={user} />
        </div>
      </nav>
      <div className="lg:hidden"></div>
    </header>
  );
}
