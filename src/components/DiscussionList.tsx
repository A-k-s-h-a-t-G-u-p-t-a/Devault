"use client";
import { useState, useEffect } from "react";

import DiscussionCard from "./DiscussionCard";


export default async function DiscussionList({ category }: { category: string }) {
  const [discussions, setDiscussions] = useState<{ id: string; category: string }[]>([]);
  useEffect(() => {
    fetch(`/api/community/discussions`)
      .then((res) => res.json())
      .then((data) => setDiscussions(data.filter((d: { category: string }) => d.category === category)));
  }, [category]);

  return (
    <div className="space-y-4">
      {discussions.map((disc) => (
        <DiscussionCard key={disc.id} discussion={disc} />
      ))}
    </div>
  );
}
