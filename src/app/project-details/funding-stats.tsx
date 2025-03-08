import type React from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "lucide-react"

interface FundingStatsProps {
  amountRaised: number
  fundingGoal: number
  roundStatus: "open" | "closed"
  equityOffered: number
}

export function FundingStats({ amountRaised, fundingGoal, roundStatus, equityOffered }: FundingStatsProps) {
  const progress = (amountRaised / fundingGoal) * 100

  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-white/60">Amount Raised</h2>
          <p className="text-2xl font-bold text-white">${amountRaised.toLocaleString()}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-white/60">Funding Goal</h2>
          <p className="text-2xl font-bold text-white">${fundingGoal.toLocaleString()}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-white/60">Investment Round</h2>
          <div className="flex items-center space-x-2">
            <Badge
              variant={roundStatus === "open" ? "default" : "secondary"}
              className={roundStatus === "open" ? "bg-green-500" : "bg-red-500"}
            >
              {roundStatus.toUpperCase()}
            </Badge>
            <span className="text-white">{equityOffered}% Equity</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Progress
          value={progress}
          className="h-2 bg-white/10"
          style={{ "--tw-progress-fill": "#8B5CF6" } as React.CSSProperties}
        />
        <p className="text-sm text-white/60 text-right">{progress.toFixed(1)}% funded</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="w-full bg-purple hover:bg-purple/90 text-white">Contribute Now</Button>
        <Button variant="outline" className="w-full border-purple text-purple hover:bg-purple/10">
          VC Investment
        </Button>
        <Button variant="outline" className="w-full border-purple text-purple hover:bg-purple/10">
          <Link href="/campaigns">
          Crowdfunding
          </Link>
        </Button>
        <Button variant="outline" className="w-full border-purple text-purple hover:bg-purple/10">
          Follow
        </Button>
      </div>
      <div className="flex justify-center">
        <Button variant="link" className="text-purple hover:text-purple/90">
          Learn More
        </Button>
      </div>
    </div>
  )
}