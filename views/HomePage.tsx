"use client";
import React from "react";

import { PlaceholdersAndVanishInput } from "@/components/placeholders-and-vanish-input";
import { Button } from "@/components/button";
import { FlipWords } from "@/components/flip-words";
import {
  BookOpenText,
  CircleChevronRight,
  DollarSign,
  NotebookPen,
} from "lucide-react";
import { MultiStepLoader } from "@/components/homePageComponents/MultiStepLoader";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const placeholders = [
    "How do I start coding! am a biginner",
    "What is web development?",
    "How can I secure job in field of tech",
    "Can I get road map to guide me?",
    "How do I scale my application",
    "Is cloud computing easy to learn?",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const words = ["learn", "teach", "build", "earn"];
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8 ">
        <div className="mx-auto max-w-2xl py-3 sm:py-4 lg:py-6">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              We&apos;re changing the way you
              <span>
                <FlipWords words={words} /> <br />
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join CodeLab and start your journey towards becoming a coding
              expert.Empower Your Journey with Expert Mentorship, Interactive
              Courses, and a Thriving Community.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="/dashboard">
                <Button variant="default">Get started on lab</Button>
              </a>
              <Link
                href="https://github.com/muthuri-dev/codelabs-client"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                GitHub repo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* from here */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <BookOpenText className="text-violet-500/60 animate-pulse" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Learn from community experts
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                At CodeLab, access a wide range of coding courses, including
                many available for free. Learn interactively with hands-on
                exercises, real-time feedback, and expert mentorship. Join our
                community and enhance your coding skills today!
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <NotebookPen className="text-violet-500/60 animate-pulse" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Teach your area of expertise
              </h3>
              <MultiStepLoader />
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <DollarSign className="text-violet-500/60 animate-pulse" />
                <DollarSign className="text-violet-500/60 animate-pulse" />
                <DollarSign className="text-violet-500/60 animate-pulse" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Earn from teaching
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                At CodeLab, create and sell coding courses to earn a significant
                share of enrollment fees. Set your prices, publish your
                courses.Join us to start turning your expertise into earnings!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
              Designed by community for your growth.
            </h2>
            <p className="mb-4">
              Here at CodeLab we focus on revolutionizing the way you learn,
              teach, earn, and build by providing interactive coding courses,
              expert mentorship, and a vibrant community to support your growth
              every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              width={500}
              height={500}
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <Image
              width={500}
              height={500}
              className="mt-4 w-full rounded-lg lg:mt-10"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-thin text-gray-900 dark:text-white">
              Empowering people to
              <span className="font-extrabold text-violet-500"> learn </span>
              and join worldwide communities
            </h2>
            <p className="mb-4 font-light">
              At CodeLab, we believe in the power of education and community.
              Our platform offers diverse, interactive courses, many of which
              are free, to help you develop your coding skills. Connect with a
              global network of learners and experts, gain real-time feedback,
              and grow together. Join us to unlock your potential and be part of
              a vibrant, supportive community!
            </p>
            <Link href="/dashboard">
              <Button variant="default">
                Learn more on Lab
                <span className="ml-4">
                  <CircleChevronRight />
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Boost your productivity.
            </h1>
            <h2 className="text-4xl font-bold mb-2">
              Start using our app today.
            </h2>
            <p className="text-gray-600 mb-4 font-thin">
              Unlock your potential and streamline your workflow with our
              innovative app.
            </p>
            <div className="flex justify-center">
              <Link href="/dashboard">
                <Button variant="default">Get started →</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
