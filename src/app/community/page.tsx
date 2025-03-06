"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import CommunitySidebar from "@/components/CommunitySidebar";
import DiscussionList from "@/components/DiscussionList";
import CreateDiscussionModal from "@/components/CreateDiscussionModal";

export default function CommunityPage() {
  const { user } = useUser(); // Get logged-in user
  const searchParams = useSearchParams(); // Get URL params
  const projectId = searchParams.get("projectId"); // Extract projectId from URL
  const [activeCategory, setActiveCategory] = useState("codebase");
  
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <CommunitySidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Pass userId & projectId only if they exist */}
      {user?.id && projectId && <CreateDiscussionModal userId={user.id} projectId={projectId} />}

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 border-b border-violet-700 pb-2">
          {activeCategory}
        </h1>
        <DiscussionList category={activeCategory} />
      </main>
    </div>
  );
}
