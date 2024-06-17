import React from "react";
import { Button } from "../button";

export default function NewsLetter() {
  return (
    <div className="flex justify-evenly w-full mx-auto px-4 py-12 rounded-lg ">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-center sm:text-left mb-6 sm:mb-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Want product news and updates?
          </h2>
          <p className="text-gray-700">Sign up for our newsletter.</p>
        </div>
        <form className="flex justify-center items-center w-full gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto p-2 border border-gray-300 rounded-md "
          />
          <Button variant="default">Subscribe</Button>
        </form>
      </div>
    </div>
  );
}
