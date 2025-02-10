import Link from "next/link"
import { CheckCircle2, Circle, Filter, SortAsc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for issues
const activeIssues = [
  {
    id: 1,
    title: "Update user authentication flow",
    author: "alice",
    createdAt: "2 days ago",
    labels: ["enhancement"],
  },
  {
    id: 2,
    title: "Fix responsive layout on mobile devices",
    author: "bob",
    createdAt: "1 day ago",
    labels: ["bug", "high-priority"],
  },
  { id: 3, title: "Implement dark mode toggle", author: "charlie", createdAt: "3 hours ago", labels: ["feature"] },
]

const completedIssues = [
  {
    id: 4,
    title: "Optimize database queries for faster load times",
    author: "david",
    completedAt: "1 week ago",
    labels: ["performance"],
  },
  {
    id: 5,
    title: "Add unit tests for user registration",
    author: "eve",
    completedAt: "3 days ago",
    labels: ["testing"],
  },
]

export default function IssuesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-violet-400">Issues</h1>
        <Button className="bg-violet-700 hover:bg-violet-600 text-slate-100">New Issue</Button>
      </div>

      <div className="flex space-x-2 mb-4">
        <Input placeholder="Search all issues" className="max-w-sm bg-gray-800 border-slate-700 text-slate-300" />
        <Button variant="outline" className="border-slate-700 text-slate-300">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
        <Button variant="outline" className="border-slate-700 text-slate-300">
          <SortAsc className="mr-2 h-4 w-4" /> Sort
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-gray-800 text-slate-300">
          <TabsTrigger value="active" className="data-[state=active]:bg-violet-700 data-[state=active]:text-slate-100">
            Active
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-violet-700 data-[state=active]:text-slate-100"
          >
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ul className="space-y-2">
            {activeIssues.map((issue) => (
              <li
                key={issue.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750"
              >
                <div className="flex items-center space-x-3">
                  <Circle className="text-violet-400 h-5 w-5" />
                  <div>
                    <Link
                      href={`/dashboard/issues/${issue.id}`}
                      className="font-medium text-slate-200 hover:text-violet-400"
                    >
                      {issue.title}
                    </Link>
                    <div className="text-sm text-slate-400">
                      #{issue.id} opened {issue.createdAt} by {issue.author}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {issue.labels.map((label) => (
                    <Badge key={label} variant="outline" className="border-violet-700 text-violet-400">
                      {label}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="completed">
          <ul className="space-y-2">
            {completedIssues.map((issue) => (
              <li
                key={issue.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-green-500 h-5 w-5" />
                  <div>
                    <Link
                      href={`/dashboard/issues/${issue.id}`}
                      className="font-medium text-slate-200 hover:text-violet-400"
                    >
                      {issue.title}
                    </Link>
                    <div className="text-sm text-slate-400">
                      #{issue.id} completed {issue.completedAt} by {issue.author}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {issue.labels.map((label) => (
                    <Badge key={label} variant="outline" className="border-violet-700 text-violet-400">
                      {label}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}

