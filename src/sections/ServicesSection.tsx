import React from 'react';
import FadeIn from '../components/FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    name: "3D Modeling",
    description: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
  },
  {
    number: "02",
    name: "Rendering",
    description: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
  },
  {
    number: "03",
    name: "Motion Design",
    description: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
  },
  {
    number: "04",
    name: "Branding",
    description: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
  },
  {
    number: "05",
    name: "Web Design",
    description: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section 
      id="services" 
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="font-black uppercase text-[#0C0C0C] text-center mb-16 sm:mb-20 md:mb-28 tracking-tight select-none"
          >
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="w-full border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((item, index) => (
            <FadeIn 
              key={item.number} 
              delay={index * 0.1} 
              y={30}
              className="w-full flex items-center gap-6 sm:gap-10 md:gap-16 border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12"
            >
              {/* Number on the left */}
              <div 
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                className="font-black shrink-0 text-[#0C0C0C] leading-none select-none w-[100px] sm:w-[150px] md:w-[200px]"
              >
                {item.number}
              </div>

              {/* Title & Description on the right */}
              <div className="flex flex-col gap-2 md:gap-3 text-left">
                <h3 
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  className="font-medium uppercase text-[#0C0C0C] leading-tight select-none"
                >
                  {item.name}
                </h3>
                <p 
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  className="font-light leading-relaxed text-[#0C0C0C] opacity-60 max-w-2xl"
                >
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
