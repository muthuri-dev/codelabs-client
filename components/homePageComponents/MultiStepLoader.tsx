"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "../multi-step-loader";
//import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  {
    text: "Get started on lab",
  },
  {
    text: "Intructor dashboard",
  },
  {
    text: "Title for the course",
  },
  {
    text: "Select category",
  },
  {
    text: "Create interesting course",
  },
  {
    text: "Save for later edit",
  },
  {
    text: "Edit the course",
  },
  {
    text: "Pulish for the community",
  },
];

export function MultiStepLoader() {
  const [loading] = useState(true);
  return (
    <div className="w-[250px] h-[250px] flex items-center justify-center overflow-hidden ">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
    </div>
  );
}
