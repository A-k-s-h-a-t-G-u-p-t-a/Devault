"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

function extractOwnerRepo(url: string) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    if (pathParts.length >= 2) {
      return { owner: pathParts[0], repo: pathParts[1] };
    }
  } catch (error) {
    console.error("Invalid URL:", error);
  }
  return { owner: null, repo: null };
}

export default function ProjectForm() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    repoLink: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to submit a project");

    setLoading(true);

    try {
      const token = await getToken();
      const response = await axios.post(
        "http://localhost:3000/input-form-route",
        { ...formData, userId: user.id }, // Sending user ID instead of full user object
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Project submitted successfully!");
        setFormData({ name: "", repoLink: "", description: "" });

        const { owner, repo } = extractOwnerRepo(formData.repoLink);
        if (owner && repo) {
          router.push(`/project-details/${owner}/${repo}`);
        }
      } else {
        throw new Error(`Failed to submit project. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Submit Your Project</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Project Name */}
          <div>
            <label className="block text-gray-400 mb-1">Project Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name" 
              className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          
          {/* GitHub Repo Link */}
          <div>
            <label className="block text-gray-400 mb-1">GitHub Repo Link</label>
            <input 
              type="url" 
              name="repoLink"
              value={formData.repoLink}
              onChange={handleChange}
              placeholder="https://github.com/owner/repo" 
              className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          
          {/* Project Description */}
          <div>
            <label className="block text-gray-400 mb-1">Project Description</label>
            <textarea 
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project" 
              className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Project"}
          </button>
        </form>
      </div>
    </div>
  );
}



  