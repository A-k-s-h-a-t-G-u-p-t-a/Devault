"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Copy, Check } from "lucide-react"
import GitHubProfile from "@/components/GitHubProfile"
import GitHubRepos from "@/components/GitHubRepos"
import ProjectList from "@/components/projectlist"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useActiveAccount } from "thirdweb/react"
import { useState } from "react"

export default function DashboardPage() {
  const address = useActiveAccount();

  console.log("Wallet Address Object:", address) // Debugging: Log the full object
  const walletAddress = address?.address || "Not Connected"; // Safely extract address

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
  };

  return (
    <div className="space-y-8">
      <div className="flex">
        {/* User Profile Section */}
        <div className="p-4">
          <div>
            <GitHubProfile />
            <div className="py-2">
              <div className="mt-2 flex space-x-2 py-2">
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-violet-400 hover:text-violet-300 border-violet-700 hover:bg-violet-900/50"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-violet-400 hover:text-violet-300 border-violet-700 hover:bg-violet-900/50"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-violet-400 hover:text-violet-300 border-violet-700 hover:bg-violet-900/50"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="mailto:john@example.com">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-violet-400 hover:text-violet-300 border-violet-700 hover:bg-violet-900/50"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center py-4">
            {/* Styled Wallet Address Display */}
            <Card className="w-full max-w-md bg-gray-900 shadow-lg rounded-xl border border-gray-700 p-4">
              <CardHeader>
                <CardTitle className="text-lg text-violet-400">Wallet Address</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-white text-sm font-mono">
                  {walletAddress !== "Not Connected"
                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : "Not Connected"}
                </span>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="text-gray-400 hover:text-white">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </CardContent>
            </Card>
            <Button className="mt-4 bg-violet-700 hover:bg-violet-600 text-slate-100" asChild>
              <Link href={`/createcampaign/${walletAddress}`}>
                Create Campaign
              </Link>
            </Button>
          </div>
        </div>
        <ProjectList />
      </div>
    </div>
  )
}
