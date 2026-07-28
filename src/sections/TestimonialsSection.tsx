import React from 'react';
import FadeIn from '../components/FadeIn';

interface TestimonialsSectionProps {
  mode: 'web2' | 'web3';
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The Earn Blueprint team has an uncanny ability to turn absolute ambiguity into organized product systems. They aligned our technical roadmaps and accelerated our GTM launch strategy by weeks.",
    author: "Elena Rostova",
    role: "Head of Product",
    company: "Veloce Labs"
  },
  {
    // Mode-specific role (developer focused)
    quote: "Working with The Earn Blueprint team is a developer's dream. They bridge the gap between complex software architecture and user experience metrics, ensuring we build products people actually love.",
    author: "Elena Rostova",
    role: "Lead Smart Contract Engineer",
    company: "Solari Labs"
  },
  {
    quote: "His growth campaigns and developer advocacy loops scaled our user transaction numbers exponentially. He understands communities, developer incentives, and how to scale ecosystems.",
    author: "Marcus Vance",
    role: "Marketing Director",
    company: "Layer 2 Foundation"
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ mode }) => {
  return (
    <section 
      id="testimonials" 
      className="py-24 px-6 sm:px-10 max-w-6xl mx-auto w-full relative z-20"
    >
      <div className="flex flex-col items-center">
        {/* Section title */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 block text-center">
            Reviews
          </span>
        </FadeIn>
        
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            className={`font-display font-black uppercase text-center mb-16 tracking-tight ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Ecosystem Feedback
          </h2>
        </FadeIn>

        {/* Testimonials Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {TESTIMONIALS.map((item, index) => (
            <FadeIn 
              key={index} 
              delay={index * 0.15} 
              y={30}
              className="glass-panel rounded-3xl p-6 md:p-8 border border-[var(--card-border)] flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 min-h-[260px]"
            >
              {/* Quote */}
              <p className="text-xs sm:text-sm md:text-base font-light italic leading-relaxed text-[var(--text-color)] select-none">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex flex-col gap-0.5 border-t border-[var(--card-border)] pt-4 mt-6">
                <span className="font-display text-sm font-bold uppercase tracking-tight text-[var(--text-color)]">
                  {item.author}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {item.role} &bull; {item.company}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
