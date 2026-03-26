-- Create Mentors Table
CREATE TABLE IF NOT EXISTS public.mentors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    phonetic_name TEXT,
    bio_summary TEXT[],
    image_url TEXT,
    timezone TEXT DEFAULT 'IST',
    lofi_status TEXT DEFAULT 'OFF',
    socials JSONB DEFAULT '{}',
    calendly_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read mentors" ON public.mentors FOR SELECT USING (true);

-- Seed Initial Mentors
INSERT INTO public.mentors (name, slug, role, phonetic_name, bio_summary, image_url, timezone, lofi_status, socials, calendly_url)
VALUES 
(
    'Ayush Shukla', 
    'ayush-shukla', 
    'Founder, OpenVeda', 
    '/aɪ.juːʃ/', 
    ARRAY[
        'Systems Development: Experience navigating and contributing to large-scale codebases like Chromium to ship technical patches.',
        'Execution Focus: Driven by a "finisher''s mindset" and a refusal to accept workarounds.',
        'Technical Agility: Proven ability to pick up and apply new programming languages and frameworks on the fly.'
    ],
    'https://i.postimg.cc/7LnSZn1Z/Ayush-Shukla.jpg',
    '19:42:00 IST',
    'LOFI ♬',
    '{"github": "https://github.com/ayushshukla1807", "linkedin": "https://linkedin.com/in/ayushshukla1807", "x": "https://x.com/ayuxh_shukla"}',
    'https://calendly.com/ayush-shukla-adypu/30min'
),
(
    'Kanishk Ranjan',
    'kanishk-ranjan',
    'Open Source Contributor @ElectronJS & Chromium | B.Tech AI/ML Student',
    '/kʌn-ɪʃk/',
    ARRAY[
        'Systems Development: Deep focus on Electron.js and low-level browser abstractions.',
        'Creative Engineering: Bridging the gap between AI/ML research and production-grade applications.',
        'Open Source Advocacy: Active maintainer and contributor to major community projects.'
    ],
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Kanishk',
    '19:42:00 IST',
    'LOFI ♬',
    '{"github": "#", "linkedin": "#", "x": "#"}',
    '#'
)
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    phonetic_name = EXCLUDED.phonetic_name,
    bio_summary = EXCLUDED.bio_summary,
    image_url = EXCLUDED.image_url,
    timezone = EXCLUDED.timezone,
    lofi_status = EXCLUDED.lofi_status,
    socials = EXCLUDED.socials,
    calendly_url = EXCLUDED.calendly_url;
