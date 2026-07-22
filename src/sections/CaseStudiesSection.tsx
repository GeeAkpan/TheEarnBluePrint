import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface CaseStudiesSectionProps {
  mode: 'web2' | 'web3';
}

interface CaseStudy {
  title: string;
  readTime: string;
  challenge: string;
  research: string;
  strategy: string;
  execution: string;
  metrics: string;
  lessons: string;
}

const WEB2_CASE_STUDY: CaseStudy = {
  title: "Optimizing Enterprise SaaS User Activation",
  readTime: "6 min read",
  challenge: "A business analytics platform faced a 65% drop-off rate during user self-onboarding due to confusing SQL configuration panels.",
  research: "Conducted 25 user interviews and examined hotjar logs, discovering that non-technical managers struggled to link data sources manually.",
  strategy: "Shifted the product roadmap from manual database integrations to a template-driven onboarding wizard with predefined standard dashboards.",
  execution: "Designed a 3-step setup flow with automated API syncs, using React, Tailwind CSS, and Node serverless functions to configure metrics instantly.",
  metrics: "Decreased user onboarding churn by 48%, increasing trial-to-paid conversions by 28% and driving $35K in initial trial MRR.",
  lessons: "Always hide initial setup friction from business users. Predefined value beats absolute configuration freedom every single time."
};

const WEB3_CASE_STUDY: CaseStudy = {
  title: "Scaling Developer Ecosystem Adoptions",
  readTime: "5 min read",
  challenge: "A newly launched Layer-2 blockchain protocol suffered from zero developer activity and empty block transactions.",
  research: "Audited existing developer docs; found major tooling setups missing and code samples out-of-date, frustrating builders.",
  strategy: "Replaced dense documentation pages with interactive coding sandboxes, launched ecosystem hackathons, and built developer advocacy loops.",
  execution: "Created step-by-step Solidity/Ethers.js templates, hosted 3 developer hackathons, and managed token bounty distributions for active validators.",
  metrics: "Acquired 5K+ new smart contract deployments, tracked 12M+ block transactions, and generated $12M+ in total value locked (TVL) liquidity.",
  lessons: "Developer tools must have copy-paste working templates. Friction during the initial compiler build blocks ecosystem adoption."
};

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ mode }) => {
  const study = mode === 'web2' ? WEB2_CASE_STUDY : WEB3_CASE_STUDY;

  return (
    <section 
      id="case-studies" 
      className="py-24 px-6 sm:px-10 max-w-4xl mx-auto w-full relative z-20"
    >
      <div className="flex flex-col items-center">
        {/* Section title */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 block text-center">
            Insights
          </span>
        </FadeIn>
        
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            className={`font-display font-black uppercase text-center mb-16 tracking-tight ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Deep Dive Case Studies
          </h2>
        </FadeIn>

        {/* Case Study Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${study.title}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full glass-panel rounded-[32px] border border-[var(--card-border)] p-6 sm:p-8 md:p-10 text-left flex flex-col gap-8 shadow-xl"
          >
            {/* Header: Title and Read time */}
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[var(--card-border)] pb-6">
              <h3 className="font-display text-xl sm:text-3xl font-black uppercase text-[var(--text-color)] tracking-tight max-w-xl">
                {study.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--card-border)] px-3 py-1.5 rounded-full select-none">
                <BookOpen size={14} />
                <span>{study.readTime}</span>
              </div>
            </div>

            {/* Content blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              
              {/* Challenge */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] opacity-85">
                  1. The Challenge
                </h4>
                <p className="text-sm font-light leading-relaxed text-[var(--text-color)]">
                  {study.challenge}
                </p>
              </div>

              {/* Research */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] opacity-85">
                  2. User Research
                </h4>
                <p className="text-sm font-light leading-relaxed text-[var(--text-color)]">
                  {study.research}
                </p>
              </div>

              {/* Strategy */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] opacity-85">
                  3. Product Strategy
                </h4>
                <p className="text-sm font-light leading-relaxed text-[var(--text-color)]">
                  {study.strategy}
                </p>
              </div>

              {/* Execution */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] opacity-85">
                  4. Execution & Tech
                </h4>
                <p className="text-sm font-light leading-relaxed text-[var(--text-color)]">
                  {study.execution}
                </p>
              </div>

              {/* Metrics */}
              <div className="flex flex-col gap-2 md:col-span-2 border-t border-[var(--card-border)] pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                  5. Measurable Metrics & Outcomes
                </h4>
                <p className="text-sm font-medium leading-relaxed text-emerald-600 dark:text-emerald-400">
                  {study.metrics}
                </p>
              </div>

              {/* Lessons Learned */}
              <div className="flex flex-col gap-2 md:col-span-2 border-t border-[var(--card-border)] pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  6. Lessons Learned
                </h4>
                <p className="text-sm font-light italic leading-relaxed text-[var(--text-color)]">
                  {study.lessons}
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
