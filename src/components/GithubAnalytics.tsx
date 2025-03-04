"use client";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  commitStats: { week: string; commits: number }[];
  languageStats: { language: string; percentage: number }[];
  pullRequests: { total: number; open: number; closed: number };
}

export default function GitHubAnalytics({ username }: { username: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch(`/api/github/${username}/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    }
    fetchStats();
  }, [username]);

  if (!stats) return <p>Loading GitHub Analytics...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">GitHub Analytics for {username}</h2>

      {/* Profile Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-bold">{stats.followers}</h3>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-bold">{stats.following}</h3>
          <p className="text-gray-500">Following</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-bold">{stats.public_repos}</h3>
          <p className="text-gray-500">Public Repos</p>
        </div>
      </div>

      {/* Commit Frequency Chart */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Commit Frequency (Last 10 Weeks)</h3>
        <Line
          data={{
            labels: stats.commitStats.map((data) => data.week),
            datasets: [{ label: "Commits", data: stats.commitStats.map((data) => data.commits), backgroundColor: "rgba(75,192,192,0.4)", borderColor: "rgba(75,192,192,1)" }]
          }}
        />
      </div>

      {/* Language Usage Pie Chart */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Language Usage</h3>
        <Pie
          data={{
            labels: stats.languageStats.map((data) => data.language),
            datasets: [{ data: stats.languageStats.map((data) => data.percentage), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"] }]
          }}
        />
      </div>

      {/* PR Stats */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Pull Requests</h3>
        <Bar
          data={{
            labels: ["Total PRs", "Open PRs", "Closed PRs"],
            datasets: [{ label: "PRs", data: [stats.pullRequests.total, stats.pullRequests.open, stats.pullRequests.closed], backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"] }]
          }}
        />
      </div>
    </div>
  );
}
