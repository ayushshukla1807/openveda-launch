import { supabase } from '@/lib/supabaseClient';
import OrgCard from '@/components/ui/OrgCard';

async function getOrgs() {
  const { data } = await supabase.from('organizations').select('name, slug, logo_url, tech_stack').order('name');
  return data || [];
}

export default async function OrgsPage() {
  const organizations: any[] = await getOrgs();
  return (
    <main className="p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12"><h1 className="text-5xl font-bold">Organization Explorer</h1><p className="mt-4 text-lg text-gray-300">Find your project. Click an organization to read its OpenVeda Platinum Playbook.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (<OrgCard key={org.slug} {...org} />))}
        </div>
      </div>
    </main>
  );
}