"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import ProjectCard from "../components/project-card"
import FeaturesSection from "../components/features-section"
import HeroSection from "../components/hero-section"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#0f0f2d] text-white">

      <HeroSection />

      <section className="relative z-10 px-4 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover innovative projects that are currently seeking funding and support from the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            name="Neural Network API"
            raised={75000}
            goal={100000}
            equity={10}
            category="AI & Machine Learning"
          />
          <ProjectCard
            name="Quantum Computing OS"
            raised={250000}
            goal={500000}
            equity={8}
            category="Quantum Technology"
          />
          <ProjectCard name="Blockchain Security" raised={120000} goal={200000} equity={12} category="Blockchain" />
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="text-black border-gray-300 hover:bg-gray-100 py-4 text-base group">
            View All Projects
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <FeaturesSection />

      <section className="relative z-10 px-4 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with developers, investors, and innovators to collaborate on groundbreaking projects.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10 text-base">
          <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700">Start a Project</Button>
          <Button variant="outline" className="text-black border-gray-300 hover:bg-gray-100  py-4 text-base">
            Become an Investor
          </Button>
          <Button variant="outline" className="text-black border-gray-300 hover:bg-gray-100  py-4 text-base">
            Join Community
          </Button>
        </div>
      </section>

      <footer className="border-t border-gray-800 mt-16 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Devault</h3>
            <p className="text-gray-400">Empowering developers to build the future through community-driven funding.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Projects</li>
              <li>Community</li>
              <li>Campaigns</li>
              <li>Dashboard</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Documentation</li>
              <li>API</li>
              <li>Support</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Devault. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}