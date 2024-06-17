"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./prismadb";

export async function PostData(formData: FormData) {
  "use server";
  const Pusher = require("pusher");
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const message = formData.get("message");
  const data = await prisma.message.create({
    data: {
      message: message as string,
      user_id: user?.id,
    },
    include: {
      user: {
        select: {
          username: true,
          profile_image: true,
        },
      },
    },
  });

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "mt1",
    useTLS: true,
  });

  await pusher.trigger("codelabs", "chat", {
    message: `${JSON.stringify(data)}\n\n`,
  });
}
