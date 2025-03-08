"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateDiscussionModal({ userId, projectId }: { userId: string; projectId: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("codebase");

  async function handleSubmit() {
    const res = await fetch("/api/community/discussions", {
      method: "POST",
      body: JSON.stringify({ title, content, category, userId, projectId }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setOpen(false);
      setTitle("");
      setContent("");
    }
  }

  return (
    <>
      <Button className="bg-violet-700 text-white" onClick={() => setOpen(true)}>
        Start Discussion
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogTitle>Start a Discussion</DialogTitle>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Discussion Title" />
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Describe your topic..." />
          <DialogFooter>
            <Button onClick={handleSubmit} className="bg-violet-700">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
