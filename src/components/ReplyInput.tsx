"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReplyInput({ discussionId, userId }: { discussionId: string; userId: string }) {
  const [content, setContent] = useState("");

  async function handleReply() {
    if (!content.trim()) return;
    await fetch("/api/community/replies", {
      method: "POST",
      body: JSON.stringify({ discussionId, userId, content }),
      headers: { "Content-Type": "application/json" },
    });
    setContent("");
  }

  return (
    <div className="flex space-x-2">
      <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a reply..." />
      <Button onClick={handleReply} className="bg-violet-700">Reply</Button>
    </div>
  );
}
