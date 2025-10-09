'use client'; // <-- CRITICAL: This makes the page interactive

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import OrgCard from '@/components/ui/OrgCard';
import OrgFilters from '@/components/ui/OrgFilters'; // Our new component

interface Organization {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  mission: string;
  tech_stack: string[] | null;
  category: string | null;
}

export default function OrgsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  
  useEffect(() => {
    const getOrganizations = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('name');
      
      if (error) console.error('Error fetching organizations:', error);
      else setOrganizations(data || []);
      
      setIsLoading(false);
    };
    getOrganizations();
  }, []);

  const { uniqueTechStacks, uniqueCategories } = useMemo(() => {
    const techSet = new Set<string>();
    const catSet = new Set<string>();
    organizations.forEach(org => {
      org.tech_stack?.forEach(tech => techSet.add(tech));
      if (org.category) catSet.add(org.category);
    });
    return {
      uniqueTechStacks: Array.from(techSet).sort(),
      uniqueCategories: Array.from(catSet).sort(),
    };
  }, [organizations]);

  const filteredOrganizations = useMemo(() => {
    return organizations.filter(org => {
      const categoryMatch = !selectedCategory || org.category === selectedCategory;
      const techMatch = selectedTech.length === 0 || selectedTech.every(tech => org.tech_stack?.includes(tech));
      return categoryMatch && techMatch;
    });
  }, [organizations, selectedCategory, selectedTech]);

  return (
    <main className="container mx-auto p-8 md:p-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Organization Explorer</h1>
        <p className="mt-4 text-lg text-gray-300">
          Find your project. Click an organization to read its OpenVeda Playbook.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <OrgFilters 
          techStacks={uniqueTechStacks}
          categories={uniqueCategories}
          selectedTech={selectedTech}
          setSelectedTech={setSelectedTech}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <div className="flex-1">
          {isLoading ? (
            <p>Loading organizations...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOrganizations.map((org) => (
                <OrgCard 
                  key={org.slug}
                  name={org.name}
                  slug={org.slug}
                  logo_url={org.logo_url}
                  tech_stack={org.tech_stack}
                />
              ))}
            </div>
          )}
          {!isLoading && filteredOrganizations.length === 0 && (
              <div className="text-center py-16">
                  <p className="text-xl">No organizations match your filters.</p>
              </div>
          )}
        </div>
      </div>
    </main>
  );
}