'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import OrgCard from '@/components/ui/OrgCard';
import { motion, AnimatePresence } from 'framer-motion';

const supabase = createBrowserSupabaseClient();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function OrgsContent() {
  const searchParams = useSearchParams();
  const programParam = searchParams.get('program');
  
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [filterProgram, setFilterProgram] = useState(programParam || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrgs() {
      setIsLoading(true);
      let query = supabase.from('organizations').select('name, slug, logo_url, tech_stack').order('name');
      if (filterProgram) {
        query = query.eq('program', filterProgram);
      }
      const { data } = await query;
      setOrganizations(data || []);
      setIsLoading(false);
    }
    fetchOrgs();
  }, [filterProgram]);

  const filteredOrgs = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (org.tech_stack && org.tech_stack.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center md:text-left"
      >
        <h1 className="text-6xl md:text-8xl font-black text-foreground ml-[-4px] tracking-tight mb-8">
          Project <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Discovery</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
          Find the perfect organization for your open-source journey. 
          Expertly curated for impact and mentorship quality.
        </p>
      </motion.div>

      {/* Filters & Search - Modern Bento Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-16 items-stretch">
        <div className="relative flex-1 group">
          <input
            type="text"
            placeholder="Search by name or tech stack (e.g. React, Python)..."
            className="w-full bg-muted/50 glass px-8 py-6 rounded-3xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/50 transition-all outline-none font-medium text-lg border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="w-full lg:w-auto bg-muted/50 glass px-12 py-6 rounded-3xl text-foreground outline-none focus:ring-2 focus:ring-primary/50 appearance-none font-black text-lg cursor-pointer min-w-[300px] border-border"
          >
            <option value="">All Programs</option>
            <option value="GSoC 2026">GSoC 2026</option>
            <option value="LFX">LFX Mentorship</option>
            <option value="Outreachy">Outreachy</option>
            <option value="GSSoC">GSSoC</option>
          </select>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton h-[400px]" />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={filterProgram + searchTerm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredOrgs.map((org) => (
              <motion.div key={org.slug} variants={itemVariants}>
                <OrgCard {...org} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && filteredOrgs.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-48 glass rounded-[3rem] border-border"
        >
          <span className="text-8xl mb-8 block grayscale opacity-50">🧭</span>
          <h3 className="text-3xl font-black text-foreground mb-4 italic tracking-tight">No Matches Found</h3>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto">
            Try adjusting your search or switching to a different program.
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setFilterProgram(''); }}
            className="mt-10 text-primary font-black hover:text-foreground transition-colors underline decoration-2 underline-offset-8"
          >
            Clear All Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function OrgsPage() {
  return (
    <main className="min-h-screen bg-background relative">
       {/* High-Fi Mesh Background */}
       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[180px] rounded-full animate-mesh-gradient [animation-delay:6s]" />
      </div>

      <div className="relative z-10">
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => <div key={i} className="skeleton h-[400px]" />)}
          </div>
        }>
          <OrgsContent />
        </Suspense>
      </div>
    </main>
  );
}
