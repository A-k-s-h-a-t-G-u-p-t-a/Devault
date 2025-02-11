"use client"
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  progress: number;
}

export default function Hoverboard({
  title,
  description,
  tags,
  progress,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative bg-gray-900 text-white p-6 rounded-2xl shadow-lg transform transition-all w-70 max-w-2xl h-15 mx-auto ${isHovered ? "scale-105 shadow-2xl" : "scale-100 shadow-lg"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Thumbnail & Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      
      {/* Description & Tags */}
      <p className="text-gray-400 text-sm mb-3 truncate">{description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-xs">
            {tag}
          </span>
        ))}
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
