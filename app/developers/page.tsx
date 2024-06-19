import { Button } from "@/components/button";
import Footer from "@/components/homePageComponents/Footer";
import LandingPageNavbar from "@/components/homePageComponents/LandingPageNavbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Star1 } from "iconsax-react";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const user = await getUser();
  return (
    <>
      <LandingPageNavbar authenticated={authenticated} user={user} />
      <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-indigo-700 text-4xl font-mono font-manrope leading-normal lg:text-start text-center">
                      The Tale of Our Achievement Story
                    </h2>
                    <p className="text-gray-500 text-base font-extralight leading-relaxed lg:text-start text-center">
                      Our platform thrives on the spirit of collaboration and
                      the collective efforts of passionate developers from
                      around the world. We believe in the power of open source
                      to drive innovation and create tools that benefit
                      everyone.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="flex py-2 px-4 gap-3">
                <Star1 variant="Outline" className="animate-spin" />
                <Link href="https://github.com/muthuri-dev/codelabs-client">
                  star project
                </Link>
                <Github />
              </Button>
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                <Image
                  className="sm:mt-5 sm:ml-5 w-full h-full"
                  src="https://pagedone.io/asset/uploads/1717742431.png"
                  alt="about Us image"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
