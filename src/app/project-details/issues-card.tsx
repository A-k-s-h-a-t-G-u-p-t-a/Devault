import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Issue {
  id: number
  title: string
  status: "open" | "closed"
  priority: "low" | "medium" | "high"
}

interface IssuesCardProps {
  issues: Issue[]
}

export function IssuesCard({ issues }: IssuesCardProps) {
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

