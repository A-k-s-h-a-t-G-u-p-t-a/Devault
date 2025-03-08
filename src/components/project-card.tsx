import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  name: string
  raised: number
  goal: number
  equity: number
  category: string
}

export default function ProjectCard({ name, raised, goal, equity, category }: ProjectCardProps) {
  const progress = Math.round((raised / goal) * 100)

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="font-bold">{name.charAt(0)}</span>
          </div>
          <Badge variant="outline" className="bg-gray-800/50 text-white">
            {category}
          </Badge>
        </div>

        <h3 className="text-xl font-bold mb-2">{name}</h3>

        <div className="space-y-4 mt-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount Raised</span>
            <span className="font-medium">${raised.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Funding Goal</span>
            <span className="font-medium">${goal.toLocaleString()}</span>
          </div>

          <Progress value={progress} className="h-2 bg-gray-800" />

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{progress}% funded</span>
            <div className="flex items-center">
              <span className="bg-green-600 text-xs px-2 py-0.5 rounded mr-2">OPEN</span>
              <span>{equity}% Equity</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
           <Button className="bg-purple-600 hover:bg-purple-700 w-full py-4 text-base">
                Contribute
                </Button>
                <Button
                variant="outline"
                className="text-black border-gray-300 hover:bg-gray-100 w-full py-4 text-base"
                >
                Details
            </Button>

        </div>
      </div>
    </div>
  )
}