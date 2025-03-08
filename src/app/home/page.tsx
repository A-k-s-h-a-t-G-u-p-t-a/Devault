"use client";

import ProjectCard from "./project-card";

export default function Home() {
  const projects = [
    {
      title: "Eclair UI",
      description: "A beautiful UI kit for React.js developers.",
      logo: "/Ecliar.jpg",
      technologies: [{ name: "Python" }, { name: "TensorFlow" }],
      issues: 3,
      cryptoReward: 1.8,
      owner: "GopalVerma1303",
      repo: "EclairUI",
    },
    {
      title: "TextToSpeechAssistant",
      description: "A simple React.js project that converts text into speech.",
      logo: "/Texttos.jpg",
      technologies: [{ name: "React.js" }, { name: "Web Speech API" }],
      issues: 2,
      cryptoReward: 0.5,
      owner: "sparsh44",
      repo: "TextToSpeechAssistant",
    },
    {
      title: "Pathora",
      description: "A comprehensive career guidance platform for aspiring tech professionals.",
      logo: "/Pathora.jpg",
      technologies: [{ name: "React.js" }, { name: "Node.js" }],
      issues: 5,
      cryptoReward: 2.0,
      owner: "SUGAM-ARORA",
      repo: "Pathora",
    },
    {
      title: "ToolVa",
      description: "The ultimate AI tools directory with over 80 curated tools.",
      logo: "/Toolva.jpg",
      technologies: [{ name: "React" }, { name: "TypeScript" }, { name: "Supabase" }],
      issues: 4,
      cryptoReward: 1.2,
      owner: "SUGAM-ARORA",
      repo: "Toolva",
    },
    {
      title: "CodeCraft",
      description: "An interactive coding playground for web developers.",
      logo: "/GoScan.jpg",
      technologies: [{ name: "Next.js" }, { name: "Tailwind CSS" }],
      issues: 6,
      cryptoReward: 3.0,
      owner: "Unknown",
      repo: "CodeCraft",
    },
    {
      title: "AI Tutor",
      description: "An AI-powered personal tutor for coding and math.",
      logo: "/Divinora.jpg",
      technologies: [{ name: "Python" }, { name: "OpenAI API" }],
      issues: 4,
      cryptoReward: 2.3,
      owner: "Unknown",
      repo: "AITutor",
    },
    {
      title: "DevVault",
      description: "A decentralized platform for open-source collaboration.",
      logo: "/devvault-logo.png",
      technologies: [{ name: "Solidity" }, { name: "Ethereum" }],
      issues: 7,
      cryptoReward: 5.0,
      owner:"Unknown",
      repo: "DevVault",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Featured Projects Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .filter((project) => project.owner && project.repo) // Ensure navigation works
            .map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
        </div>
      </div>
    </div>
  );
}
