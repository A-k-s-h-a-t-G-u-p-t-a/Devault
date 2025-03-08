"use client";

import Link from "next/link"; // Correct import for navigation
import { FaEthereum } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  logo: string;
  technologies: { name: string }[];
  issues: number;
  cryptoReward: number;
  owner: string;
  repo: string;
}

export default function ProjectCard({
  title,
  description,
  logo,
  technologies,
  issues,
  cryptoReward,
  owner,
  repo,
}: ProjectCardProps) {
  return (
    <div className="relative bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-80 h-80 mx-auto flex flex-col justify-between transition-transform hover:scale-[1.03] hover:shadow-2xl">
      <div className="flex items-center space-x-4">
        <img src={logo} alt={title} className="w-12 h-12 rounded-lg shadow-md" />
        <h3 className="text-lg font-bold truncate w-full">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{description}</p>
      <div className="flex gap-2 flex-wrap mb-3">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md"
          >
            {tech.name}
          </span>
        ))}
      </div>
      <div className="flex justify-between text-sm mb-3">
        <span>{issues} Open Issues</span>
        <span className="flex items-center gap-1">
          <FaEthereum className="text-yellow-400" /> {cryptoReward} ETH
        </span>
      </div>
      <Link href={`/project-details/${owner}/${repo}`} className="w-full">
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all shadow-md">
          View Project
        </button>
      </Link>
    </div>
  );
}
