'use client';

import { motion } from 'framer-motion';

const industryProjects = [
  {
    title: "Last-mile Delivery Optimizer",
    brands: "Blinkit | Zepto",
    desc: "Solve real-world logistics bottlenecks by implementing Dijkstra's variations for route optimization in dense urban environments.",
    tech: ["Node.js", "Redis", "GeoJSON"],
    color: "from-yellow-400 to-green-500"
  },
  {
    title: "News Recommendation Engine",
    brands: "InShorts Clone",
    desc: "Build a high-throughput content delivery system using collaborative filtering and real-time user preference tracking.",
    tech: ["Python", "FastAPI", "Vector DB"],
    color: "from-red-500 to-orange-500"
  },
  {
    title: "Real-time Bidding Platform",
    brands: "eBay | Auction Master",
    desc: "Implement a low-latency distributed system to handle thousands of concurrent bids using WebSockets and atomic database operations.",
    tech: ["Java", "Spring Boot", "Kafka"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Social Performance Analyzer",
    brands: "Instagram | Snapchat",
    desc: "Analyze massive datasets of user interactions to generate growth insights using advanced data visualization techniques.",
    tech: ["Python", "Machine Learning", "D3.js"],
    color: "from-purple-500 to-pink-500"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ProjectShowcase() {
  return (
    <section className="py-32">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-primary font-black text-xs uppercase tracking-[0.4em] mb-4 block">Industry Standards</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic">
            Build Systems, <span className="text-foreground/20">Not Just Apps</span>
          </h2>
        </div>
        <p className="text-muted-foreground font-medium max-w-sm text-right">
          Go beyond CRUD. Work on complex, distributed architectures used by the world's leading tech companies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industryProjects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="group relative glass rounded-[4rem] p-12 border-border hover:border-primary/40 transition-all duration-500 overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br ${project.color} opacity-[0.03] blur-[100px] group-hover:opacity-[0.1] transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  {project.brands}
                </span>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" /></svg>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-500">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground font-medium text-lg leading-relaxed mb-10">
                {project.desc}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-[10px] font-black uppercase tracking-widest text-foreground/40 border border-border px-3 py-1 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Big Tech CTA Overlay */}
      <div className="mt-20 p-12 glass rounded-[3rem] border-primary/20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />
        <div>
          <h3 className="text-3xl font-black tracking-tight mb-2 italic">Ready for the Big Tech Challenge?</h3>
          <p className="text-muted-foreground font-medium">Join the next cohort and start building production-ready systems.</p>
        </div>
        <button className="bg-foreground text-background font-black px-12 py-5 rounded-3xl text-sm uppercase tracking-widest hover:scale-105 transition-all">
          Apply for Year 2 Mastery
        </button>
      </div>
    </section>
  );
}
