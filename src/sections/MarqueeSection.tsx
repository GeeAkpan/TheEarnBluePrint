import React, { useEffect, useRef, useState } from 'react';

const IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

// Row 1: First 11 images, tripled
const ROW1_IMAGES = [
  ...IMAGES.slice(0, 11),
  ...IMAGES.slice(0, 11),
  ...IMAGES.slice(0, 11)
];

// Row 2: Remaining 10 images, tripled
const ROW2_IMAGES = [
  ...IMAGES.slice(11),
  ...IMAGES.slice(11),
  ...IMAGES.slice(11)
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      // Scroll offset calculation: (scrollY - sectionTop + window.innerHeight) * 0.3
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    // Initialize offset
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 w-full overflow-hidden flex flex-col gap-3 select-none"
    >
      {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
      <div className="w-full overflow-hidden flex">
        <div 
          style={{ 
            transform: `translate3d(${offset - 200}px, 0px, 0px)`,
            willChange: 'transform'
          }}
          className="flex flex-nowrap gap-3 -ml-[1500px]" // Initial shift to left to prevent empty left gap when translating right
        >
          {ROW1_IMAGES.map((url, idx) => (
            <div 
              key={`row1-${idx}`} 
              className="w-[420px] h-[270px] shrink-0"
            >
              <img
                src={url}
                alt={`Portfolio element Row1-${idx}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
      <div className="w-full overflow-hidden flex">
        <div 
          style={{ 
            transform: `translate3d(${-(offset - 200)}px, 0px, 0px)`,
            willChange: 'transform'
          }}
          className="flex flex-nowrap gap-3 -ml-[500px]" // Standard slight offset shift
        >
          {ROW2_IMAGES.map((url, idx) => (
            <div 
              key={`row2-${idx}`} 
              className="w-[420px] h-[270px] shrink-0"
            >
              <img
                src={url}
                alt={`Portfolio element Row2-${idx}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
