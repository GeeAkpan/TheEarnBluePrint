import React, { useState } from 'react';
import { PRODUCTS_DATA, BUNDLE_DATA } from '../../data/earnblueprintData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const ProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section className="py-24 px-[5%] bg-[#0d1f3c] border-b border-white/5 relative">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Practical Playbooks & Action Plans
          </span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Product <span className="text-[#14b8a6]">Library</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-[620px]">
            Every template, script, and step-by-step framework delivered straight to your inbox instantly.
          </p>
        </ScrollReveal>

        {/* Filter Buttons */}
        <ScrollReveal delay={0.1} className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {[
            { id: 'all', label: 'All' },
            { id: 'freelancing', label: '💼 Freelancing' },
            { id: 'entrepreneurship', label: '🚀 Entrepreneurship' },
            { id: 'business-growth', label: '📈 Business Growth' },
            { id: 'ai-tech', label: '🤖 AI and Tech' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`font-space text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 uppercase tracking-wider ${
                activeCategory === tab.id
                  ? 'bg-[#14b8a6] text-white shadow-[0_4px_16px_rgba(20,184,166,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Featured Bundle Highlight Offer */}
        <ScrollReveal delay={0.15} className="mb-16 rounded-2xl bg-gradient-to-r from-[#14b8a6]/20 via-white/[0.05] to-[#2babeb]/20 border-2 border-[#14b8a6] p-8 sm:p-12 shadow-2xl relative overflow-hidden group hover:shadow-[0_16px_48px_rgba(20,184,166,0.25)] transition-all duration-300">
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 rounded-full bg-[#14b8a6] text-white font-space text-xs font-bold tracking-widest uppercase">
            🔥 {BUNDLE_DATA.tag}
          </div>

          <div className="max-w-[800px] flex flex-col items-start gap-4">
            <span className="font-space text-xs font-bold text-[#14b8a6] uppercase tracking-widest">
              Exclusive Offer
            </span>
            <h3 className="font-space font-bold text-2xl sm:text-4xl text-white leading-tight">
              {BUNDLE_DATA.title}
            </h3>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
              {BUNDLE_DATA.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 w-full">
              {BUNDLE_DATA.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-200 bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="text-[#14b8a6] font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 w-full">
              <div className="flex items-baseline gap-3">
                <span className="font-space text-3xl sm:text-4xl font-bold text-white">{BUNDLE_DATA.price}</span>
                <span className="text-lg text-gray-400 line-through">{BUNDLE_DATA.origPrice}</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                  ({BUNDLE_DATA.savings})
                </span>
              </div>

              <a
                href={BUNDLE_DATA.link}
                target="_blank"
                rel="noreferrer"
                className="font-space text-sm font-bold px-8 py-4 rounded-xl bg-[#14b8a6] text-white uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(20,184,166,0.5)] inline-block text-center"
              >
                {BUNDLE_DATA.cta}
              </a>
            </div>

            <p className="text-xs text-gray-400 italic">
              *All 4 PDFs delivered to your inbox instantly after payment
            </p>
          </div>
        </ScrollReveal>

        {/* Standard Products Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.1}>
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <div
                className="h-full rounded-2xl bg-white/[0.03] border border-white/10 p-7 flex flex-col justify-between hover:border-[#14b8a6]/40 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(20,184,166,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full t-paid">
                      {product.tag}
                    </span>
                    <span className="font-space text-2xl font-bold text-white">{product.price}</span>
                  </div>

                  <h3 className="font-space text-2xl font-bold text-white mb-3">
                    {product.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {product.desc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {product.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full font-space text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider transition-all duration-300 bg-[#14b8a6] text-white hover:bg-[#14b8a6]/90 hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] inline-block text-center"
                >
                  {product.cta}
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
