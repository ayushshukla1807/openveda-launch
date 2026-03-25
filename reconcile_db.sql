-- ==========================================
-- RECONCILE & RESET DB SCHEMA (UUID BASED)
-- ==========================================

-- 1. Drop existing tables to start fresh (WARNING: Data will be lost)
DROP TABLE IF EXISTS public.user_stars;
DROP TABLE IF EXISTS public.user_proposals;
DROP TABLE IF EXISTS public.user_progress;
DROP TABLE IF EXISTS public.playbooks;
DROP TABLE IF EXISTS public.organizations;

-- 2. Re-create Organizations with UUID
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    website_url TEXT,
    repo_path TEXT,
    tech_stack TEXT[],
    program TEXT DEFAULT 'GSoC 2026',
    stars_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Re-create Playbooks with UUID
CREATE TABLE IF NOT EXISTS public.playbooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    content_markdown TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(org_id)
);

-- 4. Re-create User Proposals
CREATE TABLE IF NOT EXISTS public.user_proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable RLS and add basic policies
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playbooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read organizations" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Public read playbooks" ON public.playbooks FOR SELECT USING (true);
