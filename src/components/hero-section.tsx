"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import SplineScene from "./spline-scene"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* 3D Background with Spline */}
      <div className="absolute inset-0 z-0">
        <SplineScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Fund and Build the <span className="text-purple-500">Future</span> of Technology
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-lg">
            Devault connects developers with investors to fund innovative projects through community-driven investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-lg py-6 px-8">Start a Project</Button>
            <Button variant="outline" className="text-black border-gray-300 hover:bg-gray-100 text-lg py-6 px-8 group">
              Explore Projects
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">500+</p>
              <p className="text-gray-400">Projects Funded</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">$25M+</p>
              <p className="text-gray-400">Total Investments</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">10K+</p>
              <p className="text-gray-400">Community Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

