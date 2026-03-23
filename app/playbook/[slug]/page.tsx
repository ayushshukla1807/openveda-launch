'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import ReactMarkdown from 'react-markdown';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const supabase = createBrowserSupabaseClient();


interface GitHubIssue {
  id: number;
  html_url: string;
  title: string;
  number: number;
  user: { login: string };
}

interface PlaybookData {
  id: string; // Add id
  name: string;
  repo_path: string | null;
  content: string;
  logo_url: string | null;
}


function LiveIssues({ repoPath }: { repoPath: string | null }) {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoPath) return;
    async function fetchIssues() {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}/issues?labels=good%20first%20issue&state=open&per_page=3&sort=updated`);
        if (res.ok) {
          const data = await res.json();
          setIssues(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchIssues();
  }, [repoPath]);

  if (!repoPath) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-4">Live Opportunities</h3>
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map(i => <div key={i} className="h-20 bg-muted rounded-2xl" />)}
        </div>
      ) : issues.length > 0 ? (
        issues.map((issue) => (
          <a
            href={issue.html_url}
            key={issue.id}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 glass rounded-2xl border-border hover:border-primary/30 transition-all group"
          >
            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {issue.title}
            </p>
            <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
              <span>#{issue.number}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{issue.user.login}</span>
            </div>
          </a>
        ))
      ) : (
        <div className="p-6 glass rounded-2xl text-center border-dashed border-border">
          <p className="text-xs font-bold text-muted-foreground leading-relaxed">No active "Good First Issues" found.</p>
        </div>
      )}
    </div>
  );
}

function TableOfContents({ content }: { content: string }) {
  const headings = content.match(/^#+\s+.+$/gm) || [];
  
  return (
    <nav className="space-y-2">
      <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-4">On this page</h3>
      {headings.map((h, i) => {
        const level = h.split(' ')[0].length;
        const text = h.replace(/^#+\s+/, '');
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
        return (
          <a
            key={i}
            href={`#${id}`}
            className={`block text-sm font-bold transition-all hover:text-primary ${
              level === 1 ? 'text-foreground text-base mb-2' : 
              level === 2 ? 'text-muted-foreground ml-0' : 
              'text-muted-foreground/60 ml-4 border-l border-border pl-4'
            }`}
          >
            {text}
          </a>
        );
      })}
    </nav>
  );
}

export default function PlaybookPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [data, setData] = useState<PlaybookData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: orgData } = await supabase
        .from('organizations')
        .select('id, name, repo_path, logo_url')
        .eq('slug', params.slug)
        .single();

      if (!orgData) {
        notFound();
        return;
      }

      const { data: playbookData } = await supabase
        .from('playbooks')
        .select('content_markdown')
        .eq('org_id', orgData.id)
        .single();

      setData({
        id: orgData.id,
        name: orgData.name,
        repo_path: orgData.repo_path,
        content: playbookData?.content_markdown || '# Playbook is coming soon!\nWe are currently curating the best practices for this organization.',
        logo_url: orgData.logo_url
      });
      setLoading(false);
    }
    fetchData();
  }, [params.slug]);

  const saveProposal = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !data) return;
    
    const proposalTitle = `GSoC 2026 Proposal Draft: ${data.name}`;
    const proposalContent = `# GSoC 2026 Proposal Checklist: ${data.name}\n\nGenerated via OpenVeda.in - The GSoC Launchpad\n\n## 1. Project Selection\n- [ ] Research the 2026 projects list for ${data.name}\n- [ ] Identify a project that matches your tech stack\n\n## 2. Architecture Analysis (Pre-filled for ${data.name})\n${data.content.split('## 2.')[1]?.split('---')[0] || ''}\n\n## 3. The Unwritten Rules\n${data.content.split('## 7.')[1] || ''}`;

    await supabase.from('user_proposals').upsert({
      user_id: user.id,
      org_id: (data as any).id,
      title: proposalTitle,
      content_markdown: proposalContent,
      updated_at: new Date().toISOString()
    });
  };

  if (loading) return (
    <main className="min-h-screen bg-background text-foreground relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-32 flex flex-col lg:flex-row gap-16 relative z-10">
        <div className="lg:w-2/3 space-y-12">
          <div className="skeleton w-32 h-4" />
          <div className="skeleton w-full h-32" />
          <div className="skeleton w-full h-[600px] rounded-[3rem]" />
        </div>
        <aside className="lg:w-1/3 space-y-12">
          <div className="skeleton w-full h-64 rounded-[2.5rem]" />
          <div className="skeleton w-full h-96 rounded-[2.5rem]" />
        </aside>
      </div>
    </main>
  );

  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <nav className="sticky top-4 z-50 mx-auto max-w-5xl px-4">
        <div className="glass rounded-[2rem] px-8 py-4 flex items-center justify-between border-border shadow-2xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground"
            >
              ←
            </button>
            <div className="h-6 w-[1px] bg-border mx-2" />
            <h2 className="font-black tracking-tight text-lg">{data.name}</h2>
          </div>
          <Link 
            href={`/dashboard`}
            className="bg-primary text-primary-foreground font-black px-6 py-2.5 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Track Progress
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 flex flex-col lg:flex-row gap-16 relative z-10">
        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-16">
              <span className="text-primary font-black text-xs uppercase tracking-widest mb-4 block">Contributor Playbook</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-8">
                Master <span className="text-muted-foreground/30 italic">{data.name}</span>
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground font-bold">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Community Verified
                </span>
                <span>•</span>
                <span>Updated Feb 2026</span>
              </div>
            </div>

            <article className="prose dark:prose-invert lg:prose-2xl max-w-none 
              prose-headings:font-black prose-headings:tracking-tight 
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-medium
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-black
              prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-[2rem]
              prose-img:rounded-[2.5rem] prose-img:border prose-img:border-border
            ">
              <ReactMarkdown 
                components={{
                  h1: ({node, ...props}) => <h1 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} {...props} />,
                  h2: ({node, ...props}) => <h2 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} {...props} />,
                  h3: ({node, ...props}) => <h3 id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} {...props} />,
                }}
              >
                {data.content}
              </ReactMarkdown>
            </article>

            <div className="mt-32 p-12 glass rounded-[3rem] border-primary/20 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] group-hover:bg-primary/20 transition-colors" />
              <h2 className="text-4xl font-black mb-6 italic tracking-tight underline cursor-pointer decoration-primary decoration-4 underline-offset-8">
                Ready to apply for GSoC 2026?
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-medium">
                Generating a professional proposal is the hardest part. Let us do the heavy lifting for you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={async () => {
                    await saveProposal();
                    const blob = new Blob([`# GSoC 2026 Proposal Checklist: ${data.name}\n\nGenerated via OpenVeda.in - The GSoC Launchpad\n\n## 1. Project Selection\n- [ ] Research the 2026 projects list for ${data.name}\n- [ ] Identify a project that matches your tech stack\n\n## 2. Architecture Analysis (Pre-filled for ${data.name})\n${data.content.split('## 2.')[1]?.split('---')[0] || ''}\n\n## 3. The Unwritten Rules\n${data.content.split('## 7.')[1] || ''}`], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${data.name.replace(/\s+/g, '_')}_GSoC_Proposal_Template.md`;
                    a.click();
                  }}
                  className="bg-primary text-primary-foreground font-black px-12 py-5 rounded-3xl text-sm uppercase tracking-[0.2em] hover:scale-110 transition-transform active:scale-95 flex items-center gap-3"
                >
                  <span>Export Proposal Template</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                
                <Link 
                  href="https://calendly.com/ayush-shukla-adypu/30min"
                  target="_blank"
                  className="bg-muted text-foreground font-black px-12 py-5 rounded-3xl text-sm uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all border border-border"
                >
                  Book Mentor Session
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <aside className="lg:w-1/3 lg:sticky lg:top-32 h-fit space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="p-8 glass rounded-[2.5rem] border-border">
              <TableOfContents content={data.content} />
            </div>

            <div className="p-8 glass rounded-[2.5rem] border-border">
              <LiveIssues repoPath={data.repo_path} />
            </div>

            <div className="p-8 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-[2.5rem] border border-border">
              <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-4">Contribution Tip</h3>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed italic">
                "Finding a small typo or documentation bug is the best way to get your first PR merged. Don't go for big features immediately."
              </p>
            </div>
          </motion.div>
        </aside>
      </div>

      <footer className="mt-40 py-20 border-t border-border text-center">
        <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.5em] mb-4">OpenVeda.in</p>
        <p className="text-xs text-muted-foreground font-bold tracking-widest">© 2026 • BUILT FOR IMPACT</p>
      </footer>
    </main>
  );
}