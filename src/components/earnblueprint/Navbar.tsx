"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Logo } from './Logo';

interface NavbarProps {
  // Both omitted when rendered on a page other than the homepage (e.g.
  // /jobs) — there's no scroll-spy or same-page section to navigate to from
  // there, so links fall back to real hrefs back to "/" instead.
  activePage?: string;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate?.(page);
    setMobileOpen(false);
  };

  const isLight = activePage !== 'home' && isScrolled;

  // onNavigate is only passed on the homepage (it drives scroll-spy there).
  // Anywhere else, these need to be real links back to "/" + an anchor, not
  // a same-page scrollIntoView call that has nothing to scroll to.
  const standalone = !onNavigate;
  const sectionHref = (id: string) => (id === 'home' ? '/' : `/#${id}`);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'insights', label: 'Insights' },
    { id: 'community', label: 'Community' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 z-50 px-[5%] transition-all duration-350 ${
          isLight
            ? 'nav-white text-gray-800'
            : 'nav-solid text-white'
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px]">
          {/* Official Transparent Logo */}
          {standalone ? (
            <Link href="/">
              <Logo variant={isLight ? 'dark' : 'light'} />
            </Link>
          ) : (
            <Logo variant={isLight ? 'dark' : 'light'} onClick={() => handleNavClick('home')} />
          )}

          {/* Desktop Links with Framer Motion Dynamic Underline */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              const linkClassName = `text-sm font-medium transition-colors relative py-1 px-1 ${
                isActive
                  ? 'text-[#14b8a6] font-semibold'
                  : isLight
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white/70 hover:text-white'
              }`;
              if (standalone) {
                return (
                  <Link key={link.id} href={sectionHref(link.id)} className={linkClassName}>
                    {link.label}
                  </Link>
                );
              }
              return (
                <button key={link.id} onClick={() => handleNavClick(link.id)} className={linkClassName}>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#14b8a6] rounded-full shadow-[0_2px_8px_rgba(20,184,166,0.6)]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
            <Link
              href="/jobs"
              className={`text-sm font-medium transition-colors relative py-1 px-1 ${
                isLight ? 'text-gray-700 hover:text-gray-900' : 'text-white/70 hover:text-white'
              }`}
            >
              Jobs
            </Link>
            <Link
              href="/learn"
              className={`text-sm font-medium transition-colors relative py-1 px-1 ${
                isLight ? 'text-gray-700 hover:text-gray-900' : 'text-white/70 hover:text-white'
              }`}
            >
              Learn
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            {standalone ? (
              <Link
                href="/#products"
                className="font-space text-xs font-bold px-5 py-2.5 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
              >
                Get Started
              </Link>
            ) : (
              <button
                onClick={() => handleNavClick('products')}
                className="font-space text-xs font-bold px-5 py-2.5 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          >
            <span className={`w-6 h-[2px] rounded-full transition-colors ${isLight ? 'bg-gray-900' : 'bg-white'}`} />
            <span className={`w-6 h-[2px] rounded-full transition-colors ${isLight ? 'bg-gray-900' : 'bg-white'}`} />
            <span className={`w-6 h-[2px] rounded-full transition-colors ${isLight ? 'bg-gray-900' : 'bg-white'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0d1f3c] flex flex-col pt-24 px-[8%] pb-12 gap-6 md:hidden animate-fadeIn">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-[8%] text-3xl text-white/60 hover:text-white"
          >
            &times;
          </button>
          {navLinks.map((link) => {
            const mobileClassName = `font-space text-3xl font-bold text-left transition-colors flex items-center justify-between ${
              activePage === link.id ? 'text-[#14b8a6]' : 'text-white hover:text-[#14b8a6]'
            }`;
            if (standalone) {
              return (
                <Link
                  key={link.id}
                  href={sectionHref(link.id)}
                  onClick={() => setMobileOpen(false)}
                  className={mobileClassName}
                >
                  <span>{link.label}</span>
                </Link>
              );
            }
            return (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className={mobileClassName}>
                <span>{link.label}</span>
                {activePage === link.id && <span className="text-xl">&bull;</span>}
              </button>
            );
          })}
          <Link
            href="/learn"
            onClick={() => setMobileOpen(false)}
            className="font-space text-3xl font-bold text-left text-white hover:text-[#14b8a6] transition-colors"
          >
            Learn
          </Link>
          <Link
            href="/jobs"
            onClick={() => setMobileOpen(false)}
            className="font-space text-3xl font-bold text-left text-white hover:text-[#14b8a6] transition-colors"
          >
            Jobs
          </Link>
          <div className="mt-8 pt-6 border-t border-white/10">
            {standalone ? (
              <Link
                href="/#products"
                onClick={() => setMobileOpen(false)}
                className="block w-full font-space text-sm font-bold py-3 rounded-lg bg-[#14b8a6] text-white text-center uppercase tracking-wider"
              >
                Explore Products
              </Link>
            ) : (
              <button
                onClick={() => handleNavClick('products')}
                className="w-full font-space text-sm font-bold py-3 rounded-lg bg-[#14b8a6] text-white text-center uppercase tracking-wider"
              >
                Explore Products
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
