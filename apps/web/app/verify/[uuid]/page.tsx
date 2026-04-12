import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReadinessBadge from '@/components/ui/ReadinessBadge';

interface VerifyPageProps {
  params: { uuid: string };
}

// Fetch verification data
async function getVerificationData(uuid: string) {
  // In production, this would fetch from the Scoring Service API
  // const res = await fetch(`${process.env.SCORING_API_URL}/verify/${uuid}`);
  // if (!res.ok) return null;
  // return res.json();
  
  // Mock data for development
  return {
    id: uuid,
    github_username: "Verified Contributor",
    score: 83.42,
    verified_at: "2026-04-12T07:26:00Z",
    breakdown: {
      frequency: 0.92,
      quality: 0.85,
      stack: 0.78,
      complexity: 0.95,
      consistency: 0.88
    }
  };
}

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  const data = await getVerificationData(params.uuid);
  if (!data) return { title: 'Verification Not Found | OpenVeda' };

  const title = `Verified: ${data.github_username} scored ${Math.round(data.score)}/100`;
  const description = `${data.github_username}'s GSoC 2026 Readiness is verified. View the full score breakdown and open-source contribution metrics on OpenVeda.`;

  return {
    title: `${title} | OpenVeda Credentials`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://openveda.in/verify/${params.uuid}`,
      images: [
        {
          url: `https://openveda.in/api/og/verify?id=${params.uuid}&score=${data.score}&name=${data.github_username}`,
          width: 1200,
          height: 630,
          alt: `OpenVeda Certification for ${data.github_username}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://openveda.in/api/og/verify?id=${params.uuid}&score=${data.score}&name=${data.github_username}`],
    },
  };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const data = await getVerificationData(params.uuid);

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative py-32 flex flex-col items-center">
      {/* Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <div className="max-w-4xl w-full px-4 relative z-10 flex flex-col items-center">
        <div className="mb-16 text-center">
            <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Official Verification</span>
            <h1 className="text-6xl font-black tracking-tighter leading-none mb-4 italic">
                Verifiable <span className="text-foreground/20">Credential</span>
            </h1>
            <p className="text-muted-foreground font-medium max-w-lg mx-auto">
                This certificate proves that the recipient has demonstrated industry-level open-source proficiency through real-time contribution analysis.
            </p>
        </div>

        <ReadinessBadge 
          score={data.score} 
          username={data.github_username} 
          breakdown={data.breakdown} 
        />

        <div className="mt-20 p-8 glass rounded-[2.5rem] border-border w-full flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Credential ID</p>
                <p className="font-mono text-sm text-foreground/50">{data.id}</p>
            </div>
            <div className="text-center md:text-right">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Date Verified</p>
                <p className="font-medium text-sm">{new Date(data.verified_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
        </div>

        <div className="mt-12 text-center opacity-40">
            <p className="text-xs font-black uppercase tracking-[0.5em]">Powered by OpenVeda.in Infrastructure</p>
        </div>
      </div>
    </main>
  );
}
