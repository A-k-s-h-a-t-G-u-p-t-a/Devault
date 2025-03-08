"use client"

import type { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Wallet, FileText, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // If using shadcn's utility for class management

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Wallet", href: "/token/balance", icon: Wallet },
  { name: "Check Claims", href: "/dashboard/check-claim", icon: Wallet }
]

const TopBar: FC = () => {
  const pathname = usePathname()

  return (
    <nav className="flex justify-center space-x-4 py-2 bg-gray-800">
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href

        return (
          <Button
            key={name}
            asChild
            variant={isActive ? "default" : "ghost"}
            className={cn(
              "flex items-center space-x-2",
              isActive
                ? "bg-violet-700 hover:bg-violet-600 text-slate-100"
                : "text-slate-300 hover:text-slate-100 hover:bg-gray-700"
            )}
          >
            <Link href={href}>
              <Icon className="h-4 w-4" />
              <span>{name}</span>
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}

export default TopBar
