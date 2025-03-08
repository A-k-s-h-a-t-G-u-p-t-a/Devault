"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useActiveAccount } from "thirdweb/react"

interface Issue {
  id: number
  title: string
  status: "open" | "closed"
  priority: "low" | "medium" | "high"
  owner: string
  repo: string
}

interface IssuesCardProps {
  issues: Issue[]
}

export function IssuesCard({ issues }: IssuesCardProps) {
  const router = useRouter();
  const address = useActiveAccount();
  const walletAddress = address?.address; 

  // Function to claim an issue
  const handleClaimIssue = async (owner: string, issueId: number) => {
    if (!walletAddress) {
      console.error("Wallet address is missing.");
      return;
    }

    try {
      const apiUrl = `/api/claim-issue/${owner}/${issueId}/${walletAddress}`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error claiming issue:", data.error);
        return;
      }

      console.log("Issue claimed successfully:", data);
      alert("Issue claimed successfully!");
    } catch (error) {
      console.error("Failed to claim issue:", error);
    }
  };

  return (
    <Card className="w-full bg-black/50 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Project Issues</CardTitle>
        <CardDescription className="text-white/60">Track and contribute to open issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-black/30"
            >
              <div className="space-y-1">
                <p className="font-medium text-white">{issue.title}</p>
                <div className="flex gap-2">
                  <Badge
                    variant={issue.status === "open" ? "default" : "secondary"}
                    className={issue.status === "open" ? "bg-purple text-white" : "bg-white/10 text-white/60"}
                  >
                    {issue.status}
                  </Badge>
                  <Badge
                    variant={
                      issue.priority === "high" ? "destructive" : issue.priority === "medium" ? "default" : "secondary"
                    }
                    className={
                      issue.priority === "high"
                        ? "bg-red-500 text-white"
                        : issue.priority === "medium"
                          ? "bg-purple text-white"
                          : "bg-white/10 text-white/60"
                    }
                  >
                    {issue.priority}
                  </Badge>
                </div>
              </div>
              {/* Buttons Side by Side */}
              <div className="flex gap-2">
                <Button
                  className="bg-purple text-white hover:bg-purple/90"
                  onClick={() => handleClaimIssue(issue.owner, issue.id)}
                  disabled={!walletAddress} // Disable if no wallet address
                >
                  Claim Issue
                </Button>
                <Button
                  className="bg-purple text-white hover:bg-purple/90"
                  onClick={() => router.push(`/issues/${issue.owner}/${issue.repo}/${issue.id}`)}
                >
                  AI Assistance
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

