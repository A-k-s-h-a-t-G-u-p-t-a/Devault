"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Repo {
  name: string;
  url: string;
  description: string;
  stars: number;
}

export default function GitHubRepos({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`/api/github/${username}/repos`);
        if (!res.ok) throw new Error("Repositories not found");
        const data: Repo[] = await res.json();
        // Sort repos by stars (descending order)
        const sortedRepos = data.sort((a, b) => b.stars - a.stars);
        setRepos(sortedRepos);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchRepos();
  }, [username]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!repos.length) return <p>Loading repositories...</p>;

  const displayedRepos = showAll ? repos : repos.slice(0, 6);

  return (
    <div className="ml-auto mr-auto">
      <h2 className="text-xl font-semibold mb-4 text-violet-400">My Projects</h2>
      <div className="grid grid-cols-3 gap-10">
        {displayedRepos.map((repo, index) => (
          <Card key={index} className="bg-slate-800 border-violet-700">
            <CardHeader>
              <CardTitle className="text-violet-300">{repo.name}</CardTitle>
              <CardDescription className="text-slate-400">⭐ {repo.stars} stars</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">{repo.description || "No description available."}</p>
              <Button variant="link" className="mt-2 text-violet-400 hover:text-violet-300 p-0" asChild>
                <Link href={repo.url} target="_blank">
                  More Info <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {repos.length > 6 && (
        <div className="mt-6 text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-md"
          >
            {showAll ? "Show Less" : "Show All"}
          </Button>
        </div>
      )}
    </div>
  );
}
