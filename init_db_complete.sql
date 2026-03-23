-- ==========================================
-- OPENVEDA 2.0: FULL DATABASE INITIALIZATION
-- ==========================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Organizations Table
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

-- 3. Playbooks Table
CREATE TABLE IF NOT EXISTS public.playbooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    content_markdown TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. User Progress (Journey)
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    completed_steps TEXT[] DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 5. User Proposals (Drafts)
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

-- 6. User Stars
CREATE TABLE IF NOT EXISTS public.user_stars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, org_id)
);

-- 7. Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stars ENABLE ROW LEVEL SECURITY;

-- 8. Policies
CREATE POLICY "Public read organizations" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Public read playbooks" ON public.playbooks FOR SELECT USING (true);

CREATE POLICY "Users view/update own progress" ON public.user_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users view/insert own proposals" ON public.user_proposals
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users view/insert own stars" ON public.user_stars
    FOR ALL USING (auth.uid() = user_id);

-- 9. Initial Seed (Appsmith Platinum Playbook)
-- (Include a sample of the upsert logic here or keep separate for clarity)
