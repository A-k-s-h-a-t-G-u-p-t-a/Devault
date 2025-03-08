"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Clerk authentication

interface User {
  username: string;
  photo: string | null;
}

export default function GitHubProfile() {
  const { user, isLoaded } = useUser(); // Get the authenticated user from Clerk
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!isLoaded || !user?.id) return; // Ensure user is loaded before proceeding
      
      try {
        const res = await fetch(`/api/user?userId=${user.id}`);
        if (!res.ok) throw new Error("User not found");
        const data: User = await res.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchUserData();
  }, [user, isLoaded]);

  if (!isLoaded) return <p>Loading...</p>; // Handle initial loading state
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!userData) return <p>Loading user data...</p>;

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-md">
      <img
        src={userData.photo || "/default-avatar.png"}
        alt={userData.username}
        className="w-16 h-16 rounded-full"
      />
      <h2 className="text-lg font-semibold">{userData.username}</h2>
    </div>
  );
}
