import { supabase } from '@/lib/supabase/client'; // Assuming this is your correct client path
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import React from 'react'; // Import React for Suspense

// Define the shape of a GitHub issue
interface GitHubIssue {
  id: number;
  html_url: string;
  title: string;
  number: number;
  user: { login: string; };
}

// This is our self-contained component for fetching and displaying live issues.
async function LiveIssues({ repoPath }: { repoPath: string | null }) {
  if (!repoPath) {
    return <div className="text-center p-8 text-muted-foreground">Live issue tracking not configured for this org.</div>;
  }
  if (!process.env.GITHUB_TOKEN) {
    console.error("GITHUB_TOKEN is not set in .env.local");
    return <div className="text-center p-8 text-red-500">Server configuration error: GITHUB_TOKEN is missing.</div>;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}/issues?labels=good first issue&state=open&per_page=5&sort=updated`, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) {
      console.error(`GitHub API Error for ${repoPath}: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error("Error Body:", errorBody);
      return <div className="text-center p-8 text-red-500">Could not load issues from GitHub. Check repo path or API token.</div>;
    }
    
    const issues: GitHubIssue[] = await res.json();
    
    return (
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Live "Good First Issues"</h2>
        <div className="space-y-4">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <a href={issue.html_url} key={issue.id} target="_blank" rel="noopener noreferrer" className="block p-6 bg-card border border-gray-700 rounded-lg hover:border-primary transition-all">
                <p className="font-semibold text-lg text-card-foreground">{issue.title}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <span>#{issue.number} by {issue.user.login}</span>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center p-8 bg-card border border-gray-700 rounded-lg">
              <p className="text-muted-foreground">No "Good First Issues" with that label found for this repository right now. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("GitHub API Error:", error);
    return <div className="mt-16 text-center p-8 text-red-500">An unexpected error occurred while fetching issues.</div>;
  }
}

async function getPlaybookData(slug: string) {
  const { data: orgData } = await supabase.from('organizations').select('id, name, repo_path').eq('slug', slug).single();
  if (!orgData) return null;
  
  const { data: playbookData } = await supabase.from('playbooks').select('content_markdown').eq('org_id', orgData.id).single();
  
  return {
    name: orgData.name,
    repo_path: orgData.repo_path,
    content: playbookData?.content_markdown || "### Playbook content is coming soon!",
  };
}

export default async function PlaybookPage({ params }: { params: { slug: string } }) {
  const playbook = await getPlaybookData(params.slug);
  if (!playbook) notFound();

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">{playbook.name}</h1>
          <p className="mt-2 text-lg text-gray-400">Your OpenVeda Playbook</p>
        </div>
        
        <article className="prose prose-invert lg:prose-xl max-w-none prose-a:text-green-400">
          <ReactMarkdown>{playbook.content}</ReactMarkdown>
        </article>

        <React.Suspense fallback={<div className="mt-16 text-center text-gray-400 animate-pulse">Loading live issues...</div>}>
          <LiveIssues repoPath={playbook.repo_path} />
        </React.Suspense>

        <div className="mt-16 text-center bg-gray-800 border border-green-500 rounded-lg p-8">
          <h2 className="text-3xl font-bold">Stuck? Get Unstuck. Now.</h2>
          <p className="mt-4 text-gray-300">As the founder of OpenVeda, I'm personally offering free 1-on-1 help sessions.</p>
          <Link href="https://calendly.com/ayush-shukla-adypu/30min" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600">
            Book a Free Session with Ayush
          </Link>
        </div>
      </main>
    </div>
  );
}