'use client';
// import { Button } from "@/components/ui/button";
import { Button } from "./button"; // Assuming it's in the same /ui folder


interface OrgFiltersProps {
  techStacks: string[];
  categories: string[];
  selectedTech: string[];
  setSelectedTech: (tech: string[]) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function OrgFilters({
  techStacks,
  categories,
  selectedTech,
  setSelectedTech,
  selectedCategory,
  setSelectedCategory
}: OrgFiltersProps) {

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
          <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
          <div className="space-y-2">
            <Button
              variant={!selectedCategory ? 'secondary' : 'ghost'}
              onClick={() => setSelectedCategory(null)}
              className="w-full justify-start"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'secondary' : 'ghost'}
                onClick={() => setSelectedCategory(category)}
                className="w-full justify-start"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Filter by Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {techStacks.map(tech => (
              <Button
                key={tech}
                variant={selectedTech.includes(tech) ? 'default' : 'outline'}
                onClick={() => handleTechToggle(tech)}
                size="sm"
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