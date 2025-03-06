"use client";

import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import ReplyInput from "./ReplyInput";
import { useUser } from "@clerk/nextjs"; // Import Clerk authentication hook

export default function DiscussionCard({ discussion }: { discussion: any }) {
  const { user } = useUser(); // Get logged-in user
  const userId = user?.id; // Extract user ID

  return (
    <Card className="p-4 bg-gray-800 border border-gray-700 hover:border-violet-700 transition-all rounded-xl">
      <h3 className="text-lg font-semibold">{discussion.title}</h3>
      <p className="text-gray-400">{discussion.content}</p>
      <p className="text-gray-400 flex items-center mt-2">
        <MessageSquare className="w-4 h-4 mr-2" /> {discussion.replies.length} Replies
      </p>

      {/* Only show ReplyInput if user is logged in */}
      {userId && <ReplyInput discussionId={discussion.id} userId={userId} />}
    </Card>
  );
}
