'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

interface ProgramCardProps {
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ name, slug, description, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link 
        href={`/organizations?program=${encodeURIComponent(slug)}`} 
        className="block group flex flex-col h-full p-8 glass glass-hover rounded-[2rem] relative overflow-hidden"
      >
        {/* Decorative Gradient Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl group-hover:bg-green-500/10 transition-colors duration-500" />
        
        <div className="flex items-center justify-between mb-8">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-green-500/50 transition-colors duration-500" title={`Explore projects for ${name}`}>
            <span className="text-4xl filter drop-shadow-lg">{icon || '🚀'}</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-green-400 font-black text-xl">
            →
          </div>
        </div>

        <h3 className="text-2xl font-black text-white group-hover:text-green-400 transition-colors duration-300 leading-tight">
          {name}
        </h3>
        
        <p className="mt-4 text-gray-400 font-medium leading-relaxed flex-grow">
          {description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase">
          Explore Program
          <div className="h-[2px] w-0 group-hover:w-12 bg-green-500 transition-all duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProgramCard;
