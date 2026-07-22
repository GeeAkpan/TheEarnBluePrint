import React from 'react';
import { BookOpen } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface WritingSectionProps {
  mode: 'web2' | 'web3';
}

interface Article {
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  link: string;
}

const ARTICLES: Article[] = [
  {
    title: "The Art of Product Discovery in Early-Stage Startups",
    category: "Product Management • Startup Strategy",
    readTime: "6 min read",
    date: "June 14, 2026",
    summary: "How to separate user noise from actual feedback, define critical MVPs, and validate core product hypotheses before committing developer resources.",
    link: "#contact"
  },
  {
    title: "Ecosystem Loops: Scaling Developer Communities from 0 to 10K",
    category: "Developer Relations • Community Building • Growth",
    readTime: "5 min read",
    date: "May 28, 2026",
    summary: "Exploring GTM playbooks for Layer-2 networks, hackathon incentive structures, developer onboarding metrics, and building sticky developer relations channels.",
    link: "#contact"
  },
  {
    title: "Building with Conviction: Blending AI Frontiers with Purpose",
    category: "AI • Leadership • Faith",
    readTime: "4 min read",
    date: "April 10, 2026",
    summary: "Reflecting on product ethics, staying grounded during AI acceleration loops, and building systems that deliver genuine human-centric value.",
    link: "#contact"
  }
];

export const WritingSection: React.FC<WritingSectionProps> = ({ mode }) => {
  return (
    <section 
      id="writing" 
      className="py-24 px-6 sm:px-10 max-w-5xl mx-auto w-full relative z-20"
    >
      <div className="flex flex-col items-center">
        {/* Section title */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 block text-center">
            Writing
          </span>
        </FadeIn>
        
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            className={`font-display font-black uppercase text-center mb-16 tracking-tight ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Latest Articles
          </h2>
        </FadeIn>

        {/* Medium-style Articles Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {ARTICLES.map((art, index) => (
            <FadeIn 
              key={index} 
              delay={index * 0.1} 
              y={30}
              className="glass-panel rounded-3xl p-6 border border-[var(--card-border)] flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 min-h-[320px]"
            >
              {/* Header metadata */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)]">
                  <span>{art.category}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors duration-250 cursor-pointer">
                  <a href={art.link}>{art.title}</a>
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm font-light text-[var(--text-muted)] leading-relaxed">
                  {art.summary}
                </p>
              </div>

              {/* Footer info */}
              <div className="flex justify-between items-center border-t border-[var(--card-border)] pt-4 mt-6 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                <span>{art.date}</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen size={12} />
                  <span>{art.readTime}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WritingSection;
