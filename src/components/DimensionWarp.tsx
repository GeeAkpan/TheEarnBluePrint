import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DimensionWarpProps {
  isActive: boolean;
  mode: 'web2' | 'web3';
}

export const DimensionWarp: React.FC<DimensionWarpProps> = ({ isActive, mode }) => {
  // Dimension colors: blue gradient for Web2, purple-neon cyan gradient for Web3
  const gradient = mode === 'web2' 
    ? 'radial-gradient(circle, rgba(37, 99, 235, 0.95) 0%, rgba(14, 165, 233, 0.85) 50%, rgba(248, 250, 252, 0.98) 100%)'
    : 'radial-gradient(circle, rgba(182, 0, 168, 0.95) 0%, rgba(0, 245, 255, 0.85) 50%, rgba(12, 12, 12, 0.98) 100%)';

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1.6],
            opacity: [0, 1, 1, 0]
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.0, 
            ease: [0.25, 1, 0.5, 1], // easeOutQuart
            times: [0, 0.3, 0.7, 1]
          }}
          style={{
            background: gradient,
            transformOrigin: 'center center',
          }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
        >
          {/* Inner cosmic energy portal text */}
          <div className="text-center font-display uppercase tracking-widest text-[#FFFFFF] select-none">
            <motion.h3 
              animate={{ letterSpacing: ["4px", "12px", "4px"] }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="text-2xl sm:text-4xl md:text-5xl font-black text-white"
            >
              {mode === 'web2' ? 'Web2' : 'Web3'}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.0, times: [0, 0.4, 1] }}
              className="text-xs sm:text-sm font-light mt-4 text-white/70"
            >
              Aligning Dimension Matrices...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DimensionWarp;
