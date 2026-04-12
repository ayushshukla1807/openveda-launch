-- 1. Nuclear Reset (Clears drift to ensure 100% compatibility)
DROP TABLE IF EXISTS public.mentors CASCADE;

-- 2. Clean Create with standard OpenVeda 2.0 Columns
CREATE TABLE public.mentors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    phonetic_name TEXT,
    bio_summary TEXT[],
    image_url TEXT,
    timezone TEXT DEFAULT 'IST',
    lofi_status TEXT DEFAULT 'LOFI ♬',
    socials JSONB DEFAULT '{}',
    calendly_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Security
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read mentors" ON public.mentors FOR SELECT USING (true);

-- 4. Seed Premium Data (Anonymized for Production)
INSERT INTO public.mentors (name, slug, role, phonetic_name, bio_summary, image_url, timezone, lofi_status, socials, calendly_url)
VALUES 
(
    'Principal Mentor', 
    'principal-mentor', 
    'Lead Architect, OpenVeda', 
    '/æd.vɪ.zɔːr/', 
    ARRAY[
        'Systems Development: Experience navigating and contributing to large-scale codebases like Chromium to ship technical patches.',
        'Execution Focus: Driven by a "finisher''s mindset" and a refusal to accept workarounds.',
        'Technical Agility: Proven ability to pick up and apply new programming languages and frameworks on the fly.'
    ],
    'https://api.dicebear.com/7.x/shapes/svg?seed=Principal',
    '19:42:00 IST',
    'LOFI ♬',
    '{"github": "#", "linkedin": "#", "x": "#"}',
    '#'
),
(
    'Technical Architect',
    'technical-architect',
    'Core Contributor @TopTierProjects',
    '/ɑːrk.ɪ.tekt/',
    ARRAY[
        'Systems Development: Deep focus on Electron.js and low-level browser abstractions.',
        'Creative Engineering: Bridging the gap between AI/ML research and production-grade applications.',
        'Open Source Advocacy: Active maintainer and contributor to major community projects.'
    ],
    'https://api.dicebear.com/7.x/shapes/svg?seed=Technical',
    '19:42:00 IST',
    'LOFI ♬',
    '{"github": "#", "linkedin": "#", "x": "#"}',
    '#'
);
