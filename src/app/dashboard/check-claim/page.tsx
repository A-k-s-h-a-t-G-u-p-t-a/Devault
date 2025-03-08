"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clipboard, Check } from "lucide-react";

interface ClaimedIssue {
  id: string;
  walletAddress: string;
  issueId: string;
  user: {
    username: string;
  };
}

export default function CheckClaim() {
  const [claimedIssues, setClaimedIssues] = useState<ClaimedIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClaimedIssues() {
      try {
        console.log("🔹 Fetching claimed issues...");
        const res = await fetch("/api/dashboard/check-claim");

        console.log("🔹 API Response Status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch claims");

        const data = await res.json();
        console.log("✅ Fetched Claimed Issues:", data);

        setClaimedIssues(data.claimedIssues);
      } catch (error) {
        console.error("🚨 Error fetching claims:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClaimedIssues();
  }, []);

  const copyToClipboard = (walletAddress: string, id: string) => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <p className="text-gray-400 text-center animate-pulse">Loading claimed issues...</p>;

  return (
    <div className="p-8 bg-[#0d0d1a] text-white shadow-lg rounded-xl min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-white text-center">🚀 Claimed Issues</h2>

      {claimedIssues.length === 0 ? (
        <p className="text-gray-500 text-center">No claims found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {claimedIssues.map((issue) => (
            <Card
              key={issue.id}
              className="relative overflow-hidden bg-[#1a1a29] border border-[#27293d] shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#0f0f17] opacity-50 rounded-xl"></div>

              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex justify-between">
                  <span>Issue ID:</span> 
                  <a
                    href={`https://github.com/yourrepo/issues/${issue.issueId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {issue.issueId}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p>
                  <strong className="text-gray-400">Claimed By:</strong>{" "}
                  <span className="text-green-400 font-medium">{issue.user.username}</span>
                </p>
                <p className="flex items-center gap-2">
                  <strong className="text-gray-400">Wallet Address:</strong>{" "}
                  <span className="text-purple-400 break-all">{issue.walletAddress}</span>
                  <button
                    onClick={() => copyToClipboard(issue.walletAddress, issue.id)}
                    className="p-1 text-gray-300 hover:text-white transition-colors"
                  >
                    {copiedId === issue.id ? <Check className="w-5 h-5 text-green-400" /> : <Clipboard className="w-5 h-5" />}
                  </button>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
