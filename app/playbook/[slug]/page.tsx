import { createServerSupabaseClient } from '@/lib/supabase/client';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

// --- Types ---
interface GitHubIssue {
  id: number;
  html_url: string;
  title: string;
  number: number;
  user: { login: string };
}
interface PlaybookData {
  name: string;
  repo_path: string | null;
  content: string;
}
interface OrgDetailPageProps {
  params: Promise<{ slug: string }>;
}
// --- End Types ---

// --- LiveIssuesList Component ---
async function LiveIssuesList({ repoPath }: { repoPath: string | null }) {
  if (!repoPath || !process.env.GITHUB_TOKEN) {
    return null;
  }
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repoPath}/issues?labels=good%20first%20issue&state=open&per_page=5&sort=updated`,
      {
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error(`GitHub API failed with status: ${res.status}`);
    const issues: GitHubIssue[] = await res.json();

    return (
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Live "Good First Issues"
        </h2>
        <div className="space-y-4">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <a
                href={issue.html_url}
                key={issue.id}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 transition-all"
              >
                <p className="font-semibold text-lg text-white">{issue.title}</p>
                <div className="flex items-center text-sm text-gray-400 mt-2">
                  <span>
                    #{issue.number} by {issue.user.login}
                  </span>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center p-8 bg-gray-800 border border-gray-700 rounded-lg">
              <p className="text-gray-400">
                No "Good First Issues" found for this repository right now.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('GitHub API Error:', error);
    return (
      <div className="mt-16 text-center p-8 text-red-500">
        Could not load live issues from GitHub.
      </div>
    );
  }
}
// --- End LiveIssuesList ---

// --- Data Fetching Function ---
async function getPlaybookData(slug: string): Promise<PlaybookData | null> {
  const supabase = await createServerSupabaseClient();

  const { data: orgData } = await supabase
    .from('organizations')
    .select('id, name, repo_path')
    .eq('slug', slug)
    .single();

  if (!orgData) return null;

  const { data: playbookData } = await supabase
    .from('playbooks')
    .select('content_markdown')
    .eq('org_id', orgData.id)
    .single();

  return {
    name: orgData.name,
    repo_path: orgData.repo_path,
    content: playbookData?.content_markdown || '### Playbook content is coming soon!',
  };
}
// --- End Data Fetching ---

// --- Main Page Component ---
export default async function OrganizationDetailPage({ params }: OrgDetailPageProps) {
  // Await the params promise before accessing the slug
  const resolvedParams = await params;
  const playbook = await getPlaybookData(resolvedParams.slug);

  if (!playbook) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">{playbook.name}</h1>
          <p className="mt-2 text-lg text-gray-400">Your OpenVeda Playbook</p>
        </div>

        {/* Playbook Content */}
        <article className="prose prose-invert lg:prose-xl max-w-none prose-a:text-green-400">
          <ReactMarkdown>{playbook.content}</ReactMarkdown>
        </article>

        {/* Live Issues List */}
        <React.Suspense
          fallback={
            <div className="mt-16 text-center text-gray-400 animate-pulse">
              Loading live issues...
            </div>
          }
        >
          <LiveIssuesList repoPath={playbook.repo_path} />
        </React.Suspense>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gray-800 border border-green-500 rounded-lg p-8">
          <h2 className="text-3xl font-bold">Stuck? Get Unstuck. Now.</h2>
          <p className="mt-4 text-gray-300">
            Our Org Specialist Mentors are here to help. Book a free 15-minute
            session.
          </p>
          <Link
            href="https://calendly.com/ayush-shukla-adypu/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600"
          >
            Book a Free Session
          </Link>
        </div>
      </main>
    </div>
  );
}

// // app/orgs/playbook/[slug]/page.tsx

// // ... (all imports and functions remain the same) ...

// export default async function OrganizationDetailPage({ params }: OrgDetailPageProps) {
//     const playbook = await getPlaybookData(params.slug);
    
//     if (!playbook) {
//         notFound();
//     }

//     return (
//         <div className="min-h-screen bg-black text-white">
//             <main className="max-w-4xl mx-auto px-4 py-12">
                
//                 <div className="text-center mb-12">
//                     <h1 className="text-5xl font-bold">{playbook.name}</h1>
//                     <p className="mt-2 text-lg text-gray-400">Your OpenVeda Playbook</p>
//                 </div>
                
//                 {/* Playbook Content */}
//                 <article className="prose prose-invert lg:prose-xl max-w-none prose-a:text-green-400">
//                     <ReactMarkdown>{playbook.content}</ReactMarkdown>
//                 </article>
                
//                 {/* TEMPORARILY COMMENT OUT THE GITHUB/SUSPENSE SECTION */}
//                 {/* 
//                 <React.Suspense fallback={<div className="mt-16 text-center text-gray-400 animate-pulse">Loading live issues...</div>}>
//                     <LiveIssuesList repoPath={playbook.repo_path} /> 
//                 </React.Suspense>
//                 */}
                
//                 {/* Call to Action */}
//                 <div className="mt-16 text-center bg-gray-800 border border-green-500 rounded-lg p-8">
//                     <h2 className="text-3xl font-bold">Stuck? Get Unstuck. Now.</h2>
//                     <p className="mt-4 text-gray-300">Our Org Specialist Mentors are here to help. Book a free 15-minute session.</p>
//                     <Link 
//                         href="https://calendly.com/ayush-shukla-adypu/30min" 
//                         target="_blank" 
//                         rel="noopener noreferrer" 
//                         className="mt-6 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600"
//                     >
//                         Book a Free Session
//                     </Link>
//                 </div>
//             </main>
//         </div>
//     );
// }


// // // app/orgs/playbook/[slug]/page.tsx (Temporary Debugging Function)

// // import { createServerSupabaseClient } from '@/lib/supabase/client';
// // import { notFound } from 'next/navigation';

// // async function getPlaybookData(slug: string) {
// //   try {
// //     const supabase = await createServerSupabaseClient(); 

// //     const { data: orgData, error } = await supabase
// //       .from('organizations')
// //       .select('id, name, repo_path')
// //       .eq('slug', slug)
// //       .single();

// //     if (error) {
// //       console.error("SUPABASE ERROR:", error);
// //       // THROW an error to see if Next.js catches and displays it
// //       throw new Error("Supabase Query Failed");
// //     }

// //     if (!orgData) return null; // Returns null if not found

// //     // Return only the basic data for now
// //     return { name: orgData.name, repo_path: orgData.repo_path, content: `Organization ${orgData.name} loaded.` };
  
// //   } catch (e) {
// //     // If the client creation or any other step fails, log it
// //     console.error("CRITICAL DATA FETCH FAILURE:", e);
// //     return null; 
// //   }
// // }

// // export default async function PlaybookPage({ params }: { params: { slug: string } }) {
// //     const playbook = await getPlaybookData(params.slug);
    
// //     // Test point 1: If it is null, show 404
// //     if (!playbook) {
// //       console.log("Playbook Data is NULL, showing 404.");
// //       return notFound(); 
// //     }
    
// //     // Test point 2: If it reaches here, the data is available.
// //     console.log("Playbook Data Loaded:", playbook.name);

// //     // FIX: Simplified rendering to guarantee visibility of the main content
// //     return (
// //         <div className="min-h-screen bg-white"> 
// //             <main className="max-w-4xl mx-auto px-4 py-12">
// //                 <h1 className="text-5xl font-bold text-black">{playbook.name}</h1>
// //                 <p className="text-xl text-red-500">CONTENT LOADED SUCCESSFULLY!</p>
// //                 <pre style={{ backgroundColor: '#eee', padding: '10px', color: 'black' }}>
// //                     {JSON.stringify(playbook, null, 2)}
// //                 </pre>
// //             </main>
// //         </div>
// //     );
// // }






// // // app/orgs/[slug]/page.tsx

// // import { createServerSupabaseClient } from '@/lib/supabase/client';
// // import ReactMarkdown from 'react-markdown';
// // import { notFound } from 'next/navigation';
// // import Link from 'next/link';
// // import React from 'react';

// // // --- Types ---
// // interface GitHubIssue { 
// //     id: number; 
// //     html_url: string; 
// //     title: string; 
// //     number: number; 
// //     user: { login: string; }; 
// // }

// // interface PlaybookData { 
// //     name: string; 
// //     repo_path: string | null; 
// //     content: string; 
// // }

// // interface OrgDetailPageProps { 
// //     params: { 
// //         slug: string 
// //     } 
// // }
// // // --- End Types ---


// // // --- Component to fetch and display GitHub Issues (Server Component) ---
// // async function LiveIssuesList({ repoPath }: { repoPath: string | null }) {
// //     if (!repoPath || !process.env.GITHUB_TOKEN) { 
// //         return null; 
// //     }
    
// //     try {
// //         const res = await fetch(`https://api.github.com/repos/${repoPath}/issues?labels=good first issue&state=open&per_page=5&sort=updated`, {
// //             headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }, 
// //             next: { revalidate: 3600 }, 
// //         });
        
// //         if (!res.ok) throw new Error(`GitHub API failed with status: ${res.status}`);
        
// //         const issues: GitHubIssue[] = await res.json();
        
// //         return (
// //             <div className="mt-16">
// //                 <h2 className="text-3xl font-bold mb-6 text-center text-white">Live "Good First Issues"</h2>
// //                 <div className="space-y-4">
// //                     {issues.length > 0 ? (
// //                         issues.map((issue) => (
// //                             <a 
// //                                 href={issue.html_url} 
// //                                 key={issue.id} 
// //                                 target="_blank" 
// //                                 rel="noopener noreferrer" 
// //                                 className="block p-6 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 transition-all"
// //                             >
// //                                 <p className="font-semibold text-lg text-white">{issue.title}</p>
// //                                 <div className="flex items-center text-sm text-gray-400 mt-2">
// //                                     <span>#{issue.number} by {issue.user.login}</span>
// //                                 </div>
// //                             </a>
// //                         ))
// //                     ) : (
// //                         <div className="text-center p-8 bg-gray-800 border border-gray-700 rounded-lg">
// //                             <p className="text-gray-400">No "Good First Issues" found for this repository right now.</p>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         );
// //     } catch (error) {
// //         console.error("GitHub API Error:", error); 
// //         return (<div className="mt-16 text-center p-8 text-red-500">Could not load live issues from GitHub.</div>);
// //     }
// // }
// // // --- End GitHub Component ---


// // // --- Data Fetching Function ---
// // async function getPlaybookData(slug: string): Promise<PlaybookData | null> {
// //   const supabase = await createServerSupabaseClient(); 

// //   const { data: orgData } = await supabase
// //     .from('organizations')
// //     .select('id, name, repo_path')
// //     .eq('slug', slug)
// //     .single();

// //   if (!orgData) return null;

// //   const { data: playbookData } = await supabase
// //     .from('playbooks')
// //     .select('content_markdown')
// //     .eq('org_id', orgData.id)
// //     .single();
    
// //   return { 
// //       name: orgData.name, 
// //       repo_path: orgData.repo_path, 
// //       content: playbookData?.content_markdown || "### Playbook content is coming soon!" 
// //   };
// // }
// // // --- End Data Fetching ---


// // // --- Main Page Component ---
// // export default async function OrganizationDetailPage({ params }: OrgDetailPageProps) {
// //     const playbook = await getPlaybookData(params.slug);
    
// //     if (!playbook) {
// //         // This will trigger Next.js's built-in 404 page if no data is found
// //         notFound();
// //     }

// //     return (
// //         <div className="min-h-screen bg-black text-white">
// //             <main className="max-w-4xl mx-auto px-4 py-12">
                
// //                 <div className="text-center mb-12">
// //                     <h1 className="text-5xl font-bold">{playbook.name}</h1>
// //                     <p className="mt-2 text-lg text-gray-400">Your OpenVeda Playbook</p>
// //                 </div>
                
// //                 {/* Playbook Content */}
// //                 <article className="prose prose-invert lg:prose-xl max-w-none prose-a:text-green-400">
// //                     <ReactMarkdown>{playbook.content}</ReactMarkdown>
// //                 </article>
                
// //                 {/* Live Issues List (Wrapped in Suspense) */}
// //                 <React.Suspense fallback={<div className="mt-16 text-center text-gray-400 animate-pulse">Loading live issues...</div>}>
// //                     <LiveIssuesList repoPath={playbook.repo_path} /> 
// //                 </React.Suspense>
                
// //                 {/* Call to Action */}
// //                 <div className="mt-16 text-center bg-gray-800 border border-green-500 rounded-lg p-8">
// //                     <h2 className="text-3xl font-bold">Stuck? Get Unstuck. Now.</h2>
// //                     <p className="mt-4 text-gray-300">Our Org Specialist Mentors are here to help. Book a free 15-minute session.</p>
// //                     <Link 
// //                         href="https://calendly.com/ayush-shukla-adypu/30min" 
// //                         target="_blank" 
// //                         rel="noopener noreferrer" 
// //                         className="mt-6 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600"
// //                     >
// //                         Book a Free Session
// //                     </Link>
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // }

// // // app/orgs/[slug]/page.tsx (Assuming /orgs/[slug] is the correct path for the playbook)

// // import { createServerSupabaseClient } from '@/lib/supabase/client'; // FIX 1: Import the SERVER client helper
// // import ReactMarkdown from 'react-markdown';
// // import { notFound } from 'next/navigation';
// // import Link from 'next/link';
// // import React from 'react';

// // // --- Types ---
// // interface GitHubIssue { 
// //     id: number; 
// //     html_url: string; 
// //     title: string; 
// //     number: number; 
// //     user: { login: string; }; 
// // }

// // interface PlaybookData { 
// //     name: string; 
// //     repo_path: string | null; 
// //     content: string; 
// // }

// // interface OrgDetailPageProps { 
// //     params: { 
// //         slug: string 
// //     } 
// // }
// // // --- End Types ---


// // // --- Component to fetch and display GitHub Issues (Server Component) ---
// // async function LiveIssuesList({ repoPath }: { repoPath: string | null }) {
// //     if (!repoPath || !process.env.GITHUB_TOKEN) { 
// //         return null; 
// //     }
    
// //     try {
// //         const res = await fetch(`https://api.github.com/repos/${repoPath}/issues?labels=good first issue&state=open&per_page=5&sort=updated`, {
// //             headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }, 
// //             next: { revalidate: 3600 }, // Revalidate every hour
// //         });
        
// //         if (!res.ok) throw new Error(`GitHub API failed with status: ${res.status}`);
        
// //         const issues: GitHubIssue[] = await res.json();
        
// //         return (
// //             <div className="mt-16">
// //                 <h2 className="text-3xl font-bold mb-6 text-center">Live "Good First Issues"</h2>
// //                 <div className="space-y-4">
// //                     {issues.length > 0 ? (
// //                         issues.map((issue) => (
// //                             <a 
// //                                 href={issue.html_url} 
// //                                 key={issue.id} 
// //                                 target="_blank" 
// //                                 rel="noopener noreferrer" 
// //                                 className="block p-6 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 transition-all"
// //                             >
// //                                 <p className="font-semibold text-lg text-white">{issue.title}</p>
// //                                 <div className="flex items-center text-sm text-gray-400 mt-2">
// //                                     <span>#{issue.number} by {issue.user.login}</span>
// //                                 </div>
// //                             </a>
// //                         ))
// //                     ) : (
// //                         <div className="text-center p-8 bg-card border border-gray-700 rounded-lg">
// //                             <p className="text-muted-foreground">No "Good First Issues" found for this repository right now.</p>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         );
// //     } catch (error) {
// //         console.error("GitHub API Error:", error); 
// //         return (<div className="mt-16 text-center p-8 text-red-500">Could not load live issues from GitHub.</div>);
// //     }
// // }
// // // --- End GitHub Component ---


// // // --- Data Fetching Function ---
// // async function getPlaybookData(slug: string): Promise<PlaybookData | null> {
// //   const supabase = await createServerSupabaseClient(); // Use the async Server Helper

// //   const { data: orgData } = await supabase
// //     .from('organizations')
// //     .select('id, name, repo_path')
// //     .eq('slug', slug)
// //     .single();

// //   if (!orgData) return null;

// //   const { data: playbookData } = await supabase
// //     .from('playbooks')
// //     .select('content_markdown')
// //     .eq('org_id', orgData.id)
// //     .single();
    
// //   return { 
// //       name: orgData.name, 
// //       repo_path: orgData.repo_path, 
// //       content: playbookData?.content_markdown || "### Playbook content is coming soon!" 
// //   };
// // }
// // // --- End Data Fetching ---


// // // --- Main Page Component ---
// // export default async function PlaybookPage({ params }: OrgDetailPageProps) {
// //     const playbook = await getPlaybookData(params.slug);
    
// //     if (!playbook) notFound();

// //     return (
// //         <div className="min-h-screen">
// //             <main className="max-w-4xl mx-auto px-4 py-12">
                
// //                 <div className="text-center mb-12">
// //                     <h1 className="text-5xl font-bold">{playbook.name}</h1>
// //                     <p className="mt-2 text-lg text-gray-400">Your OpenVeda Playbook</p>
// //                 </div>
                
// //                 {/* Playbook Content */}
// //                 <article className="prose prose-invert lg:prose-xl max-w-none prose-a:text-green-400">
// //                     <ReactMarkdown>{playbook.content}</ReactMarkdown>
// //                 </article>
                
// //                 {/* Live Issues List (Server Component with Suspense for non-blocking fetch) */}
// //                 <React.Suspense fallback={<div className="mt-16 text-center text-gray-400 animate-pulse">Loading live issues...</div>}>
// //                     {/* FIX: Removed 'issues' prop, passing only repoPath */}
// //                     <LiveIssuesList repoPath={playbook.repo_path} /> 
// //                 </React.Suspense>
                
// //                 {/* Call to Action */}
// //                 <div className="mt-16 text-center bg-gray-800 border border-green-500 rounded-lg p-8">
// //                     <h2 className="text-3xl font-bold">Stuck? Get Unstuck. Now.</h2>
// //                     <p className="mt-4 text-gray-300">Our Org Specialist Mentors are here to help. Book a free 15-minute session.</p>
// //                     <Link 
// //                         href="https://calendly.com/ayush-shukla-adypu/30min" 
// //                         target="_blank" 
// //                         rel="noopener noreferrer" 
// //                         className="mt-6 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600"
// //                     >
// //                         Book a Free Session
// //                     </Link>
// //                 </div>
// //             </main>
// //         </div>
// //     );
// // }
// // // import { supabase } from '@/lib/supabase/browser-client'; // CORRECTED IMPORT
// // // import ReactMarkdown from 'react-markdown';
// // // import { notFound } from 'next/navigation';
// // // import Link from 'next/link';
// // // import React from 'react';

// // // interface GitHubIssue { id: number; html_url: string; title: string; number: number; user: { login: string; }; }

// // // async function LiveIssuesList({ issues, repoPath }: { issues: GitHubIssue[], repoPath: string }) {
// // //   if (!repoPath || !process.env.GITHUB_TOKEN) { return null; }
// // //   try {
// // //     const res = await fetch(`https://api.github.com/repos/${repoPath}/issues?labels=good first issue&state=open&per_page=5&sort=updated`, {
// // //       headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }, next: { revalidate: 3600 },
// // //     });
// // //     if (!res.ok) throw new Error(`GitHub API failed with status: ${res.status}`);
// // //     const issues: GitHubIssue[] = await res.json();
    
// // //     return (
// // //       <div className="mt-16"><h2 className="text-3xl font-bold mb-6 text-center">Live "Good First Issues"</h2><div className="space-y-4">{issues.length > 0 ? (issues.map((issue) => (<a href={issue.html_url} key={issue.id} target="_blank" rel="noopener noreferrer" className="block p-6 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 transition-all"><p className="font-semibold text-lg text-white">{issue.title}</p><div className="flex items-center text-sm text-gray-400 mt-2"><span>#{issue.number} by {issue.user.login}</span></div></a>))) : (<div className="text-center p-8 bg-card border border-gray-700 rounded-lg"><p className="text-muted-foreground">No "Good First Issues" found for this repository right now.</p></div>)}</div></div>
// // //     );
// // //   } catch (error) {
// // //     console.error("GitHub API Error:", error); return (<div className="mt-16 text-center p-8 text-red-500">Could not load live issues from GitHub.</div>);
// // //   }
// // // }

// // // async function getPlaybookData(slug: string) {
// // //   const { data: orgData } = await supabase.from('organizations').select('id, name, repo_path').eq('slug', slug).single();
// // //   if (!orgData) return null;

// // //   const { data: playbookData } = await supabase.from('playbooks').select('content_markdown').eq('org_id', orgData.id).single();
// // //   return { name: orgData.name, repo_path: orgData.repo_path, content: playbookData?.content_markdown || "### Playbook content is coming soon!" };
// // // }

// // // export default async function PlaybookPage({ params }: { params: { slug: string } }) {
// // //   const playbook = await getPlaybookData(params.slug);
// // //   if (!playbook) notFound();

// // //   return (
// // //     <div className="min-h-screen"><main className="max-w-4xl mx-auto px-4 py-12"><div className="text-center mb-12"><h1 className="text-5xl font-bold">{playbook.name}</h1><p className="mt-2 text-lg text-gray-400">Your OpenVeda Playbook</p></div><article className="prose prose-invert lg:prose-xl max-w-none prose-a:text-green-400"><ReactMarkdown>{playbook.content}</ReactMarkdown></article><React.Suspense fallback={<div className="mt-16 text-center text-gray-400 animate-pulse">Loading live issues...</div>}><LiveIssuesList issues={playbook.issues} repoPath={playbook.repo_path!} /></React.Suspense><div className="mt-16 text-center bg-gray-800 border border-green-500 rounded-lg p-8"><h2 className="text-3xl font-bold">Stuck? Get Unstuck. Now.</h2><p className="mt-4 text-gray-300">Our Org Specialist Mentors are here to help. Book a free 15-minute session.</p><Link href="https://calendly.com/ayush-shukla-adypu/30min" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600">Book a Free Session</Link></div></main></div>
// // //   );
// // // }