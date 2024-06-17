import prisma from "@/lib/prismadb";
import DashboardPage from "@/views/DashboardPage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user?.id) {
    await getData({
      id: user.id as string,
      email: user?.email as string,
      family_name: user?.family_name as string,
      given_name: user?.given_name as string,
      profile_image: user?.picture as string,
    });
  }

  return <DashboardPage user={user} />;
}

async function getData({
  id,
  email,
  family_name,
  given_name,
  profile_image,
}: {
  id: string;
  email: string;
  family_name: string | null | undefined;
  given_name: string | null | undefined;
  profile_image: string | null | undefined;
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const username = `${given_name ?? ""} ${family_name ?? ""}`;
    await prisma.user.create({
      data: {
        id,
        email,
        username,
        profile_image,
      },
    });
  }
}
