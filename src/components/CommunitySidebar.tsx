import { Button } from "@/components/ui/button";

const categories = [
  { id: "codebase", name: "Codebase & Development" },
  { id: "issues", name: "Issues & Bounties" },
  { id: "governance", name: "Governance & Proposals" },
  { id: "general", name: "General Community" },
];

export default function CommunitySidebar({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (id: string) => void }) {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4 border-r border-violet-700">
      <h2 className="text-xl font-bold mb-4">Community</h2>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={activeCategory === cat.id ? "default" : "ghost"}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === cat.id ? "bg-violet-700 text-white" : "hover:bg-gray-800"}`}
          onClick={() => setActiveCategory(cat.id)}
        >
          {cat.name}
        </Button>
      ))}
    </aside>
  );
}
