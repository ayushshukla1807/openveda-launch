'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import AuthButton from '@/components/ui/AuthButton';
import ThemeToggle from '@/components/ui/ThemeToggle';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Transform values for a "floating" effect
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['transparent', 'var(--background)']
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );

  const paddingY = useTransform(
    scrollY,
    [0, 50],
    ['24px', '16px']
  );

  const maxWidth = useTransform(
    scrollY,
    [0, 50],
    ['100%', '1200px']
  );

  const marginTop = useTransform(
    scrollY,
    [0, 50],
    ['0px', '16px']
  );

  const borderRadius = useTransform(
    scrollY,
    [0, 50],
    ['0px', '24px']
  );

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        maxWidth,
        marginTop,
        borderRadius,
      }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'border border-border shadow-2xl' : 'border-transparent'
      }`}
    >
      <div className="px-8 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black text-xl">
              V
            </div>
            <span className="text-2xl font-black text-foreground group-hover:text-primary transition-all duration-300 tracking-tighter">
              OpenVeda<span className="text-primary italic">.in</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {['Organizations', 'Programs', 'Mentorship'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground hover:bg-accent/50 px-5 py-2.5 rounded-2xl transition-all text-sm font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="hidden lg:flex items-center gap-2 px-4 py-2 glass rounded-2xl text-[10px] font-black tracking-widest text-muted-foreground hover:text-foreground transition-all group"
          >
            <span>SEARCH</span>
            <span className="bg-muted px-2 py-0.5 rounded-lg text-[8px] group-hover:bg-primary group-hover:text-primary-foreground transition-colors">⌘K</span>
          </button>
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </motion.nav>
  );
}