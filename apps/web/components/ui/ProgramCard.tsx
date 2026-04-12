'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProgramCardProps {
  name: string;
  slug: string;
  description: string;
  image_url?: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ name, slug, description, image_url }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link 
        href={`/organizations?program=${encodeURIComponent(slug)}`} 
        className="block group flex flex-col h-full p-10 glass glass-hover rounded-[3rem] relative overflow-hidden"
      >
        {/* Decorative Gradient Background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
        
        <div className="flex items-center justify-between mb-10">
          <div className="relative h-20 w-20 bg-white/5 rounded-3xl border border-white/10 group-hover:border-primary/50 transition-colors duration-500 flex items-center justify-center overflow-hidden">
            {image_url ? (
              <Image 
                src={image_url} 
                alt={name} 
                fill 
                className="object-cover p-3 group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <span className="text-4xl filter drop-shadow-lg opacity-20">🚀</span>
            )}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary font-black text-2xl group-hover:translate-x-0 translate-x-4">
            →
          </div>
        </div>

        <h3 className="text-3xl font-black text-white group-hover:text-primary transition-colors duration-300 leading-tight tracking-tighter">
          {name}
        </h3>
        
        <p className="mt-6 text-slate-400 font-medium leading-relaxed flex-grow">
          {description}
        </p>

        <div className="mt-10 flex items-center gap-4 text-white font-black text-[10px] tracking-[0.3em] uppercase">
          EXPLORE PROGRAM
          <div className="h-[2px] w-0 group-hover:w-16 bg-primary transition-all duration-700" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProgramCard;
