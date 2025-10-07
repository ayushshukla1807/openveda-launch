import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
async function getPlaybookData(slug: string) {
  const { data: orgData } = await supabase.from('organizations').select('id, name').eq('slug', slug).single();
  if (!orgData) return null;
  const { data: playbookData } = await supabase.from('playbooks').select('content_markdown').eq('org_id', orgData.id).single();
  return { name: orgData.name, content: playbookData?.content_markdown || "### Playbook content is coming soon!" };
}
export default async function PlaybookPage({ params }: { params: { slug: string } }) {
  const playbook = await getPlaybookData(params.slug);
  if (!playbook) notFound();
  return (
    <div className="min-h-screen"><main className="max-w-4xl mx-auto px-4 py-12"><div className="text-center mb-12"> <h1 className="text-5xl font-bold">{playbook.name}</h1> <p className="mt-2 text-lg text-gray-400">Your OpenVeda Playbook</p> </div><article className="prose prose-invert prose-lg max-w-none prose-a:text-green-400"> <ReactMarkdown>{playbook.content}</ReactMarkdown> </article><div className="mt-16 text-center bg-gray-800 border border-green-500 rounded-lg p-8"><h2 className="text-3xl font-bold">Stuck? Get Unstuck. Now.</h2><p className="mt-4 text-gray-300">As the founder of OpenVeda, I'm personally offering free 1-on-1 help sessions.</p><Link href="https://calendly.com/ayush-shukla-adypu/30min" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600">Book a Free Session with Ayush</Link></div></main></div>
  );
}