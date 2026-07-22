import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';

interface SkillsSectionProps {
  mode: 'web2' | 'web3';
}

interface SkillCategory {
  title: string;
  skills: string[];
}

const WEB2_SKILLS: SkillCategory[] = [
  {
    title: "Product Management",
    skills: ["Product Management", "Product Discovery", "Market Research", "UX Strategy", "Roadmapping", "SQL", "Analytics", "Wireframing", "Agile", "Scrum", "Notion", "Jira", "Figma", "AI Product Development"]
  },
  {
    title: "Web Development",
    skills: ["Next.js", "React", "Tailwind", "Firebase", "Supabase", "TypeScript", "Vite", "Git"]
  },
  {
    title: "Marketing & Growth",
    skills: ["SEO", "Content Marketing", "Email Marketing", "Automation", "Growth", "A/B Testing", "Analytics Dashboards"]
  }
];

const WEB3_SKILLS: SkillCategory[] = [
  {
    title: "Developer Relations & Edu",
    skills: ["Developer Relations", "Developer Education", "Developer Advocacy", "Hackathon Strategy", "Ecosystem Expansion", "Smart Contract Fundamentals", "Wallet UX"]
  },
  {
    title: "Ecosystem & Token Growth",
    skills: ["Growth Marketing", "Tokenomics", "Go-To-Market", "Protocol Growth", "Crypto Research", "DeFi", "Layer 2s"]
  },
  {
    title: "Communities & Governance",
    skills: ["Community Management", "Governance", "Discord", "Telegram", "Galxe", "Quest Platforms", "Ambassador Programs"]
  }
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ mode }) => {
  const categories = mode === 'web2' ? WEB2_SKILLS : WEB3_SKILLS;

  return (
    <section 
      id="skills" 
      className="py-24 px-6 sm:px-10 max-w-6xl mx-auto w-full relative z-20"
    >
      <div className="flex flex-col items-center">
        {/* Section title */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 block text-center">
            Competencies
          </span>
        </FadeIn>
        
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            className={`font-display font-black uppercase text-center mb-16 tracking-tight ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Core Skills & Tools
          </h2>
        </FadeIn>

        {/* Categories Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <AnimatePresence mode="wait">
            {categories.map((cat, catIdx) => (
              <motion.div
                key={`${mode}-${cat.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: catIdx * 0.1, ease: 'easeOut' }}
                className="glass-panel rounded-3xl p-6 border border-[var(--card-border)] flex flex-col gap-6"
              >
                {/* Category Heading */}
                <h3 className="font-display text-sm font-extrabold uppercase tracking-widest text-[var(--text-color)] border-b border-[var(--card-border)] pb-3">
                  {cat.title}
                </h3>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        mode === 'web2'
                          ? 'bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-sm'
                          : 'bg-zinc-900/60 text-[#D7E2EA] border-zinc-800 hover:border-purple-500 hover:text-purple-400 hover:shadow-[0_0_12px_rgba(182,0,168,0.15)]'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
