import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050e1d] text-gray-400 py-16 px-[5%] border-t border-white/10">
      <div className="max-w-[1200px] mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Logo variant="light" onClick={() => onNavigate('home')} />

            <p className="text-xs text-gray-300 leading-relaxed max-w-[340px]">
              The platform for freelancers, entrepreneurs, and business people who are serious about earning more. Practical systems, real tools, no fluff.
            </p>

            <div className="flex items-center gap-3 text-sm text-gray-300 pt-1">
              <a href="https://twitter.com/the_ftldconcave" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-[#14b8a6] hover:border-[#14b8a6]/40 transition-colors">
                𝕏
              </a>
              <a href="https://ftld.org" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-[#2babeb] hover:border-[#2babeb]/40 transition-colors">
                🌍
              </a>
            </div>
          </div>

          {/* Products List */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-space text-xs font-bold text-white uppercase tracking-wider mb-1">
              Products
            </h4>
            <button onClick={() => onNavigate('products')} className="text-xs text-left text-[#14b8a6] font-bold hover:underline">
              🔥 Complete Bundle (Save ₦5,000)
            </button>
            <button onClick={() => onNavigate('products')} className="text-xs text-left text-gray-300 hover:text-white transition-colors">
              Cold Email Playbook (₦5,000)
            </button>
            <button onClick={() => onNavigate('products')} className="text-xs text-left text-gray-300 hover:text-white transition-colors">
              How to Raise Your Rates (₦5,000)
            </button>
            <button onClick={() => onNavigate('products')} className="text-xs text-left text-gray-300 hover:text-white transition-colors">
              Upwork in 30 Days (₦5,000)
            </button>
            <button onClick={() => onNavigate('products')} className="text-xs text-left text-gray-300 hover:text-white transition-colors">
              Twitter/X for Clients (₦5,000)
            </button>
          </div>

          {/* Platform Sections */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="font-space text-xs font-bold text-white uppercase tracking-wider mb-1">
              Platform
            </h4>
            {[
              { id: 'products', label: 'Product Library' },
              { id: 'insights', label: 'Insights' },
              { id: 'community', label: 'Community' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-xs text-left text-gray-300 hover:text-[#14b8a6] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* External Links & Pillars */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-space text-xs font-bold text-white uppercase tracking-wider mb-1">
              Network & Pillars
            </h4>
            <a href="https://ftld.org" target="_blank" rel="noreferrer" className="text-xs text-gray-300 hover:text-[#14b8a6] transition-colors">
              FTLD Community (2,300+ Members)
            </a>
            <a href="https://theconcavelabs.org" target="_blank" rel="noreferrer" className="text-xs text-gray-300 hover:text-[#14b8a6] transition-colors">
              The Concave Labs (Consulting Arm)
            </a>
            <a href="https://twitter.com/the_ftldconcave" target="_blank" rel="noreferrer" className="text-xs text-gray-300 hover:text-[#14b8a6] transition-colors">
              Twitter / X (@the_ftldconcave)
            </a>

            <div className="pt-2 text-[11px] text-gray-400 space-y-1">
              <div>💼 Freelancing • 🚀 Entrepreneurship</div>
              <div>📈 Business Growth • 🤖 AI and Tech</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2025 The Earn Blueprint. Founded by Godswill Akpan · theearneblueprint.co</p>
          <p className="font-mono text-[11px]">Built for real earnings.</p>
        </div>
      </div>
    </footer>
  );
};
