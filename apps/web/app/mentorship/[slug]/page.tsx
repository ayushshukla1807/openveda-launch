import { notFound } from 'next/navigation';

export default function MentorProfile({ params }: { params: { slug: string } }) {
    // Anonymized slugs
    const allowedSlugs = ['principal-mentor', 'technical-architect'];
    
    if (!allowedSlugs.includes(params.slug)) {
        notFound();
    }

    const mentorData = params.slug === 'principal-mentor' ? {
        name: 'Principal Mentor',
        role: 'Lead Architect, OpenVeda',
        bio: 'Over a decade of experience in scaling global-scale web infrastructure and building developer ecosystems.',
        expertise: ['System Architecture', 'Next.js', 'Distributed Systems'],
        impact: 'Scaled production code for over 50+ high-traffic repositories.'
    } : {
        name: 'Technical Architect',
        role: 'Core Contributor @TopTierProjects',
        bio: 'Low-level systems expert focusing on browser engine optimizations and high-performance computing.',
        expertise: ['C++', 'Rust', 'Browser Engines'],
        impact: 'Contributed 100+ patches to open-source browser cores.'
    };

    return (
        <main className="min-h-screen bg-background py-32">
            <div className="max-w-4xl mx-auto px-4">
                <div className="glass p-16 rounded-[4rem] border-border">
                    <h1 className="text-6xl font-black mb-4 tracking-tighter italic">{mentorData.name}</h1>
                    <p className="text-primary font-black uppercase text-xs tracking-widest mb-12">{mentorData.role}</p>
                    
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-xl font-black uppercase tracking-widest mb-4 opacity-40 italic">Overview</h2>
                            <p className="text-2xl font-medium leading-relaxed italic text-muted-foreground">"{mentorData.bio}"</p>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-widest mb-4 opacity-40">Core Expertise</h2>
                                <div className="flex flex-wrap gap-2">
                                    {mentorData.expertise.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-muted rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-widest mb-4 opacity-40">Career Impact</h2>
                                <p className="text-sm font-bold text-foreground/70">{mentorData.impact}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
