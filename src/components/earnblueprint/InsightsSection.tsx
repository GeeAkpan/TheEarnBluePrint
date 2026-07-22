import React, { useState } from 'react';
import { INSIGHTS_DATA } from '../../data/earnblueprintData';
import type { Insight } from '../../types/earnblueprint';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const InsightsSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Insight | null>(null);

  return (
    <section className="py-24 px-[5%] bg-[#08152b] border-b border-white/5 relative">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Tactical Essays & Strategy
          </span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Practical <span className="text-[#14b8a6]">Insights</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-[620px]">
            No fluff. No high-level hype. Real strategy written directly from 7 years of execution.
          </p>
        </ScrollReveal>

        {/* Articles Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
          {INSIGHTS_DATA.map((article) => (
            <StaggerItem key={article.id}>
              <div
                onClick={() => setActiveArticle(article)}
                className="h-full rounded-2xl bg-white/[0.03] border border-white/10 p-7 flex flex-col justify-between hover:border-[#14b8a6]/40 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[11px] font-space font-bold text-[#14b8a6] uppercase tracking-wider">
                      {article.categoryTag}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{article.readTime}</span>
                  </div>

                  <h3 className="font-space text-xl font-bold text-white mb-3 group-hover:text-[#14b8a6] transition-colors leading-snug">
                    "{article.title}"
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-medium text-white">{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <span className="text-xs font-space font-bold text-[#14b8a6] group-hover:translate-x-1 transition-transform">
                    Read &rarr;
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Article Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="bg-[#0d1f3c] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-[700px] w-full max-h-[85vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl font-bold"
              >
                &times;
              </button>

              <span className="text-xs font-space font-bold text-[#14b8a6] uppercase tracking-widest block mb-2">
                {activeArticle.categoryTag} • {activeArticle.readTime}
              </span>

              <h2 className="font-space text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                "{activeArticle.title}"
              </h2>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 pb-4 border-b border-white/10">
                <span>By {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
              </div>

              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                {activeArticle.content?.map((para, idx) => (
                  <p key={idx}>{para}</p>
                )) || <p>{activeArticle.excerpt}</p>}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="font-space text-xs font-bold px-6 py-2.5 rounded-lg bg-[#14b8a6] text-white uppercase tracking-wider"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
