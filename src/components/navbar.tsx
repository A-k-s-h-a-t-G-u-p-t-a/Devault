"use client"
import { useState } from "react";
import { Search, Menu, User } from "lucide-react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
        <a href="/home" className="hover:text-gray-400">Devault</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="/projects" className="hover:text-gray-400">Projects</a>
          <a href="/community" className="hover:text-gray-400">Community</a>
        </div>

        {/* Search Bar & Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="bg-gray-800 p-2 rounded-lg w-64 flex items-center">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent outline-none text-white px-2 w-full"
            />
          </div>
          <a href="/dashboard" className="hover:text-gray-400">
            <User size={24} />
          </a>
          <ConnectButton client={client}/>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <a href="#" className="hover:text-gray-400">Projects</a>
          <a href="#" className="hover:text-gray-400">Community</a>
          <div className="flex bg-gray-800 p-2 rounded-lg w-64">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent outline-none text-white px-2 w-full"
            />
          </div>
          <a href="/dashboard" className="hover:text-gray-400">
            <User size={24} />
          </a>
          <div>
            <ConnectButton client={client}/>
          </div>
        </div>
      )}
    </nav>
  );
}
