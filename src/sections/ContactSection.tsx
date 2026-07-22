import React from 'react';
import { Mail, Linkedin, Github, Twitter, FileText } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface ContactSectionProps {
  mode: 'web2' | 'web3';
}

const SOCIAL_LINKS = [
  {
    name: "Email",
    href: "mailto:godswillakp18@gmail.com",
    icon: <Mail size={16} />
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin size={16} />
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <Github size={16} />
  },
  {
    name: "X",
    href: "https://x.com",
    icon: <Twitter size={16} />
  },
  {
    name: "Resume",
    href: "#",
    icon: <FileText size={16} />
  }
];

export const ContactSection: React.FC<ContactSectionProps> = ({ mode }) => {
  return (
    <section 
      id="contact" 
      className="py-24 px-6 sm:px-10 max-w-4xl mx-auto w-full relative z-20 text-center"
    >
      <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto select-none">
        
        {/* Section title */}
        <FadeIn delay={0} y={30}>
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] mb-2 block">
            Let&apos;s talk
          </span>
        </FadeIn>

        {/* Headline: Let's Build Something Worth Remembering. */}
        <FadeIn delay={0.1} y={35}>
          <h2 
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            className={`font-display font-black uppercase leading-none tracking-tight ${
              mode === 'web2' ? 'hero-heading-web2' : 'hero-heading-web3'
            }`}
          >
            Let&apos;s Build Something Worth Remembering.
          </h2>
        </FadeIn>

        {/* Body */}
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-[var(--text-muted)]">
            Whether you&apos;re building a startup, scaling a product, growing a developer ecosystem, or launching a new idea—I&apos;d love to hear from you.
          </p>
        </FadeIn>

        {/* Buttons List */}
        <FadeIn delay={0.4} y={20} className="w-full flex flex-wrap justify-center gap-4 mt-4">
          {SOCIAL_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-2 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-xs px-6 py-3 border transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                mode === 'web2'
                  ? 'border-slate-200 bg-white hover:border-blue-600 hover:text-blue-600 text-slate-800 shadow-sm'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)] text-[#D7E2EA] shadow-md shadow-black/35'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </FadeIn>

      </div>
    </section>
  );
};

export default ContactSection;
