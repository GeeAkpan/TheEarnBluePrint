import React from 'react';
import { ScrollVideoBackground } from './ScrollVideoBackground';
import { HERO_DATA } from '../../data/earnblueprintData';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onReadGuides: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onReadGuides,
  containerRef,
}) => {
  return (
    <section className="relative min-h-[92vh] bg-[#0d1f3c] flex items-center pt-28 pb-20 px-[5%] overflow-hidden border-b border-white/10">
      {/* Scroll-Driven Video Background Component */}
      <ScrollVideoBackground containerRef={containerRef} />

      {/* Glow Overlay Accents */}
      <div className="absolute -top-24 -right-24 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(20,184,166,0.18)_0%,transparent_70%)] rounded-full pointer-events-none z-10" />
      <div className="absolute -bottom-24 -left-24 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(43,171,235,0.15)_0%,transparent_70%)] rounded-full pointer-events-none z-10" />

      <div className="max-w-[1200px] mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Main Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Pillar Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {HERO_DATA.pillarBadges.map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-space font-medium backdrop-blur-md"
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </span>
            ))}
          </div>

          <h1 className="font-space font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] tracking-tight drop-shadow-md">
            {HERO_DATA.headline}
          </h1>

          <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-[640px]">
            {HERO_DATA.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreProducts}
              className="font-space text-sm font-bold px-7 py-3.5 rounded-xl bg-[#14b8a6] text-white tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(20,184,166,0.5)] flex items-center gap-2"
            >
              Explore the Library &rarr;
            </button>
            <button
              onClick={onReadGuides}
              className="font-space text-sm font-bold px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white tracking-wide uppercase transition-all duration-300 hover:bg-white/20 hover:border-white/40 flex items-center gap-2"
            >
              Read the Insights &darr;
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 w-full max-w-[620px]">
            {HERO_DATA.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="font-space text-xl sm:text-2xl font-bold text-[#14b8a6]">{stat.value}</div>
                <div className="text-[11px] text-gray-300 font-medium leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Quote Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl bg-gradient-to-b from-white/15 to-white/5 p-1 border border-white/20 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#0d1f3c]/90 rounded-[14px] p-7 flex flex-col gap-5 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/20 border border-[#14b8a6]/40 flex items-center justify-center text-[#14b8a6] font-space font-bold text-xl mx-auto">
                EB
              </div>

              <blockquote className="font-space text-base md:text-lg text-white font-medium italic leading-relaxed">
                "{HERO_DATA.quote}"
              </blockquote>

              <div className="pt-3 border-t border-white/10 text-xs text-[#14b8a6] font-space font-semibold uppercase tracking-wider">
                The Earn Blueprint Promise
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
