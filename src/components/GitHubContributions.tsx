"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Contribution {
  type: string;
  repo: string;
  date: string;
  details: string;
  url: string; // Added GitHub issue URL
}

export default function GitHubContributions({ username }: { username: string }) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`/api/github/${username}/contributions`);
        if (!res.ok) throw new Error("No contributions found");
        const data: Contribution[] = await res.json();
        setContributions(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchContributions();
  }, [username]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!contributions.length) return <p>Loading contributions...</p>;

  const displayedContributions = showAll ? contributions : contributions.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-violet-400">Recent Contributions</h1>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {displayedContributions.map((contribution, index) => (
          <div key={index} className="p-5 bg-gray-800 border border-violet-700 rounded-lg shadow-md">
            <h3 className="text-violet-300 font-semibold text-lg">{contribution.repo}</h3>
            <p className="text-slate-400 mt-1 text-sm">{contribution.type} - {contribution.details}</p>
            <p className="text-sm text-slate-500 mt-2">
              <span className="font-semibold">Date:</span> {new Date(contribution.date).toLocaleString()}
            </p>
            <Button variant="link" className="mt-3 text-violet-400 hover:text-violet-300 p-0 flex items-center" asChild>
                <a href={contribution.url} target="_blank" rel="noopener noreferrer">
                    View Issue <ExternalLink className="ml-1 h-4 w-4" />
                </a>
            </Button>
          </div>
        ))}
      </div>

      {contributions.length > 6 && (
        <div className="flex justify-center">
          <Button
            className="bg-violet-700 hover:bg-violet-600 text-slate-100"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show All"}
          </Button>
        </div>
      )}
    </div>
  );
}
