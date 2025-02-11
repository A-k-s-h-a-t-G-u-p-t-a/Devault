import Image from "next/image"
import { Github } from "lucide-react"

export function ProjectHeader() {
  return (
    <header className="w-full border-b border-white/10 bg-black">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Image src="/placeholder.svg" alt="Project Logo" width={32} height={32} className="rounded-full" />
          <h1 className="text-lg font-semibold text-white">Project Name</h1>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-colors"
        >
          <Github className="h-6 w-6" />
        </a>
      </div>
    </header>
  )
}

