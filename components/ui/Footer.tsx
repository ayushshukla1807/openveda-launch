'use client';

import Link from 'next/link';
import Newsletter from '@/components/ui/Newsletter';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border mt-40 pb-20 pt-24 relative overflow-hidden bg-background">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8 md:col-span-1">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black text-xl">V</div>
              <span className="text-2xl font-black text-foreground tracking-tighter">OpenVeda<span className="text-primary">.in</span></span>
            </Link>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-xs transition-colors hover:text-foreground">
              India's first outcome-driven launchpad for open-source excellence. Curated by the community, for the upcoming founders.
            </p>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/30 italic">Navigation</h4>
            <div className="flex flex-col gap-4">
              <Link href="/organizations" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Organizations</Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Dashboard</Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Contribution Login</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/30 italic">Connect</h4>
            <div className="flex flex-col gap-4">
              <Link href="https://github.com/ayushshukla1807" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">GitHub <span className="text-[8px] opacity-30">↗</span></Link>
              <Link href="https://www.linkedin.com/in/your-linkedin-profile/" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">LinkedIn <span className="text-[8px] opacity-30">↗</span></Link>
              <Link href="https://twitter.com/your-twitter-handle/" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">Twitter / X <span className="text-[8px] opacity-30">↗</span></Link>
            </div>
          </div>

          <div className="space-y-8 flex flex-col items-center md:items-start">
             <Newsletter />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-border gap-6">
          <p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.5em]">
            &copy; {new Date().getFullYear()} OpenVeda.in • BUILT TO IMPACT
          </p>
          <div className="flex gap-8">
            <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2 italic">
               Developed by Ayush Shukla <span className="w-1 h-1 bg-primary rounded-full" /> Built with Passion in India 🇮🇳
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
