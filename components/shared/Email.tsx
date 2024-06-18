"use client";
import React from "react";

import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";
import { Input } from "../input";
import { sendEmail } from "@/utils/mail.utils";

export default function Email() {
  const [email, setEmail] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");

  const onSubmit = async () => {
    const values = { email, message };
    await sendEmail(values);
    setEmail("");
    setMessage("");
  };
  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
        Reach our technical support on any problem experience
      </h2>
      <Input
        type="text"
        placeholder="Type your email"
        className="p-6"
        value={email}
        required
        onChange={(event) => setEmail(event.target.value)}
      />
      <Textarea
        role="8"
        className="border border-violet-600 mt-4"
        value={message}
        required
        onChange={(event) => setMessage(event.target.value)}
      ></Textarea>
      <Button size={"lg"} className="mt-5" onClick={onSubmit}>
        Send
      </Button>
    </div>
  );
}
