import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Founder's Corner | OpenVeda.in",
  description: "Meet Ayush Shukla, the founder of OpenVeda.in, and learn about the mission to scale Indian open-source contributors.",
};

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[180px] rounded-full animate-mesh-gradient" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full animate-mesh-gradient [animation-delay:4s]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        
        <div className="text-center mb-32">
          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-primary blur-[80px] opacity-20 rounded-full animate-pulse" />
            <Image 
              src="https://i.postimg.cc/7LnSZn1Z/Ayush-Shukla.jpg"
              alt="Ayush Shukla, Founder of OpenVeda"
              width={240}
              height={240}
              className="rounded-[3rem] mx-auto relative z-10 border border-border shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </div>
          <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">The Visionary Behind OpenVeda</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6">
            Founder's <span className="text-foreground/20 italic">Corner</span>
          </h1>
          <p className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto italic">
            "We aren't just building a tool; we're architecting a movement for Indian developers."
          </p>
        </div>

        <div className="glass p-12 md:p-24 rounded-[4rem] border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
          
          <article className="prose dark:prose-invert lg:prose-2xl max-w-none 
            prose-headings:font-black prose-headings:tracking-tight 
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-medium
            prose-strong:text-foreground prose-strong:font-black
            prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-16
            prose-li:text-muted-foreground
          ">
            <h2>The Journey was <span className="text-foreground/20 italic underline decoration-primary decoration-4 underline-offset-8">Hell</span>.</h2>
            <p>
              My name is **Ayush Shukla**, and I'm a second-year CSE student at **Newton School of Technology**. OpenVeda wasn't born in a comfortable brainstorming session. It was forged in the fire of absolute frustration.
            </p>
            <p>
              Like so many of my peers, I was told that contributing to open-source was the key to a great career. I was hungry to learn and ready to code. But when I tried to contribute to my first major project, I hit a wall. Not a wall of code, but a **wall of chaos**.
            </p>
            <p>
              I spent an entire weekend fighting a war against broken build tools, corrupted environments, and impossible bugs just to build the first version of this platform. At 5 AM, on the verge of giving up, I saw my mission clearly. A generic guide isn't enough. It doesn't solve the real pain: that specific error at 2 AM or the fear of picking the wrong issue.
            </p>
            
            <h2>This Is Not Just <span className="text-foreground/20 italic">Another Guide</span>.</h2>
            <p>
              That’s why OpenVeda exists. I didn't just build a website; I built a support system. A platform with:
            </p>
            <ul>
              <li><strong>Hyper-Detailed "Platinum Playbooks"</strong> that anticipate the exact problems you will face.</li>
              <li><strong>Org-Specific Mentors</strong> you can connect with 1-on-1 when you are truly stuck.</li>
              <li><strong>Live, Curated "Good First Issues"</strong> so you can stop searching and start coding.</li>
            </ul>
            
            <h2>Our Dharma.</h2>
            <p>
              My mission is to make OpenVeda the **"One Shot Solution"** for every developer in India. To turn the chaos of open-source into a clear, confident path. The journey to build this was a battle, but your journey into open-source doesn't have to be.
            </p>
            <p>
              This platform is my commitment to our community. Let's build, together.
            </p>

            <div className="mt-32 pt-16 border-t border-border">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/30 mb-8">Connect with me</p>
              <div className="flex flex-wrap gap-10">
                <Link href="https://www.linkedin.com/in/your-linkedin-profile/" target="_blank" className="group flex items-center gap-2">
                  <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors">LinkedIn</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link href="https://github.com/ayushshukla1807" target="_blank" className="group flex items-center gap-2">
                  <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors">GitHub</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link href="https://twitter.com/your-twitter-handle/" target="_blank" className="group flex items-center gap-3">
                  <span className="text-xl font-black text-foreground group-hover:text-primary transition-colors">Twitter</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </article>
        </div>

      </div>

      <footer className="mt-40 py-20 border-t border-border text-center">
        <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.5em] mb-4">OpenVeda.in</p>
        <p className="text-xs text-muted-foreground font-bold tracking-widest">© 2026 • BUILT FOR IMPACT</p>
      </footer>
    </main>
  );
}