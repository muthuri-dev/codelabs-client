import { Github, Linkedin, Twitter } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white py-6">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-gray-500">
          © 2020 codelabs, Inc. All rights reserved.
        </div>
        <div className="flex space-x-3">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
