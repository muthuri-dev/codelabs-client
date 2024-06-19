"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";
import { Input } from "../input";
import { toast } from "sonner";

export default function Email() {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm("service_9570qbs", "template_pm4lq0o", form.current, {
          publicKey: "bLffya3iNGYUv2_sG",
        })
        .then(
          () => {
            toast("Email sent");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };
  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
        Reach our technical support on any problem experience
      </h2>
      <form ref={form} onSubmit={sendEmail}>
        <Input
          type="email"
          name="from_email"
          placeholder="Type your email"
          className="p-6 border border-violet-600"
          required
        />
        <Textarea
          role="8"
          className="border border-violet-600 mt-4"
          name="message"
          required
          placeholder="Send your inquiries"
        ></Textarea>
        <Button size={"lg"} className="mt-5 ml-5" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
