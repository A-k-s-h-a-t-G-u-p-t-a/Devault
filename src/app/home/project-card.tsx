"use client"
import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  logo: string;
  technologies: { name: string }[];
  issues: number;
  cryptoReward: number;
}

export default function ProjectCard({
  title,
  description,
  logo,
  technologies,
  issues,
  cryptoReward,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-gray-900 text-white p-6 rounded-2xl shadow-lg transform transition-all w-80 h-72 mx-auto ${
        isHovered ? "scale-105 shadow-2xl" : "scale-100 shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Logo & Title */}
      <div className="flex items-center mb-4">
        <img src={logo} alt={title} className="w-10 h-10 rounded-lg mr-3" />
        <h3 className="text-lg font-bold truncate w-full">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-3 truncate">{description}</p>

      {/* Technologies */}
      <div className="flex gap-2 mb-3">
        {technologies.map((tech) => (
          tech.name
        ))}
      </div>

      {/* Issues & Crypto Reward */}
      <div className="flex justify-between text-sm mb-3">
        <span>{issues} Open Issues</span>
        <span className="flex items-center gap-1">
          <FaEthereum className="text-yellow-400" /> {cryptoReward} ETH
        </span>
      </div>

      {/* View Project Button */}
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 mt-2 rounded-lg transition-all">
        View Project
      </button>
    </div>
  );
}