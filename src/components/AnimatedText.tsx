import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  // Interpolate opacity from 0.2 to 1 based on range
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder to reserve layout width and avoid shifting */}
      <span className="opacity-0 select-none">{char === " " ? "\u00A0" : char}</span>
      {/* Absolute positioned animated character */}
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "", style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Track the scroll position of the paragraph element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  
  // Count total characters (including spaces) to normalize the progress ranges
  const totalChars = text.length;
  let charIndexCounter = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const chars = word.split("");
        
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {chars.map((char, charIdx) => {
              const globalIdx = charIndexCounter;
              charIndexCounter++;
              const start = globalIdx / totalChars;
              const end = (globalIdx + 1) / totalChars;
              
              return (
                <Character
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
            
            {/* Add space after word, except for the last word */}
            {wordIdx < words.length - 1 && (() => {
              const globalIdx = charIndexCounter;
              charIndexCounter++;
              const start = globalIdx / totalChars;
              const end = (globalIdx + 1) / totalChars;
              
              return (
                <Character
                  key={`space-${wordIdx}`}
                  char=" "
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })()}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
