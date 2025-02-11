"use client"; // Required if using Next.js App Router and client features

import Hoverboard from "./crowdfunding";
import ProjectCard from "./project-card";

export default function Home() {
  const projects = [
    {
      title: "Project Alpha",
      description: "An innovative blockchain-based solution.",
      logo: "/logo1.png",
      technologies: [{ name: "React" }, { name: "Solidity" }],
      issues: 5,
      cryptoReward: 2.5,
    },
    {
      title: "Project Beta",
      description: "AI-driven analytics platform.",
      logo: "/logo2.png",
      technologies: [{ name: "Python" }, { name: "TensorFlow" }],
      issues: 3,
      cryptoReward: 1.8,
    },
  ];

  const hoverboardProjects = [
    {
      title: "CrowdFunded AI Tool",
      description: "A tool that enhances AI workflows with crowdfunding support.",
      tags: ["AI", "Blockchain"],
      funding: "5.2",
      issues: 2,
      progress: 75,
    },
    {
      title: "Decentralized Storage",
      description: "Secure and private file storage system on the blockchain.",
      tags: ["Storage", "Web3"],
      funding: "3.0",
      issues: 4,
      progress: 50,
    },
    {
      title: "AI-powered Code Assistant",
      description: "An AI that helps developers write better code.",
      tags: ["AI", "Developer Tools"],
      funding: "4.0",
      issues: 3,
      progress: 60,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Crowdfunded Projects
        </h2>
        <div className="relative h-[280px]">
          <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory px-4 no-scrollbar h-full">
            {hoverboardProjects.map((project, index) => (
              <div key={index} className="flex-shrink-0 w-full max-w-2xl snap-start">
                <Hoverboard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-10 border-gray-700" />
      
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
