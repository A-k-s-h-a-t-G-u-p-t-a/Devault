"use client"
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
 
export default function ProjectForm() {
  const { user } = useUser();
  const { getToken } = useAuth(); 
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    repoLink: "",
    description: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to submit a project");

    try {
        
        const token = await getToken();
        const response=await axios.post("http://localhost:3000/input-form-route", { ...formData, user },{
            headers: {
              "Content-Type": "application/json",  // Ensure correct content type
              Authorization: `Bearer ${token}`, // Attach token in request header
            },
          });
        if (response.status === 200) {
            alert("Project submitted successfully!");
            setFormData({ name: "", repoLink: "", description: "" });
            router.push("/project-details");
          }
        }catch (error) {
           console.error("Error submitting project:", error);
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
              placeholder="https://github.com/your-repo" 
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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300">
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
}

  