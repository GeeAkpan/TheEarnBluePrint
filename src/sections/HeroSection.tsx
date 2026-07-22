import React from 'react';
import LiquidBackground from '../components/LiquidBackground';

interface HeroSectionProps {
  mode: 'web2' | 'web3';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ mode }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-6 sm:px-10 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background glow centered behind content */}
      <div 
        className={`absolute inset-0 rounded-full blur-[120px] opacity-25 -z-10 transition-all duration-1000 w-[60%] h-[60%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          mode === 'web2' ? 'bg-blue-500' : 'bg-purple-600'
        }`}
      />

      {/* Dynamic Geometric Liquid Background (responds to hover) */}
      <LiquidBackground mode={mode} />

      <div className="w-full max-w-4xl flex flex-col items-center text-center justify-center gap-8 z-10 select-none">
        
        {/* Tagline */}
        <span 
          className={`font-display text-xs sm:text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border ${
            mode === 'web2' 
              ? 'text-blue-600 border-blue-200 bg-blue-50/50' 
              : 'text-purple-400 border-purple-900 bg-purple-950/30'
          }`}
        >
          Building products. Growing communities. Scaling businesses.
        </span>

        {/* Headline */}
        <h1 
          className={`font-display font-black uppercase tracking-tight leading-tight text-center text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] ${
            mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
          }`}
        >
          Building Products That People Actually Want.
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl text-[var(--text-muted)] mx-auto">
          Product Manager, Growth Strategist, Developer Advocate, and Community Builder helping startups move from ideas to adoption.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {/* Primary Button */}
          <a 
            href="#portfolio"
            className={`rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm px-8 py-3.5 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
              mode === 'web2'
                ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/25 hover:opacity-90'
            }`}
          >
            View Portfolio
          </a>

          {/* Secondary Button */}
          <a 
            href="#contact"
            className={`rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm px-8 py-3.5 border-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
              mode === 'web2'
                ? 'border-slate-200 hover:border-slate-800 text-slate-800'
                : 'border-slate-700 hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)] text-[#D7E2EA]'
            }`}
          >
            Let&apos;s Work Together
          </a>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
