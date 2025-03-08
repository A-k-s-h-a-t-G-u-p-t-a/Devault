"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description?: string;
  fundingGoal?: number;
  currentFunding?: number;
  githubRepoUrl?: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700 transition-transform hover:scale-105 flex flex-col justify-between h-full min-h-[320px]"
        >
          {/* Title */}
          <h2 className="text-xl font-bold">{project.title}</h2>

          {/* Description with flex-grow to balance layout */}
          <p className="text-gray-400 mt-2 flex-grow">
            {project.description || "No description provided."}
          </p>

          {/* Funding details */}
          <div>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Goal:</span> {project.fundingGoal ?? 0} ETH
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Balance:</span> {project.currentFunding ?? 0} ETH
            </p>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${((project.currentFunding ?? 0) / (project.fundingGoal ?? 1)) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {((project.currentFunding ?? 0) / (project.fundingGoal ?? 1) * 100).toFixed(2)}% funded
            </p>
          </div>

          {/* View Project Button */}
          {project.githubRepoUrl ? (
            <a
              href={project.githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full text-center bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition"
            >
              View Project →
            </a>
          ) : (
            <p className="mt-4 text-sm text-gray-500">No repository available</p>
          )}
        </div>
      ))}
    </div>
  );
}
