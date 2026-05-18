import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function MentorProfile({ params }: { params: { slug: string } }) {
    const allowedSlugs = ['ayush-shukla', 'elena-rostova', 'devon-carter'];
    
    if (!allowedSlugs.includes(params.slug)) {
        notFound();
    }

    const mentorData = params.slug === 'ayush-shukla' ? {
        name: 'Ayush Shukla',
        role: 'Lead Architect & Founder, OpenVeda',
        bio: 'Pioneering open source mentorship paradigms. Core contributor to Next.js reactivity algorithms, bundler configurations, and web compilers.',
        expertise: ['System Architecture', 'Next.js core', 'Distributed Systems'],
        impact: 'Scaled open platforms driving millions of developer commits across high-traffic repositories.',
        github: 'ayushshukla1807'
    } : params.slug === 'elena-rostova' ? {
        name: 'Elena Rostova',
        role: 'Core Linux Kernel Contributor',
        bio: 'Systems level engineer focusing on virtualization runtimes, low-level scheduler algorithms, and high-performance eBPF container tracking.',
        expertise: ['C', 'Rust', 'eBPF', 'Kernel Modules'],
        impact: 'Contributed 100+ patches to Linux kernel networking pipelines and security subsystems.',
        github: 'elena-rostova-dev'
    } : {
        name: 'Devon Carter',
        role: 'CNCF Sandbox Maintainer',
        bio: 'Cloud Native practitioner. Dedicated to distributed storage systems, consensus models, and server-side observability systems.',
        expertise: ['Go', 'Kubernetes', 'gRPC', 'Distributed Databases'],
        impact: 'Maintains critical sandboxed container observability layers deployed in production worldwide.',
        github: 'devon-carter-cloud'
    };

    return (
        <main className="min-h-screen bg-[#030305] text-[#f8fafc] py-32 relative overflow-hidden font-sans">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-[#00f0ff]/10 blur-[180px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="glass p-12 md:p-16 rounded-[3.5rem] border border-white/10 relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#00f0ff]/10 blur-[80px] rounded-full pointer-events-none" />
                    
                    <Link href="/mentorship" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-2 mb-10 transition-colors">
                        ← Back to Collective
                    </Link>

                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter italic text-white">{mentorData.name}</h1>
                    <p className="text-[#00f0ff] font-black uppercase text-xs tracking-[0.3em] mb-12">{mentorData.role}</p>
                    
                    <div className="space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 italic">Overview & Philosophy</h2>
                            <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-gray-300">"{mentorData.bio}"</p>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-white/5">
                            <div className="space-y-4">
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Core Expertise</h2>
                                <div className="flex flex-wrap gap-2">
                                    {mentorData.expertise.map(skill => (
                                        <span key={skill} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#00f0ff]">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Career Impact</h2>
                                <p className="text-sm font-semibold text-gray-400 leading-relaxed">{mentorData.impact}</p>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Verified Handles</h2>
                                <Link 
                                    href={`https://github.com/${mentorData.github}`} 
                                    target="_blank" 
                                    className="text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors"
                                >
                                    github.com/{mentorData.github}
                                </Link>
                            </div>
                            <Link 
                                href="/mentorship"
                                className="w-full sm:w-auto bg-[#00f0ff] text-black font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-center shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                            >
                                Schedule Direct Sync Slot
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
