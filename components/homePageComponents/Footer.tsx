import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white py-6">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-gray-500">
          © {new Date().getFullYear()} codelabs, Inc. All rights reserved.
        </div>
        <div className="flex space-x-3">
          <Link
            href="https://github.com/muthuri-dev"
            className="text-gray-400 hover:text-gray-500"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://x.com/muthuri_dev"
            className="text-gray-400 hover:text-gray-500"
          >
            <Twitter size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/muthuri/"
            className="text-gray-400 hover:text-gray-500"
          >
            <Linkedin size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
