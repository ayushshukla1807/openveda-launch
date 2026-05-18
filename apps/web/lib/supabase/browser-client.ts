// lib/supabase/browser-client.ts

import gsocOrgsRaw from '../../../../gsoc_2026_orgs.json';

// Local static lists for offline-first resilient architecture
const staticProgramsOrgs = [
  { name: 'Linux Kernel', slug: 'linux-kernel', tech_stack: ['C', 'Assembly', 'Make'], program: 'LFX', repo_path: 'torvalds/linux', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg', description: 'The core of the Linux operating system. Master device drivers, memory management, and file systems.' },
  { name: 'Kubernetes', slug: 'kubernetes', tech_stack: ['Go', 'Bash', 'Docker'], program: 'LFX', repo_path: 'kubernetes/kubernetes', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg', description: 'Production-grade container orchestration. Scale containerized deployments across multi-cloud environments.' },
  { name: 'Cloud Native Computing Foundation', slug: 'cncf', tech_stack: ['Go', 'Rust', 'Cloud'], program: 'LFX', repo_path: 'cncf/sandbox', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Cloud_Native_Computing_Foundation_logo.svg', description: 'Fostering and sustaining an ecosystem of open source, vendor-neutral projects under Linux Foundation.' },
  { name: 'GNOME', slug: 'gnome', tech_stack: ['C', 'Rust', 'Python', 'GTK'], program: 'Outreachy', repo_path: 'GNOME/gnome-shell', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/GNOME_logo.svg', description: 'The premier desktop environment for the desktop Linux community worldwide.' },
  { name: 'Fedora', slug: 'fedora', tech_stack: ['Python', 'Shell', 'C', 'Ansible'], program: 'Outreachy', repo_path: 'fedora-infra/fedora-messaging', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg', description: 'A community-driven, cutting-edge Linux distribution and operating system ecosystem.' },
  { name: 'OpenTelemetry', slug: 'opentelemetry', tech_stack: ['Go', 'Java', 'Python', 'Collector'], program: 'Outreachy', repo_path: 'open-telemetry/opentelemetry-collector', logo_url: 'https://raw.githubusercontent.com/open-telemetry/opentelemetry.io/main/icon.svg', description: 'A collection of tools, APIs, and SDKs to capture cloud-native observability metrics.' },
  { name: 'OpenSource Health', slug: 'os-health', tech_stack: ['React', 'Node.js', 'PostgreSQL'], program: 'ESOC 2026', repo_path: 'os-health/core', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=OH', description: 'Building open tools for community healthcare and patient records in Europe.' },
  { name: 'GreenCode', slug: 'greencode', tech_stack: ['Python', 'D3.js', 'EarthData'], program: 'ESOC 2026', repo_path: 'greencode/pipeline', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=GC', description: 'Open data pipelines and mapping platforms for environmental and climate monitoring.' }
];

const parsedGsocOrgs = gsocOrgsRaw.map((org: any) => ({
  name: org.name,
  slug: org.slug,
  tech_stack: org.slug === 'appsmith' ? ['Java', 'Spring Boot', 'React', 'TypeScript', 'MongoDB'] : (org.tech_stack || []),
  program: 'GSoC 2026',
  repo_path: org.slug === 'appsmith' ? 'appsmithorg/appsmith' : null,
  logo_url: org.slug === 'appsmith' ? 'https://avatars.githubusercontent.com/u/53011310?s=200&v=4' : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(org.name)}`,
  description: `Master high-impact contributions to ${org.name} for GSoC 2026 and standard release cycles.`
}));

const MASTER_ORGS_LIST = [...staticProgramsOrgs, ...parsedGsocOrgs].map((org, index) => ({
  id: `static-org-uuid-${index}`,
  ...org
}));

class QueryBuilder {
  table: string;
  operation: 'select' | 'insert' | 'update' | 'delete' | 'upsert';
  payload: any;
  filters: Array<{ field: string; val: any }>;
  ordering: { field: string; ascending: boolean } | null = null;
  isSingle: boolean = false;

  constructor(table: string, operation: 'select' | 'insert' | 'update' | 'delete' | 'upsert' = 'select', payload: any = null) {
    this.table = table;
    this.operation = operation;
    this.payload = payload;
    this.filters = [];
  }

  eq(field: string, val: any) {
    this.filters.push({ field, val });
    return this;
  }

  ilike(field: string, val: any) {
    this.filters.push({ field, val });
    return this;
  }

  order(field: string, options: any = {}) {
    this.ordering = { field, ascending: options.ascending !== false };
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  async then(resolve: any) {
    let data: any = null;
    let error: any = null;

    try {
      if (this.table === 'organizations') {
        const programFilter = this.filters.find(f => f.field === 'program');
        if (programFilter && programFilter.val) {
          data = MASTER_ORGS_LIST.filter(org => org.program.toLowerCase() === programFilter.val.toLowerCase());
        } else {
          data = MASTER_ORGS_LIST;
        }
      } 
      
      else if (this.table === 'user_proposals') {
        const stored = localStorage.getItem('openveda_proposals') || '[]';
        let proposals = JSON.parse(stored);

        if (this.operation === 'select') {
          const userFilter = this.filters.find(f => f.field === 'user_id');
          if (userFilter) {
            proposals = proposals.filter((p: any) => p.user_id === userFilter.val);
          }
          // Populate organization details
          data = proposals.map((p: any) => {
            const org = MASTER_ORGS_LIST.find(o => o.id === p.org_id || o.slug === p.org_id);
            return {
              ...p,
              organizations: org || { name: 'Starred Org' }
            };
          });
        } 
        
        else if (this.operation === 'insert') {
          const newProposal = {
            id: 'proposal-uuid-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: 'draft',
            ...this.payload
          };
          proposals.push(newProposal);
          localStorage.setItem('openveda_proposals', JSON.stringify(proposals));
          data = [newProposal];
        } 
        
        else if (this.operation === 'update') {
          const idFilter = this.filters.find(f => f.field === 'id');
          if (idFilter) {
            proposals = proposals.map((p: any) => {
              if (p.id === idFilter.val) {
                return { ...p, ...this.payload, updated_at: new Date().toISOString() };
              }
              return p;
            });
            localStorage.setItem('openveda_proposals', JSON.stringify(proposals));
            data = proposals.filter((p: any) => p.id === idFilter.val);
          }
        } 
        
        else if (this.operation === 'delete') {
          const idFilter = this.filters.find(f => f.field === 'id');
          if (idFilter) {
            proposals = proposals.filter((p: any) => p.id !== idFilter.val);
            localStorage.setItem('openveda_proposals', JSON.stringify(proposals));
            data = [];
          }
        }
      } 
      
      else if (this.table === 'user_stars') {
        const stored = localStorage.getItem('openveda_stars') || '[]';
        let stars = JSON.parse(stored);

        if (this.operation === 'select') {
          const userFilter = this.filters.find(f => f.field === 'user_id');
          if (userFilter) {
            stars = stars.filter((s: any) => s.user_id === userFilter.val);
          }
          data = stars.map((s: any) => {
            const org = MASTER_ORGS_LIST.find(o => o.id === s.org_id || o.slug === s.org_slug);
            return {
              ...s,
              organizations: org || { name: s.org_slug, slug: s.org_slug }
            };
          });
        } 
        
        else if (this.operation === 'insert') {
          const newStar = {
            id: 'star-uuid-' + Date.now(),
            created_at: new Date().toISOString(),
            ...this.payload
          };
          // Avoid duplicate stars
          const isDup = stars.some((s: any) => s.user_id === newStar.user_id && s.org_id === newStar.org_id);
          if (!isDup) {
            stars.push(newStar);
            localStorage.setItem('openveda_stars', JSON.stringify(stars));
          }
          data = [newStar];
        } 
        
        else if (this.operation === 'delete') {
          const userFilter = this.filters.find(f => f.field === 'user_id');
          const orgFilter = this.filters.find(f => f.field === 'org_id');
          if (userFilter && orgFilter) {
            stars = stars.filter((s: any) => !(s.user_id === userFilter.val && s.org_id === orgFilter.val));
            localStorage.setItem('openveda_stars', JSON.stringify(stars));
            data = [];
          }
        }
      } 
      
      else if (this.table === 'user_progress') {
        const progressCookie = document.cookie.split('; ').find(row => row.startsWith('openveda_progress='));
        const completed = progressCookie ? JSON.parse(decodeURIComponent(progressCookie.split('=')[1])) : [];
        data = { completed_steps: completed };
      }
    } catch (err: any) {
      error = err;
    }

    if (this.isSingle && Array.isArray(data)) {
      data = data[0] || null;
    }

    resolve({ data, error });
  }
}

class BrowserMockSupabaseClient {
  auth = {
    getUser: async () => {
      if (typeof window === 'undefined') return { data: { user: null }, error: null };
      const userStr = localStorage.getItem('openveda_user');
      if (!userStr) return { data: { user: null }, error: null };
      return { data: { user: JSON.parse(userStr) }, error: null };
    },
    
    getSession: async () => {
      if (typeof window === 'undefined') return { data: { session: null }, error: null };
      const userStr = localStorage.getItem('openveda_user');
      if (!userStr) return { data: { session: null }, error: null };
      const userObj = JSON.parse(userStr);
      return { data: { session: { user: userObj, access_token: 'mock-jwt-token' } }, error: null };
    },
    
    signInWithPassword: async ({ email }: { email: string }) => {
      const mockUser = {
        id: 'mock-user-uuid-12345678',
        email: email || 'demo@openveda.in',
        user_metadata: { 
          full_name: 'Demo Contributor', 
          avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Demo' 
        }
      };
      localStorage.setItem('openveda_user', JSON.stringify(mockUser));
      // Write Cookie for server components
      document.cookie = `openveda_session=${encodeURIComponent(JSON.stringify(mockUser))}; path=/; max-age=31536000; SameSite=Lax`;
      
      return { data: { user: mockUser, session: { user: mockUser } }, error: null };
    },
    
    signUp: async ({ email }: { email: string }) => {
      const mockUser = {
        id: 'mock-user-uuid-12345678',
        email: email || 'demo@openveda.in',
        user_metadata: { 
          full_name: 'Demo Contributor', 
          avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Demo' 
        }
      };
      localStorage.setItem('openveda_user', JSON.stringify(mockUser));
      // Write Cookie for server components
      document.cookie = `openveda_session=${encodeURIComponent(JSON.stringify(mockUser))}; path=/; max-age=31536000; SameSite=Lax`;
      
      return { data: { user: mockUser, session: { user: mockUser } }, error: null };
    },
    
    signOut: async () => {
      localStorage.removeItem('openveda_user');
      document.cookie = 'openveda_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return { error: null };
    },
    
    onAuthStateChange: (callback: any) => {
      // Execute callback immediately with current mock session
      if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('openveda_user');
        if (userStr) {
          const user = JSON.parse(userStr);
          callback('SIGNED_IN', { user });
        } else {
          callback('SIGNED_OUT', null);
        }
      }
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  };

  from(table: string) {
    return {
      select: (columns: string = '*') => {
        return new QueryBuilder(table, 'select');
      },
      insert: (payload: any) => {
        return new QueryBuilder(table, 'insert', payload);
      },
      update: (payload: any) => {
        return new QueryBuilder(table, 'update', payload);
      },
      delete: () => {
        return new QueryBuilder(table, 'delete');
      },
      upsert: (payload: any) => {
        return new QueryBuilder(table, 'upsert', payload);
      }
    };
  }
}

export const createBrowserSupabaseClient = () => {
  return new BrowserMockSupabaseClient() as any;
};