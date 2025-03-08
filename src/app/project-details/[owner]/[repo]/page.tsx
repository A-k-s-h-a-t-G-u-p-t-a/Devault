"use client"
import { ProjectHeader } from "../../project-heade"
import { FundingStats } from "../../funding-stats"
import { IssuesCard } from "../../issues-card"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Issue {
  id: number
  title: string
  state: "open" | "closed"
  labels: { name: string }[]
}

export default function ProjectPage() {
  const params = useParams()
  const { owner, repo } = params as { owner: string; repo: string };
  const [issues, setIssues] = useState<Issue[]>([])
  const [loadingIssues, setLoadingIssues] = useState(true)
  const [errorIssues, setErrorIssues] = useState<string | null>(null)

  const [projectImage, setProjectImage] = useState<string | null>(null)
  const [loadingProject, setLoadingProject] = useState(true)
  const [errorProject, setErrorProject] = useState<string | null>(null)

  useEffect(() => {
    if (!owner || !repo) return

    async function fetchIssues() {
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`)
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        const data = await res.json()
        setIssues(data)
      } catch (err) {
        setErrorIssues((err as Error).message)
      } finally {
        setLoadingIssues(false)
      }
    }

    async function fetchProjectImage() {
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        const data = await res.json()
        setProjectImage(data.owner.avatar_url)
      } catch (err) {
        setErrorProject((err as Error).message)
      } finally {
        setLoadingProject(false)
      }
    }

    fetchIssues()
    fetchProjectImage()
  }, [owner, repo])

  return (
    <div className="min-h-screen bg-black">
      <ProjectHeader 
        projectName={repo}
        projectImage={projectImage || "/placeholder.svg"} 
      />
      
      <main className="container px-4 py-6 md:py-8 space-y-8">
      <ProjectHeader 
        projectName={repo}
        projectImage={projectImage || "/placeholder.svg"} 
      />
        <FundingStats amountRaised={75000} fundingGoal={100000} roundStatus="open" equityOffered={10} />
        
        {loadingIssues && <p className="text-white">Loading issues...</p>}
        {errorIssues && <p className="text-red-500">{errorIssues}</p>}
        
        {!loadingIssues && !errorIssues && (
          <IssuesCard 
            issues={issues.map(issue => ({
              id: issue.id,
              title: issue.title,
              status: issue.state,
              priority: issue.labels.some(label => label.name === "high-priority") ? "high" : "medium",
              owner:owner,
              repo:repo
            }))}
          />
        )}
      </main>
    </div>
  )
}
