import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';

interface ExperienceSectionProps {
  mode: 'web2' | 'web3';
}

interface TimelineItem {
  role: string;
  period: string;
  description: string;
  tags: string[];
}

const WEB2_EXPERIENCE: TimelineItem[] = [
  {
    role: "Product Manager",
    period: "2022 - Present",
    description: "Lead product discovery and user research to define product strategies, align cross-functional roadmaps, and implement agile workflows to accelerate product shipments.",
    tags: ["Product Discovery", "User Research", "Product Strategy", "Roadmaps", "Agile", "Cross-functional Leadership"]
  },
  {
    role: "Digital Marketing Strategist",
    period: "2020 - 2022",
    description: "Optimized user acquisition funnels and growth campaigns. Utilized data analytics platforms to implement conversion optimization strategies that scaled user retention.",
    tags: ["Growth", "Analytics", "SEO", "Campaign Strategy", "Data Insights"]
  },
  {
    role: "Web Developer",
    period: "2018 - 2020",
    description: "Built performant and responsive client-side web applications using modern Javascript frameworks, ensuring seamless UX flows and system integrity.",
    tags: ["React", "Next.js", "Tailwind CSS", "Systems Design", "Frontend Engineering"]
  }
];

const WEB3_EXPERIENCE: TimelineItem[] = [
  {
    role: "Developer Relations & Advocacy",
    period: "2022 - Present",
    description: "Scale developer ecosystems by launching hackathons, developer communities, and ambassador programs. Author educational guides to demystify complex blockchain concepts.",
    tags: ["Developer Advocacy", "Hackathons", "Ambassador Programs", "Developer Communities", "Blockchain Education"]
  },
  {
    role: "Ecosystem & Token Growth",
    period: "2020 - 2022",
    description: "Designed tokenomics and go-to-market strategies for protocols, establishing strategic partnership growth channels to expand decentralized applications.",
    tags: ["Ecosystem Growth", "Token Growth", "Go-To-Market", "Partnership Growth", "Protocol Growth"]
  },
  {
    role: "Community & DAO Strategy",
    period: "2018 - 2020",
    description: "Managed high-engagement channels on Discord and Telegram. Established decentralized governance strategies and community metrics on quest platforms.",
    tags: ["Community Management", "DAO Strategy", "Governance", "Discord/Telegram", "Quest Platforms"]
  }
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ mode }) => {
  const experiences = mode === 'web2' ? WEB2_EXPERIENCE : WEB3_EXPERIENCE;

  return (
    <section 
      id="experience" 
      className="py-24 px-6 sm:px-10 max-w-5xl mx-auto w-full relative z-20"
    >
      <div className="flex flex-col items-center">
        {/* Section header */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 block text-center">
            Timeline
          </span>
        </FadeIn>
        
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            className={`font-display font-black uppercase text-center mb-16 tracking-tight ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Professional Experience
          </h2>
        </FadeIn>

        {/* Timeline wrapper */}
        <div className="relative w-full border-l-2 border-[var(--card-border)] ml-4 sm:ml-6 pl-6 sm:pl-8 flex flex-col gap-12 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col gap-12 w-full"
            >
              {experiences.map((item, index) => (
                <div key={`${mode}-${index}`} className="relative w-full">
                  {/* Timeline point indicator */}
                  <span 
                    className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-4 h-4 rounded-full border-4 border-[var(--bg-color)] transition-all duration-700 ${
                      mode === 'web2' ? 'bg-blue-600 shadow-md shadow-blue-500/25' : 'bg-purple-600 shadow-md shadow-purple-500/25'
                    }`}
                  />
                  
                  {/* Experience Card */}
                  <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-4 border border-[var(--card-border)] transition-shadow duration-300 hover:shadow-lg">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h3 className="font-display text-lg sm:text-2xl font-bold uppercase tracking-tight text-[var(--text-color)]">
                        {item.role}
                      </h3>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mt-1">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-light text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                            mode === 'web2'
                              ? 'bg-blue-50/50 text-blue-700 border-blue-100'
                              : 'bg-purple-950/20 text-purple-400 border-purple-900/50'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
