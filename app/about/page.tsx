import { Button } from "@/components/button";
import Footer from "@/components/homePageComponents/Footer";
import LandingPageNavbar from "@/components/homePageComponents/LandingPageNavbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                <h2 className="text-gray-900 text-4xl font-momo font-manrope leading-normal lg:text-start text-center">
                  Building Stronger Communities through Collaboration and
                  Empowerment
                </h2>
                <p className="font-extralight">
                  Our mission is to create a vibrant and inclusive community for
                  tech enthusiasts, learners, and professionals. Whether you are
                  here to learn new skills, share your knowledge, or engage in
                  insightful discussions, our platform is designed to support
                  and empower you.
                </p>
                <h3 className="font-mono">Our vision</h3>
                <p className="font-extralight">
                  At Codelabs, we envision a world where knowledge is freely
                  accessible, and learning is a lifelong journey. We are
                  committed to fostering a community that values curiosity,
                  collaboration, and continuous improvement. By providing a
                  platform for learning and engagement, we hope to inspire and
                  empower the next generation of tech leaders.
                </p>
                <h3 className="font-mono">Join us</h3>
                <p className="font-extralight">
                  We invite you to be a part of our growing community. Whether
                  you’re here to learn, teach, or simply connect, your presence
                  adds value to our collective mission. Together, we can build
                  awesome community.
                </p>
              </div>
              <Button size={"lg"}>
                <Link
                  href="/dashboard"
                  className="px-1.5 text-white text-sm font-medium leading-6"
                >
                  Get Started
                </Link>
              </Button>
            </div>
            <Image
              className="lg:mx-0 mx-auto h-full"
              src="https://pagedone.io/asset/uploads/1717751272.png"
              alt="about Us image"
              height={400}
              width={400}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
