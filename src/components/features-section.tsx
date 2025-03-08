import { Shield, Code, Users, BarChart3, Zap, Globe } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Code className="h-8 w-8 text-purple-500" />,
      title: "Developer-First",
      description:
        "Built by developers, for developers. Our platform prioritizes the needs of creators and innovators.",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Secure Funding",
      description: "Multiple funding options with transparent terms and secure transaction processing.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Community Driven",
      description: "Connect with a network of developers, investors, and mentors to help your project succeed.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      title: "Project Analytics",
      description: "Comprehensive analytics and reporting to track your project's performance and growth.",
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: "Fast Deployment",
      description: "Streamlined processes to get your project funded and launched quickly and efficiently.",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      title: "Global Reach",
      description: "Connect with investors and collaborators from around the world to scale your project.",
    },
  ]

  return (
    <section className="relative z-10 px-4 py-16 md:py-24 bg-gradient-to-b from-[#0f0f2d] to-[#0a0a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Devault</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform provides everything developers need to bring their ideas to life through community-driven
            funding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}