import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  mode: 'web2' | 'web3';
}

const LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Experience', href: '#experience' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Skills', href: '#skills' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ mode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-6xl rounded-2xl glass-panel border border-[var(--card-border)] py-3 px-6 transition-all duration-700"
    >
      <div className="flex justify-between items-center w-full">
        {/* Brand Name */}
        <a 
          href="#home" 
          className="font-display font-black text-xl uppercase tracking-widest text-[var(--text-color)] hover:opacity-85 transition-opacity"
        >
          The Earn Blueprint
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs uppercase font-semibold tracking-wider text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden text-[var(--text-color)] hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Links Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden mt-3 pt-3 border-t border-[var(--card-border)] flex flex-col gap-3"
          >
            {LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase font-semibold tracking-wider py-1.5 text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
