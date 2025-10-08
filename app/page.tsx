import { supabase } from '@/lib/supabaseClient';
import OrgCard from '@/components/ui/OrgCard';
import Link from 'next/link';
async function getFeaturedOrgs() {
  const { data } = await supabase.from('organizations').select('name, slug, logo_url, tech_stack').limit(3);
  return data || [];
}
export default async function HomePage() {
  const featuredOrgs: any[] = await getFeaturedOrgs();
  return (
    <main className="flex flex-col items-center p-8"><div className="text-center max-w-4xl mx-auto mt-24"><h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">From Confusion to Contribution</h1><p className="mt-6 text-xl text-gray-300">OpenVeda is the unrivaled launchpad for India's open-source developers. We provide hyper-detailed playbooks and on-demand mentorship to turn your ambition into a merged pull request.</p><div className="mt-8 flex justify-center gap-4"><Link href="/orgs" className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-all">Explore Organizations</Link></div></div><div className="mt-24 w-full max-w-7xl"><h2 className="text-4xl font-bold text-center mb-8">Featured Organizations</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{featuredOrgs.map((org) => (<OrgCard key={org.slug} {...org} />))}</div></div></main>
  );
}


//X XI XID I ID ID