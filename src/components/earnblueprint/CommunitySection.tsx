import React from 'react';
import { COMMUNITY_HIGHLIGHTS, TELEGRAM_URL } from '../../data/earnblueprintData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface CommunitySectionProps {
  onJoinClick?: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onJoinClick }) => {
  return (
    <section className="py-24 px-[5%] bg-[#0d1f3c] border-b border-white/5 relative">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Movement & Ecosystem
          </span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            The <span className="text-[#14b8a6]">Community</span>
          </h2>
          <p className="text-gray-200 text-lg sm:text-xl font-semibold max-w-[620px]">
            You do not have to figure it out alone.
          </p>
          <p className="text-gray-400 text-sm sm:text-base max-w-[660px] leading-relaxed">
            The Earn Blueprint is backed by FTLD — one of Africa's largest tech and freelance talent communities. When you join, you are not just getting guides. You are joining a movement.
          </p>
        </ScrollReveal>

        {/* FTLD Community Highlights Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" stagger={0.12}>
          {COMMUNITY_HIGHLIGHTS.map((item) => (
            <StaggerItem key={item.id}>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="h-full rounded-2xl bg-white/[0.03] border border-white/10 p-7 flex flex-col justify-between hover:border-[#14b8a6]/40 hover:bg-white/[0.05] transition-all duration-300 shadow-lg block"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{item.icon}</span>
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded bg-[#14b8a6]/15 text-[#14b8a6] font-mono text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-space text-xl font-bold text-white mb-3 flex items-center justify-between">
                    <span>{item.title}</span>
                    <span className="text-[#14b8a6] text-sm">&rarr;</span>
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Ecosystem Stats Banner */}
        <ScrollReveal delay={0.1} className="rounded-2xl bg-gradient-to-r from-[#14b8a6]/15 via-white/[0.04] to-[#2babeb]/15 border border-[#14b8a6]/30 p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-[900px] border-b border-white/10 pb-8">
            <div>
              <div className="font-space text-3xl font-bold text-[#14b8a6]">2,300+</div>
              <div className="text-xs text-gray-300">FTLD Telegram Members</div>
            </div>
            <div>
              <div className="font-space text-3xl font-bold text-white">3,000+</div>
              <div className="text-xs text-gray-300">Innovate 2025 Attendees</div>
            </div>
            <div>
              <div className="font-space text-3xl font-bold text-[#2babeb]">5,000+</div>
              <div className="text-xs text-gray-300">Freelancers Trained</div>
            </div>
            <div>
              <div className="font-space text-3xl font-bold text-emerald-400">Annual</div>
              <div className="text-xs text-gray-300">Innovate Conf (Uyo)</div>
            </div>
          </div>

          <p className="text-gray-300 text-sm sm:text-base max-w-[600px] leading-relaxed">
            Connect with real founders, get instant feedback on proposals, and access exclusive job opportunities in the FTLD Telegram community.
          </p>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="font-space text-xs font-bold px-8 py-4 rounded-xl bg-[#14b8a6] text-white tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(20,184,166,0.4)] inline-block text-center"
          >
            Join FTLD Telegram Community (t.me/ftldofficial)
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};
