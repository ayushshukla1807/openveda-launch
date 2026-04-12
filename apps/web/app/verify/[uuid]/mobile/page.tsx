import { notFound } from 'next/navigation';
import ReadinessBadge from '@/components/ui/ReadinessBadge';

interface MobileVerifyPageProps {
  params: { uuid: string };
}

// Anonymized mock data fetcher
async function getAnonymizedData(uuid: string) {
  // In production: fetch(`${process.env.SCORING_API_URL}/verify/${uuid}`);
  return {
    id: uuid,
    role: "CERTIFIED OPEN SOURCE ENGINEER",
    tier: "Certified",
    score: 88.42,
    verified_at: new Date().toISOString(),
    impact: 12
  };
}

export default async function MobileVerifyPage({ params }: MobileVerifyPageProps) {
  const data = await getAnonymizedData(params.uuid);

  if (!data) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 bg-[#09090b]">
        {/* Premium Digital ID Card Aesthetic */}
        <div className="w-full max-w-[350px] aspect-[1/1.6] glass rounded-[3rem] border-primary/20 relative overflow-hidden flex flex-col p-10 shadow-2xl">
            {/* Background Mesh Glow */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
            
            {/* Header */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-xl">V</div>
                    <div className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-[8px] font-black text-primary tracking-widest">VERIFIED</div>
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl font-black tracking-tighter italic mb-1">Impact <span className="text-foreground/20">Credential</span></h1>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-10">The Contribution Engine</p>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1">Professional Role</p>
                            <p className="text-sm font-black italic">{data.role}</p>
                        </div>
                        
                        <div className="flex gap-10">
                            <div>
                                <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1">Mastery Score</p>
                                <p className="text-4xl font-black italic">{Math.round(data.score)}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1">Tier</p>
                                <p className="text-lg font-black text-foreground/40 italic">{data.tier.toUpperCase()}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1">System Impact</p>
                            <p className="text-sm font-medium">{data.impact} Verified Upstream Merges</p>
                        </div>
                    </div>
                </div>

                {/* Footer of ID */}
                <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                    <div>
                        <p className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest mb-1">Verified Date</p>
                        <p className="text-[10px] font-bold">{new Date(data.verified_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <p className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest">ID: {params.uuid.slice(0, 8)}</p>
                </div>
            </div>
        </div>

        <div className="mt-10 text-center text-muted-foreground">
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">OPENVEDA.IN</p>
            <p className="text-[8px] mt-2 opacity-50 font-medium">This is a privacy-first, identity-neutral verification card.</p>
        </div>
    </main>
  );
}
