"use client";
import React from 'react';
import { PILLARS_DATA } from '../../data/earnblueprintData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const PillarsSection: React.FC = () => {
  return (
    <section className="py-24 px-[5%] bg-[#08152b] border-b border-white/5 relative">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Four Pillars of Income
          </span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            What We Cover — <span className="text-[#14b8a6]">Four Pillars</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-[640px] leading-relaxed">
            Every practical system you need to monetize, land high-value clients, build products, and scale.
          </p>
        </ScrollReveal>

        {/* Pillars Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.12}>
          {PILLARS_DATA.map((pillar) => (
            <StaggerItem key={pillar.id}>
              <div
                className={`h-full rounded-2xl bg-white/[0.03] border p-8 flex flex-col justify-between transition-all duration-300 group shadow-lg ${
                  pillar.isAvailable
                    ? 'border-[#14b8a6]/40 hover:bg-white/[0.06] hover:border-[#14b8a6] hover:shadow-[0_12px_36px_rgba(20,184,166,0.15)]'
                    : 'border-white/10 opacity-85 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{pillar.icon}</span>
                      <h3 className="font-space text-2xl font-bold text-white group-hover:text-[#14b8a6] transition-colors">
                        {pillar.name}
                      </h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        pillar.isAvailable
                          ? 'bg-[#14b8a6]/20 text-[#14b8a6] border border-[#14b8a6]/40'
                          : 'bg-white/10 text-gray-400 border border-white/15'
                      }`}
                    >
                      {pillar.status}
                    </span>
                  </div>

                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {pillar.tagline}
                  </p>

                  {/* Bullets */}
                  {pillar.bullets && pillar.bullets.length > 0 && (
                    <ul className="space-y-3 pt-4 border-t border-white/10">
                      {pillar.bullets.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-300">
                          <span className="w-4 h-4 rounded-full bg-[#14b8a6]/20 text-[#14b8a6] flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
