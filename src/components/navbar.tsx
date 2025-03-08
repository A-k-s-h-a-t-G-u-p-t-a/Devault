"use client";

import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide flex">
        <Image src="/assets/logo3.png" alt="Devault Logo" width={40} height={40} className="mr-2" />
          <a href="/home" className="hover:text-gray-400 transition duration-300">Devault</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <a href="/home" className="hover:text-gray-400 transition duration-300">Projects</a>
          <a href="/community" className="hover:text-gray-400 transition duration-300">Community</a>
          <a href="/campaigns" className="hover:text-gray-400 transition duration-300">Campaigns</a>
        </div>

        {/* Search Bar & Profile */}
        <div className="hidden md:flex items-center space-x-6">
          <SignedIn>
            <div className="bg-gray-800 p-2 rounded-lg w-64 flex items-center shadow-md">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-transparent outline-none text-white px-2 w-full"
              />
            </div>
            <a href="/dashboard" className="hover:text-gray-400 transition duration-300">Dashboard</a>
            <UserButton afterSignOutUrl="/" />
            <ConnectButton client={client} />
          </SignedIn>
          
          <SignedOut>
            <a href="/sign-in" className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-700 transition duration-300">Sign In</a>
            <a href="/sign-up" className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">Sign Up</a>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-6 mt-4 text-lg">
          <a href="/projects" className="hover:text-gray-400 transition duration-300">Projects</a>
          <a href="/community" className="hover:text-gray-400 transition duration-300">Community</a>
          <a href="/campaigns" className="hover:text-gray-400 transition duration-300">Campaigns</a>
          
          <SignedIn>
            <div className="flex bg-gray-800 p-2 rounded-lg w-64 shadow-md">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-transparent outline-none text-white px-2 w-full"
              />
            </div>
            <a href="/dashboard" className="hover:text-gray-400 transition duration-300">Dashboard</a>
            <UserButton afterSignOutUrl="/" />
            <ConnectButton client={client} />
          </SignedIn>
          
          <SignedOut>
            <a href="/sign-in" className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-700 transition duration-300">Sign In</a>
            <a href="/sign-up" className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">Sign Up</a>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}