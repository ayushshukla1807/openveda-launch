'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import OrgCard from '@/components/ui/OrgCard';
import { motion } from 'framer-motion';
import { FixedSizeList as List } from 'react-window';
import gsocOrgsRaw from '../../../../gsoc_2026_orgs.json';

const supabase = createBrowserSupabaseClient();

// High-fidelity static seeding mapping to ensure the application is 100% loaded
const staticProgramsOrgs = [
  // LFX
  {
    name: 'Linux Kernel',
    slug: 'linux-kernel',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
    tech_stack: ['C', 'Assembly', 'Make', 'Kernel'],
    program: 'LFX',
    description: 'The core of the Linux operating system. Master device drivers, memory management, and file systems.',
    repo_path: 'torvalds/linux'
  },
  {
    name: 'Kubernetes',
    slug: 'kubernetes',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg',
    tech_stack: ['Go', 'Bash', 'Docker', 'Kubernetes'],
    program: 'LFX',
    description: 'Production-grade container orchestration. Scale containerized deployments across multi-cloud environments.',
    repo_path: 'kubernetes/kubernetes'
  },
  {
    name: 'Cloud Native Computing Foundation',
    slug: 'cncf',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Cloud_Native_Computing_Foundation_logo.svg',
    tech_stack: ['Go', 'Rust', 'Cloud', 'Prometheus', 'Envoy'],
    program: 'LFX',
    description: 'Fostering and sustaining an ecosystem of open source, vendor-neutral projects under Linux Foundation.',
    repo_path: 'cncf/sandbox'
  },
  // Outreachy
  {
    name: 'GNOME',
    slug: 'gnome',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/GNOME_logo.svg',
    tech_stack: ['C', 'Rust', 'Python', 'GTK'],
    program: 'Outreachy',
    description: 'The premier desktop environment for the desktop Linux community worldwide.',
    repo_path: 'GNOME/gnome-shell'
  },
  {
    name: 'Fedora',
    slug: 'fedora',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg',
    tech_stack: ['Python', 'Shell', 'C', 'Ansible'],
    program: 'Outreachy',
    description: 'A community-driven, cutting-edge Linux distribution and operating system ecosystem.',
    repo_path: 'fedora-infra/fedora-messaging'
  },
  {
    name: 'OpenTelemetry',
    slug: 'opentelemetry',
    logo_url: 'https://raw.githubusercontent.com/open-telemetry/opentelemetry.io/main/icon.svg',
    tech_stack: ['Go', 'Java', 'Python', 'Collector'],
    program: 'Outreachy',
    description: 'A collection of tools, APIs, and SDKs to capture cloud-native observability metrics.',
    repo_path: 'open-telemetry/opentelemetry-collector'
  },
  // ESOC 2027
  {
    name: 'OpenSource Health',
    slug: 'os-health',
    logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=OH',
    tech_stack: ['React', 'Node.js', 'PostgreSQL'],
    program: 'ESOC 2027',
    description: 'Building open tools for community healthcare and patient records in Europe.',
    repo_path: 'os-health/core'
  },
  {
    name: 'GreenCode',
    slug: 'greencode',
    logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=GC',
    tech_stack: ['Python', 'D3.js', 'EarthData'],
    program: 'ESOC 2027',
    description: 'Open data pipelines and mapping platforms for environmental and climate monitoring.',
    repo_path: 'greencode/pipeline'
  }
];

// Clean GSoC 2027 JSON seed mappings
const parsedGsocOrgs = gsocOrgsRaw.map((org: any) => ({
  name: org.name,
  slug: org.slug,
  logo_url: org.slug === 'appsmith'
    ? 'https://avatars.githubusercontent.com/u/53011310?s=200&v=4'
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(org.name)}`,
  tech_stack: org.slug === 'appsmith' 
    ? ['Java', 'Spring Boot', 'React', 'TypeScript', 'MongoDB']
    : (org.tech_stack || []),
  program: 'GSoC 2027',
  is_active_year_round: true,
  description: `Master high-impact contributions to ${org.name} for GSoC 2027 and standard release cycles.`,
  repo_path: org.slug === 'appsmith' ? 'appsmithorg/appsmith' : null
}));

// Master Seed List combining all sources
const MASTER_ORGS_LIST = [...staticProgramsOrgs, ...parsedGsocOrgs];

// High-performance virtualized grid for 200+ orgs
function VirtualizedOrgGrid({ orgs }: { orgs: any[] }) {
  const columnCount = 3; // Standard for desktop
  const rowCount = Math.ceil(orgs.length / columnCount);

  const Row = ({ index, style }: any) => {
    const startIndex = index * columnCount;
    const rowOrgs = orgs.slice(startIndex, startIndex + columnCount);

    return (
      <div style={style} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {rowOrgs.map((org) => (
          <div key={org.slug} className="h-full">
            <OrgCard {...org} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <List
      height={900}
      itemCount={rowCount}
      itemSize={480} // Approx size of OrgCard + gap
      width="100%"
      className="scrollbar-hide"
    >
      {Row}
    </List>
  );
}

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
      try {
        // Query remote database
        let query = supabase.from('organizations').select('name, slug, logo_url, tech_stack, program, is_active_year_round, description, repo_path').order('name');
        if (filterProgram) {
          query = query.ilike('program', filterProgram);
        }
        const { data: dbOrgs } = await query;
        
        // Merge database orgs with master local seeds to avoid empty databases!
        const mergedMap = new Map();
        
        // Load master seeds first
        MASTER_ORGS_LIST.forEach(org => {
          if (!filterProgram || org.program.toLowerCase() === filterProgram.toLowerCase()) {
            mergedMap.set(org.slug, org);
          }
        });
        
        // Override or append database orgs
        if (dbOrgs && dbOrgs.length > 0) {
          dbOrgs.forEach((org: any) => {
            mergedMap.set(org.slug, {
              ...mergedMap.get(org.slug),
              ...org
            });
          });
        }
        
        const finalOrgs = Array.from(mergedMap.values()).sort((a, b) => a.name.localeCompare(b.name));
        setOrganizations(finalOrgs);
      } catch (err) {
        console.error("Fetch orgs error, falling back to static seeds:", err);
        // Direct static seed fallback if network fails
        const filteredStatic = MASTER_ORGS_LIST.filter(org => 
          !filterProgram || org.program.toLowerCase() === filterProgram.toLowerCase()
        ).sort((a, b) => a.name.localeCompare(b.name));
        setOrganizations(filteredStatic);
      } finally {
        setIsLoading(false);
      }
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
          Expertly curated for GSoC 2027, LFX, Outreachy, and ESOC.
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
            <option value="GSoC 2027">GSoC 2027</option>
            <option value="LFX">LFX Mentorship</option>
            <option value="Outreachy">Outreachy</option>
            <option value="ESOC 2027">ESOC 2027</option>
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
        <div className="h-[900px] w-full mt-10">
          {filteredOrgs.length > 0 ? (
            <VirtualizedOrgGrid orgs={filteredOrgs} />
          ) : null}
        </div>
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
