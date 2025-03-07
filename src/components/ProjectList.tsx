"use client";
import { useEffect, useState } from "react";

export default function ProjectList() {
  interface Project {
    id: number;
    title: string;
    stars: number;
    githubRepoUrl: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">GitHub Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="border p-2 my-2 rounded">
              <a href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                {project.title} ⭐ {project.stars}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
