import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Founder's Corner | OpenVeda",
  description: "Meet Ayush Shukla, the founder of OpenVeda, and learn about the mission.",
};

export default function FounderPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        
        {/* --- The Header --- */}
        <div className="text-center mb-16">
          <Image 
            src="https://i.postimg.cc/7LnSZn1Z/Ayush-Shukla.jpg" // Your profile picture URL
            alt="Ayush Shukla, Founder of OpenVeda"
            width={128}
            height={128}
            className="rounded-full mx-auto mb-6 border-4 border-green-500 shadow-lg"
          />
          <h1 className="text-5xl font-bold">The Founder's Corner</h1>
          <p className="mt-4 text-xl text-muted-foreground">The story behind OpenVeda.</p>
        </div>

        {/* --- The Manifesto / Story --- */}
        <article className="prose prose-invert lg:prose-xl mx-auto">
          <h2>The Journey Here Was Hell.</h2>
          <p>
            My name is Ayush Shukla, and I'm a second-year CSE student at Newton School of Technology. OpenVeda wasn't born in a comfortable brainstorming session. It was forged in the fire of absolute frustration.
          </p>
          <p>
            Like so many of my peers, I was told that contributing to open-source was the key to a great career. I was hungry to learn and ready to code. But when I tried to contribute to my first major project, I hit a wall. Not a wall of code, but a wall of chaos. Confusing documentation, cryptic setup errors, and the overwhelming feeling of being an outsider. It took me weeks to do what should have taken hours.
          </p>
          <p>
            I spent an entire weekend, over 48 hours with almost no sleep, fighting a war against broken build tools, corrupted environments, and impossible bugs just to build the first version of this platform. At 5 AM, on the verge of giving up, I saw a post from a batchmate who had launched a simple guide. It was a good guide. And it was a gut punch.
          </p>
          
          <h2>This Is Not Just Another Guide.</h2>
          <p>
            That moment gave me absolute clarity. A generic guide isn't enough. It doesn't solve the real pain: that specific error at 2 AM, the fear of picking the wrong issue, or the feeling of being completely alone.
          </p>
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
            My mission is to make OpenVeda the "One Shot Solution" for every developer in India. To turn the chaos of open-source into a clear, confident path. The journey to build this was a battle, but your journey into open-source doesn't have to be.
          </p>
          <p>
            This platform is my commitment to our community. Let's build, together.
          </p>

          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-lg">Connect with me:</p>
            <div className="flex gap-4 mt-4">
              <Link href="https://www.linkedin.com/in/your-linkedin-profile/" target="_blank" className="text-green-400 hover:underline">LinkedIn</Link>
              <Link href="https://github.com/ayushshukla1807" target="_blank" className="text-green-400 hover:underline">GitHub</Link>
              <Link href="https://twitter.com/your-twitter-handle/" target="_blank" className="text-green-400 hover:underline">Twitter / X</Link>
            </div>
          </div>
        </article>

      </div>
    </main>
  );
}