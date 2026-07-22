import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MouseGlowProps {
  mode: 'web2' | 'web3';
}

export const MouseGlow: React.FC<MouseGlowProps> = ({ mode }) => {
  // Motion values to bypass React state re-renders for max performance
  const mouseX = useMotionValue(-300); // Start off-screen
  const mouseY = useMotionValue(-300);

  // Smooth springs for cursor follow physics
  const springConfig = { damping: 35, stiffness: 220, mass: 0.4 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Shift by 150px (half of the 300px glow width) to center the glow on the cursor
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Adjust glow color depending on the mode (blue for web2, neon purple for web3)
  const bgGlow = mode === 'web2'
    ? 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(14, 165, 233, 0.08) 50%, rgba(0, 0, 0, 0) 100%)'
    : 'radial-gradient(circle, rgba(181, 1, 167, 0.18) 0%, rgba(119, 33, 177, 0.08) 50%, rgba(0, 0, 0, 0) 100%)';

  return (
    <motion.div
      style={{
        x: glowX,
        y: glowY,
        background: bgGlow,
        willChange: 'transform',
      }}
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full blur-[40px] pointer-events-none z-40 mix-blend-screen"
    />
  );
};

export default MouseGlow;
