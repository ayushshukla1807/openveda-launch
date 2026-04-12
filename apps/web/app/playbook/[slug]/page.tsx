import { createServerSupabaseClient } from '@/lib/supabase/server-client';
import { notFound } from 'next/navigation';
import PlaybookClient from './PlaybookClient';

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 120;

export async function generateStaticParams() {
  const supabase = createServerSupabaseClient();
  const { data: orgs } = await supabase
    .from('organizations')
    .select('slug')
    .limit(100); // Pre-render top 100 orgs

  return orgs?.map((org) => ({
    slug: org.slug,
  })) || [];
}

interface PlaybookPageProps {
  params: { slug: string };
}

export default async function PlaybookPage({ params }: PlaybookPageProps) {
  const supabase = createServerSupabaseClient();

  // Fetch organization data
  const { data: orgData } = await supabase
    .from('organizations')
    .select('id, name, repo_path, logo_url')
    .eq('slug', params.slug)
    .single();

  if (!orgData) {
    notFound();
  }

  // Fetch playbook content
  const { data: playbookData } = await supabase
    .from('playbooks')
    .select('content_markdown')
    .eq('org_id', orgData.id)
    .single();

  const data = {
    id: orgData.id,
    name: orgData.name,
    repo_path: orgData.repo_path,
    content: playbookData?.content_markdown || '# Playbook is coming soon!\nWe are currently curating the best practices for this organization.',
    logo_url: orgData.logo_url
  };

  return <PlaybookClient data={data} />;
}