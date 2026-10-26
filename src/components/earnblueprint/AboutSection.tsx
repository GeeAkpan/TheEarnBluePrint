"use client";
import React from 'react';
import { FOUNDER_DATA } from '../../data/earnblueprintData';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-24 px-[5%] bg-[#08152b] border-b border-white/5 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Platform Story Text */}
          <ScrollReveal direction="left" className="lg:col-span-7 flex flex-col items-start gap-6">
            <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
              Platform Story
            </span>

            <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Why we built this — <span className="text-[#14b8a6]">7 years of real execution.</span>
            </h2>

            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              {FOUNDER_DATA.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/[0.04] border-l-4 border-[#14b8a6] border-y border-r border-white/10 my-2 w-full">
              <p className="font-space text-lg text-white font-medium italic">
                &quot;{FOUNDER_DATA.keyQuote}&quot;
              </p>
            </div>
          </ScrollReveal>

          {/* Platform Profile Card */}
          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-8 backdrop-blur-xl shadow-2xl flex flex-col gap-6 text-center items-center">
              <div className="w-24 h-24 rounded-full bg-[#14b8a6]/20 border-2 border-[#14b8a6] p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#1a3f7a] flex items-center justify-center font-space font-bold text-2xl text-white">
                  EB
                </div>
              </div>

              <div>
                <h3 className="font-space text-2xl font-bold text-white">{FOUNDER_DATA.name}</h3>
                <p className="text-xs font-space text-[#14b8a6] font-semibold uppercase tracking-wider mt-1">
                  {FOUNDER_DATA.title}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 w-full text-left pt-2 border-t border-white/10">
                {FOUNDER_DATA.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="block font-space text-lg font-bold text-white">{stat.value}</span>
                    <span className="text-[11px] text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 w-full">
                {FOUNDER_DATA.socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#14b8a6] transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                  >
                    <span>{s.platform}</span>
                    <span>{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
