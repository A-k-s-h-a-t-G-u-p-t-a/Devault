"use client";

import { useState, useEffect } from "react";

interface GitHubUser {
  name: string;
  avatar_url: string;
}

export default function GitHubProfile({ username }: { username: string }) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/github/${username}`);
        if (!res.ok) throw new Error("User not found");
        const data: GitHubUser = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchUser();
  }, [username]);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-md">
      <img src={user.avatar_url} alt={user.name} className="w-16 h-16 rounded-full" />
      <h2 className="text-lg font-semibold">{user.name}</h2>
    </div>
  );
}
// // {/* <div className="flex justify-center">
//                 <Image
//                 src="/user.png?height=100&width=100"
//                 alt="User Avatar"
//                 width={100}
//                 height={100}
//                 className="rounded-full"
//                 />
//             </div> */}
            // <h1 className="text-2xl font-bold text-violet-400 text-center">John Doe</h1>
            // <p className="text-slate-400 text-center">@johndoe</p>