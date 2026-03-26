'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client';
import TacticalNav from '@/components/ui/TacticalNav';

const supabase = createBrowserSupabaseClient();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function MentorProfilePage() {
  const { slug } = useParams();
  const router = useRouter();
  const [mentor, setMentor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMentor() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error || !data) {
        // Fallback to local hardcoded data for dev/initial seed if DB isn't ready
        if (slug === 'ayush-shukla') {
            setMentor({
                name: 'Ayush Shukla',
                role: 'Founder, OpenVeda',
                phonetic_name: '/aɪ.juːʃ/',
                bio_summary: [
                    'Systems Development: Experience navigating and contributing to large-scale codebases like Chromium to ship technical patches.',
                    'Execution Focus: Driven by a "finisher\'s mindset" and a refusal to accept workarounds.',
                    'Technical Agility: Proven ability to pick up and apply new programming languages and frameworks on the fly.'
                ],
                image_url: 'https://i.postimg.cc/7LnSZn1Z/Ayush-Shukla.jpg',
                timezone: '19:42:00 IST',
                lofi_status: 'LOFI ♬',
                socials: { github: '#', linkedin: '#', x: '#' }
            });
        } else {
            router.push('/mentorship');
        }
      } else {
        setMentor(data);
      }
      setIsLoading(false);
    }
    fetchMentor();
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 space-y-8">
        <div className="w-48 h-48 bg-muted rounded-full animate-pulse" />
        <div className="w-64 h-12 bg-muted rounded-xl animate-pulse" />
        <div className="w-48 h-6 bg-muted rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-4xl mx-auto px-8 py-32 flex flex-col items-center text-center">
        {/* Profile Image & Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 w-full"
        >
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Image 
              src={mentor.image_url}
              alt={mentor.name}
              width={200}
              height={200}
              className="rounded-full grayscale border-2 border-border shadow-2xl relative z-10 transition-all duration-700 hover:grayscale-0 hover:scale-110 active:scale-95 cursor-crosshair mx-auto"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-4">
              {mentor.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground font-black text-xs uppercase tracking-[0.4em] italic">
              <span>{mentor.phonetic_name}</span>
              <span className="opacity-30">•</span>
              <span>noun</span>
              <span className="opacity-30">•</span>
              <span>{mentor.timezone}</span>
              <span className="opacity-30">•</span>
              <span className="text-primary">{mentor.lofi_status}</span>
            </div>
          </motion.div>

          {/* Subhead / Role */}
          <motion.p variants={itemVariants} className="text-xl md:text-2xl font-black text-foreground max-w-2xl mx-auto leading-tight italic">
            {mentor.role}
          </motion.p>

          <div className="h-[1px] w-12 bg-border mx-auto" />

          {/* Professional Summary */}
          <motion.div variants={itemVariants} className="w-full text-left max-w-2xl mx-auto space-y-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground mb-8">Professional Summary</h2>
            <div className="space-y-8">
              {mentor.bio_summary.map((point: string, idx: number) => {
                const [title, description] = point.split(': ');
                return (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="flex gap-6 items-start">
                      <span className="text-muted-foreground/30 font-black text-xs mt-1.5">—</span>
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                        <span className="text-foreground font-black">{title}:</span> {description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="h-64" /> {/* Space for floating nav */}
        </motion.div>
      </div>

      {/* Floating Tactical Nav */}
      <TacticalNav socials={mentor.socials} />

      {/* Aesthetic Border Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>
    </main>
  );
}
