import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';

interface AboutSectionProps {
  mode: 'web2' | 'web3';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ mode }) => {
  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 py-24 overflow-hidden"
    >
      {/* Decorative 3D images in corners (Customization Maintained) */}
      <div className="absolute top-[6%] left-[2%] md:left-[4%] z-0 opacity-70">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon Icon"
            className="w-[100px] sm:w-[130px] md:w-[170px] h-auto object-contain select-none pointer-events-none"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] left-[2%] md:left-[5%] z-0 opacity-70">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object Left"
            className="w-[90px] sm:w-[110px] md:w-[140px] h-auto object-contain select-none pointer-events-none"
          />
        </FadeIn>
      </div>

      <div className="absolute top-[6%] right-[2%] md:right-[4%] z-0 opacity-70">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Icon"
            className="w-[100px] sm:w-[130px] md:w-[170px] h-auto object-contain select-none pointer-events-none"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] right-[2%] md:right-[5%] z-0 opacity-70">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Right"
            className="w-[110px] sm:w-[130px] md:w-[160px] h-auto object-contain select-none pointer-events-none"
          />
        </FadeIn>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center max-w-4xl z-10 select-none">
        
        {/* Section Title */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 block">
            About me
          </span>
        </FadeIn>

        {/* Heading: Two Worlds. One Builder. */}
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}
            className={`font-display font-black uppercase leading-none tracking-tight mb-12 ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Two Worlds. One Builder.
          </h2>
        </FadeIn>

        {/* About Paragraph (Scroll animation reveal) */}
        <div className="flex flex-col items-center gap-6 max-w-2xl text-[var(--text-muted)] font-medium leading-relaxed mb-10 text-center">
          <AnimatedText
            text="I enjoy solving difficult problems. Whether it's building a SaaS product, launching a blockchain ecosystem, scaling a developer community, or designing product strategies, I enjoy turning ambiguity into systems that create measurable outcomes."
            className="text-base sm:text-lg md:text-xl text-center select-none"
          />
          
          <AnimatedText
            text="Across the last six years I've worked across product management, growth marketing, developer relations, community building, and digital strategy. Today I focus on helping startups understand users, ship better products, and accelerate adoption."
            className="text-sm sm:text-base md:text-lg opacity-85 select-none"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
