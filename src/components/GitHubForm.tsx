"use client";
import { useState } from "react";

export default function GitHubForm() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/github/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Ensure content type is set
        body: JSON.stringify({ username }), // Ensure username is included
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("GitHub data fetched successfully!");
      } else {
        setMessage(data.error || "Error fetching data");
      }
    } catch (error) {
      console.error("Request error:", error);
      setMessage("Error connecting to server");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={handleFetch} disabled={loading} className="bg-blue-500 text-white p-2 ml-2">
        {loading ? "Fetching..." : "Fetch Data"}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
