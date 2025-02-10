// how to use it :
// import ProjectCard from '../components/projectcard';
// <ProjectCard
//   title="DeFi Protocol"
//   description="Decentralized finance protocol for crypto trading"
//   tags={["React", "Solidity", "Node.js"]}
//   funding="5.0"
//   issues={12}
//   progress={75}
// />

"use client"
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  funding: string;
  issues: number;
  progress: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  funding,
  issues,
  progress,
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
      {/* Project Thumbnail */}
      <div className="w-14 h-14 bg-gray-700 rounded-lg mb-4"></div>

      {/* Title & Description */}
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-400 text-sm mb-3">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Funding & Issues */}
      <div className="flex justify-between text-sm mb-3">
        <span>{funding} ETH</span>
        <span>{issues} Open Issues</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <span className="text-sm">Funding Progress</span>
        <div className="w-full bg-gray-800 rounded-full h-3 mt-1 relative">
          <div
            className="bg-purple-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* View Project Button */}
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 mt-2 rounded-lg transition-all">
        View Project
      </button>
    </div>
  );
}


