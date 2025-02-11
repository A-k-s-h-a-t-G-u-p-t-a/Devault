import { ProjectHeader } from "./project-heade"
import { FundingStats } from "./funding-stats"
import { IssuesCard } from "./issues-card"

const SAMPLE_ISSUES = [
  {
    id: 1,
    title: "Implement new authentication flow",
    status: "open",
    priority: "high",
  },
  {
    id: 2,
    title: "Update documentation for v2.0",
    status: "open",
    priority: "medium",
  },
  {
    id: 3,
    title: "Fix mobile responsive layout",
    status: "closed",
    priority: "low",
  },
] as any

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-black">
      <ProjectHeader />
      <main className="container px-4 py-6 md:py-8 space-y-8">
        <FundingStats amountRaised={75000} fundingGoal={100000} roundStatus="open" equityOffered={10} />
        <IssuesCard issues={SAMPLE_ISSUES} />
      </main>
    </div>
  )
}

