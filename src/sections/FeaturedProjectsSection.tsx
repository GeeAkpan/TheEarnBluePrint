import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardStack } from '../components/ui/card-stack';
import FadeIn from '../components/FadeIn';

interface FeaturedProjectsSectionProps {
  mode: 'web2' | 'web3';
}

interface ProjectItem {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  impact: string;
  gradient: string;
  href?: string;
}

const WEB2_PROJECTS: ProjectItem[] = [
  {
    id: "w2p1",
    title: "Product Strategy Dashboard",
    role: "Lead Product Manager",
    problem: "Product teams struggled to trace feature metrics to core business goals, leading to misaligned roadmaps.",
    solution: "Designed a centralized visual roadmap analytics platform integrating Jira and Mixpanel APIs.",
    impact: "Boosted feature delivery speed by 25% and saved product leaders 12+ hours of monthly alignment meetings.",
    gradient: "from-blue-500 to-indigo-600",
    href: "#contact"
  },
  {
    id: "w2p2",
    title: "AI Customer Support Platform",
    role: "Senior PM (AI Initiatives)",
    problem: "Startups were losing users due to high response delays and ticket congestion on customer support.",
    solution: "Managed the discovery and launch of an LLM-powered support bot with automated agent handoff.",
    impact: "Resolved 62% of incoming queries instantly, reducing support operation costs by 40%.",
    gradient: "from-sky-400 to-blue-600",
    href: "#contact"
  },
  {
    id: "w2p3",
    title: "Freelancer CRM",
    role: "Product Manager & Designer",
    problem: "Freelance developers faced complex invoicing and project tracking tools designed for larger agencies.",
    solution: "Shipped a mobile-first, lightweight CRM focused strictly on invoice automation and pipeline tracking.",
    impact: "Onboarded 15K+ active freelance builders with a 93% positive UX satisfaction rating.",
    gradient: "from-slate-700 to-slate-900",
    href: "#contact"
  },
  {
    id: "w2p4",
    title: "Business Analytics Platform",
    role: "Growth Product Manager",
    problem: "Non-technical founders could not parse nested analytics databases, creating blockages in decision-making.",
    solution: "Designed simplified dashboard templates with automated daily Slack reporting integrations.",
    impact: "Drove a 35% increase in user retention, boosting monthly recurring revenue (MRR) by $40K.",
    gradient: "from-cyan-500 to-blue-700",
    href: "#contact"
  },
  {
    id: "w2p5",
    title: "Education SaaS",
    role: "Product Manager (Core UX)",
    problem: "School administrators found learning platforms overly complex, resulting in low system adoption.",
    solution: "Overhauled the core layout and lesson planner interfaces to reduce user cognitive load.",
    impact: "Reduced user onboarding churn by 50% and scaled platform usage to 500+ active classrooms.",
    gradient: "from-blue-600 to-slate-800",
    href: "#contact"
  },
  {
    id: "w2p6",
    title: "Marketplace Product",
    role: "Product & Growth Strategist",
    problem: "Local B2B vendors struggled to list items quickly, leading to low listing density on the marketplace.",
    solution: "Built a bulk CSV uploader and AI listing generator to streamline item listing onboarding flows.",
    impact: "Accelerated B2B vendor onboardings by 300% and expanded listing catalog density by 80%.",
    gradient: "from-indigo-600 to-slate-950",
    href: "#contact"
  }
];

const WEB3_PROJECTS: ProjectItem[] = [
  {
    id: "w3p1",
    title: "Developer Community Growth",
    role: "Developer Advocate Lead",
    problem: "A new Layer-1 protocol lacked developer adoption and documentation guides, resulting in zero smart contracts.",
    solution: "Launched a comprehensive GitBook guide repository and coordinate global developer workshops.",
    impact: "Grew the developer community from 0 to 5K+, resulting in 200+ smart contracts deployed in 6 months.",
    gradient: "from-purple-600 to-pink-600",
    href: "#contact"
  },
  {
    id: "w3p2",
    title: "Layer 2 Ecosystem Campaign",
    role: "Growth & Ecosystem PM",
    problem: "An Ethereum Layer-2 network was facing low active wallets and user migration drop-offs.",
    solution: "Launched an interactive Galxe/Quest ecosystem campaign with custom NFT achievements.",
    impact: "Drove 120K+ new active wallet migrations and generated $15M+ in TVL deposit growth.",
    gradient: "from-fuchsia-600 to-cyan-500",
    href: "#contact"
  },
  {
    id: "w3p3",
    title: "DAO Community Strategy",
    role: "Governance & Operations Lead",
    problem: "Ecosystem members faced proposal fatigue, leading to a drop in token voting participation.",
    solution: "Redesigned the governance framework, separating minor operational tasks from critical voting metrics.",
    impact: "Boosted token voting turnout by 65% and streamlined proposal executions by 3 weeks.",
    gradient: "from-purple-800 to-emerald-600",
    href: "#contact"
  },
  {
    id: "w3p4",
    title: "DeFi User Acquisition",
    role: "Growth Marketing Manager",
    problem: "A decentralized exchange (DEX) struggled to acquire long-term liquidity providers (LPs).",
    solution: "Designed referral bonus pools and automated yield dashboard displays to increase LP loyalty.",
    impact: "Scaled TVL by $8M and acquired 10K+ recurring yield-seeking users.",
    gradient: "from-emerald-500 to-cyan-500",
    href: "#contact"
  },
  {
    id: "w3p5",
    title: "Telegram Mini App",
    role: "Product Manager (GTM)",
    problem: "Web3 web apps faced high bounce rates due to onboarding complex wallet connection extensions.",
    solution: "Designed and launched a Telegram Mini App featuring automated embedded wallet creations.",
    impact: "Acquired 500K+ registered users in 3 weeks, with a 72% daily retention rate.",
    gradient: "from-cyan-500 to-purple-600",
    href: "#contact"
  },
  {
    id: "w3p6",
    title: "Token Growth Strategy",
    role: "Tokenomics Consultant",
    problem: "An ecosystem was facing severe token selling pressure due to short-term inflationary rewards.",
    solution: "Redesigned reward emissions, integrating multi-tier staking locks and ecosystem utility models.",
    impact: "Reduced monthly sell pressure by 45% and improved long-term token holder retention.",
    gradient: "from-purple-700 to-slate-900",
    href: "#contact"
  }
];

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ mode }) => {
  const projects = mode === 'web2' ? WEB2_PROJECTS : WEB3_PROJECTS;

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardWidth = Math.min(540, screenWidth - 32);
  // Give extra height on mobile viewports to prevent wrapping overflows from cutting off text
  const cardHeight = screenWidth < 640 ? 385 : 320;

  return (
    <section 
      id="portfolio" 
      className="py-24 px-4 sm:px-10 max-w-6xl mx-auto w-full relative z-20 overflow-hidden"
    >
      <div className="flex flex-col items-center">
        {/* Section Title */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 block text-center">
            Portfolio
          </span>
        </FadeIn>
        
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            className={`font-display font-black uppercase text-center mb-6 tracking-tight ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Featured Projects
          </h2>
        </FadeIn>

        {/* Dynamic CardStack Panel */}
        <FadeIn delay={0.2} y={20} className="w-full flex justify-center mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full max-w-[580px] flex justify-center"
            >
              <CardStack
                items={projects}
                initialIndex={0}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                autoAdvance={false}
                showDots={true}
                renderCard={(item, { active }) => (
                  <div className={`relative h-full w-full flex flex-col justify-between select-none transition-colors duration-500 ${
                    mode === 'web2' ? 'bg-white' : 'bg-[#141414]'
                  }`}>
                    
                    {/* Visual Header Grid/Gradient */}
                    <div className={`w-full h-24 bg-gradient-to-tr ${item.gradient} relative p-4 flex flex-col justify-between`}>
                      <div className="absolute inset-0 bg-black/15 mix-blend-multiply" />
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full w-fit z-10">
                        {item.role}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-black uppercase text-white tracking-tight z-10 truncate">
                        {item.title}
                      </h3>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 sm:p-5 flex flex-col gap-2.5 text-left flex-grow overflow-y-auto">
                      {/* Problem */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--accent-color)] opacity-85">
                          Problem
                        </span>
                        <p className="text-[11px] sm:text-xs font-light text-[var(--text-color)] leading-relaxed">
                          {item.problem}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--accent-color)] opacity-85">
                          Solution
                        </span>
                        <p className="text-[11px] sm:text-xs font-light text-[var(--text-color)] leading-relaxed">
                          {item.solution}
                        </p>
                      </div>

                      {/* Impact */}
                      <div className="flex flex-col gap-0.5 border-t border-[var(--card-border)] pt-2 mt-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500">
                          Impact & Metrics
                        </span>
                        <p className="text-[11px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400 leading-relaxed">
                          {item.impact}
                        </p>
                      </div>
                    </div>

                    {/* Footer/Action */}
                    <div className="px-4 pb-4">
                      <a
                        href="#contact"
                        className={`block text-center rounded-full font-bold uppercase tracking-widest text-[9px] sm:text-[10px] py-2.5 border border-[var(--card-border)] hover:bg-[var(--accent-glow)] text-[var(--text-color)] transition-colors duration-300 cursor-pointer`}
                      >
                        View Case Study
                      </a>
                    </div>

                  </div>
                )}
              />
            </motion.div>
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
