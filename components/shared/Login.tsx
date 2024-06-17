import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../button";

export default function Login({
  authenticated,
  user,
}: {
  authenticated: any;
  user: any;
}) {
  return (
    <>
      {authenticated ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.picture} />
              <AvatarFallback>
                {user?.given_name.charAt(0).toUpperCase()}
                {user?.family_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">
                  {user?.given_name} {user?.family_name}
                </h4>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <div className="space-x-4">
          <Button variant={"default"}>
            <RegisterLink>Register</RegisterLink>
          </Button>
          <LoginLink>
            Log in <span aria-hidden="true">&rarr;</span>
          </LoginLink>
        </div>
      )}
    </>
  );
}
