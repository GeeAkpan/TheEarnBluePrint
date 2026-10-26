"use client";
import React, { useState } from 'react';
import { FAQS_DATA } from '../../data/earnblueprintData';
import type { FaqItem } from '../../types/earnblueprint';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 px-[5%] bg-[#0d1f3c] border-b border-white/5 relative">
      <div className="max-w-[840px] mx-auto">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Got Questions?
          </span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl text-white">
            Frequently Asked <span className="text-[#14b8a6]">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Everything you need to know about our guides, complete packs, and community.
          </p>
        </ScrollReveal>

        {/* Accordion FAQ List */}
        <StaggerContainer className="space-y-4" stagger={0.08}>
          {FAQS_DATA.map((faq: FaqItem) => {
            const isOpen = openId === faq.id;
            return (
              <StaggerItem key={faq.id}>
                <div
                  className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-space text-base sm:text-lg font-bold text-white transition-colors hover:text-[#14b8a6]"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#14b8a6] text-white' : 'text-gray-300'}`}>
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-gray-300 text-sm leading-relaxed border-t border-white/5">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
