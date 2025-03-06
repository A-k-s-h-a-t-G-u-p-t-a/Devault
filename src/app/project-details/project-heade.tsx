import Image from "next/image"
import { Github } from "lucide-react"

interface ProjectHeaderProps {
  projectName: string
  projectImage: string
}

export function ProjectHeader({ projectName, projectImage }: ProjectHeaderProps) {
  return (
    <header className="w-full border-b border-white/10 bg-black">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Image 
            src={projectImage || "/placeholder.svg"} 
            alt={`${projectName} Logo`} 
            width={32} 
            height={32} 
            className="rounded-full" 
          />
          <h1 className="text-lg font-semibold text-white">{projectName}</h1>
        </div>
      </div>
    </header>
  )
}
