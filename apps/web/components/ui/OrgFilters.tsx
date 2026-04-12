'use client';
import { Button } from "@/components/ui/button";

interface OrgFiltersProps {
  techStacks: string[]; categories: string[]; programs: string[];
  selectedTech: string[]; setSelectedTech: (tech: string[]) => void;
  selectedCategory: string | null; setSelectedCategory: (category: string | null) => void;
  selectedProgram: string | null; setSelectedProgram: (program: string | null) => void;
}

export default function OrgFilters({ techStacks, categories, programs, selectedTech, setSelectedTech, selectedCategory, setSelectedCategory, selectedProgram, setSelectedProgram }: OrgFiltersProps) {

  const handleTechToggle = (tech: string) => {
    const newSelected = selectedTech.includes(tech)
      ? selectedTech.filter(t => t !== tech)
      : [...selectedTech, tech];
    setSelectedTech(newSelected);
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Filter by Program</h3>
          <div className="space-y-2">
            <Button
              variant={!selectedProgram ? 'secondary' : 'ghost'}
              onClick={() => setSelectedProgram(null)}
              className="w-full justify-start text-white hover:bg-gray-700"
            >
              All Programs
            </Button>
            {programs.map(p => (
              <Button
                key={p}
                variant={selectedProgram === p ? 'secondary' : 'ghost'}
                onClick={() => setSelectedProgram(p)}
                className="w-full justify-start text-white hover:bg-gray-700"
              >
                {p}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Filter by Category</h3>
          <div className="space-y-2">
            <Button
              variant={!selectedCategory ? 'secondary' : 'ghost'}
              onClick={() => setSelectedCategory(null)}
              className="w-full justify-start text-white hover:bg-gray-700"
            >
              All Categories
            </Button>
            {categories.map(c => (
              <Button
                key={c}
                variant={selectedCategory === c ? 'secondary' : 'ghost'}
                onClick={() => setSelectedCategory(c)}
                className="w-full justify-start text-white hover:bg-gray-700"
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Filter by Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {techStacks.map(tech => (
              <Button
                key={tech}
                variant={selectedTech.includes(tech) ? 'default' : 'outline'}
                onClick={() => handleTechToggle(tech)}
                size="sm"
                className={selectedTech.includes(tech) ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}