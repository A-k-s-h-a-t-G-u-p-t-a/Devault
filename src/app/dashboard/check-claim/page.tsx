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

// Custom Separator Component (Optional)
const Divider = () => <div className="border-t border-gray-300 my-2" />;

export default function CheckClaim() {
  const [claimedIssues, setClaimedIssues] = useState<ClaimedIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClaimedIssues() {
      try {
        const res = await fetch("/api/dashboard/check-claim");
        if (!res.ok) throw new Error("Failed to fetch claims");

        const data = await res.json();
        setClaimedIssues(data.claimedIssues);
      } catch (error) {
        console.error(error);
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
              <Divider /> {/* Custom divider instead of Separator */}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
