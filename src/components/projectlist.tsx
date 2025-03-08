"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description?: string;
  fundingGoal?: number;
  currentFunding?: number;
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
          className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700 transition-transform hover:scale-105"
        >
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="text-gray-400 mt-2">{project.description || "No description provided."}</p>
          
          <div className="mt-4">
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

          <button className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition">
            View Project →
          </button>
        </div>
      ))}
    </div>
  );
}
