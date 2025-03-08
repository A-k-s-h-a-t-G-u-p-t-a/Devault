"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClaimedIssue {
  id: string;
  walletAddress: string;
  issueId: string;
  user: {
    username: string;
    githubId: string;
  };
}

export default function CheckClaim() {
  const [claimedIssues, setClaimedIssues] = useState<ClaimedIssue[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading claimed issues...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Claimed Issues</h2>

      {claimedIssues.length === 0 ? (
        <p className="text-gray-500">No claims found.</p>
      ) : (
        claimedIssues.map((issue) => (
          <Card key={issue.id} className="mb-4">
            <CardHeader>
              <CardTitle>Issue ID: {issue.issueId}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Claimed By:</strong> {issue.user.username} ({issue.user.githubId})
              </p>
              <p>
                <strong>Wallet Address:</strong> {issue.walletAddress}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
