import Link from "next/link"
import { CheckCircle2, Circle, Filter, SortAsc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import GitHubContributions from "@/components/GitHubContributions";


export default function IssuesPage() {
  return (
      <GitHubContributions username="Armaan2906" />
  )
}

