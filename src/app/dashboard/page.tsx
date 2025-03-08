import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, ExternalLink } from "lucide-react"
import GitHubProfile from "@/components/GitHubProfile"
import GitHubRepos from "@/components/GitHubRepos";


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex">
        {/* User Profile Section */}
        <div className="p-4">
          <div>
          <GitHubProfile/>
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
          <div className="flex justify-center py-4">
          <Button className="mt-4 bg-violet-700 hover:bg-violet-600 text-slate-100" asChild>
            <Link href="/dashboard/crypto-wallet">Crypto Wallet</Link>
          </Button>
          </div>
        </div>

        {/* Issues List Section */}
        {/* <div className="ml-auto mr-auto">
          <h2 className="text-xl font-semibold mb-4 text-violet-400">My Projects</h2>
          <div className="grid grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-slate-800 border-violet-700">
                <CardHeader>
                  <CardTitle className="text-violet-300">Issue #{i}</CardTitle>
                  <CardDescription className="text-slate-400">Repository: example/repo</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">Recent contribution to issue #{i}</p>
                  <Button variant="link" className="mt-2 text-violet-400 hover:text-violet-300 p-0" asChild>
                    <Link href={`/dashboard/issues/${i}`}>
                      More Info <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
        {/* <GitHubRepos /> */}
      </div>

      {/* Analytics Placeholder Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-violet-400">Analytics</h2>
        <Card className="bg-slate-800 border-violet-700">
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-slate-400">Analytics content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

