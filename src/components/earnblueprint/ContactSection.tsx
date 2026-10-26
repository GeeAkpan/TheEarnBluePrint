"use client";
import React, { useState } from 'react';
import { CLOSING_CTA_DATA, BUNDLE_DATA, CONTACT_EMAIL, TELEGRAM_URL, LINKTREE_URL } from '../../data/earnblueprintData';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: 'general', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-24 px-[5%] bg-[#0d1f3c] relative">
      <div className="max-w-[1200px] mx-auto space-y-20">
        {/* Closing High-Impact Callout Box */}
        <ScrollReveal className="rounded-2xl bg-gradient-to-r from-[#14b8a6]/25 via-white/[0.05] to-[#2babeb]/25 border-2 border-[#14b8a6] p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-2xl">
          <span className="px-3.5 py-1.5 rounded-full bg-[#14b8a6] text-white font-space text-xs font-bold tracking-widest uppercase">
            🔥 Limited Pack Offer
          </span>

          <h2 className="font-space font-bold text-3xl sm:text-5xl text-white max-w-[680px] leading-tight">
            {CLOSING_CTA_DATA.headline}
          </h2>

          <p className="text-gray-200 text-lg sm:text-xl max-w-[620px] leading-relaxed">
            &quot;{CLOSING_CTA_DATA.text}&quot;
          </p>

          <div className="flex flex-col items-center gap-3 pt-2">
            <a
              href={BUNDLE_DATA.link}
              target="_blank"
              rel="noreferrer"
              className="font-space text-sm sm:text-base font-bold px-9 py-4 rounded-xl bg-[#14b8a6] text-white uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_36px_rgba(20,184,166,0.5)] inline-block text-center"
            >
              {CLOSING_CTA_DATA.ctaText}
            </a>

            <span className="text-xs text-gray-300 font-medium">
              * {CLOSING_CTA_DATA.subtext}
            </span>
          </div>
        </ScrollReveal>

        {/* Contact Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8 border-t border-white/10">
          {/* Info Side */}
          <ScrollReveal direction="left" className="lg:col-span-5 flex flex-col gap-6">
            <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
              Direct Contact
            </span>
            <h2 className="font-space font-bold text-3xl text-white">
              Have Questions? <span className="text-[#14b8a6]">Get in Touch</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              For corporate advisory, team licenses, speaking engagements, or platform inquiries, send us a message below.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#14b8a6]/20 text-[#14b8a6] flex items-center justify-center font-bold">
                  ✉
                </div>
                <div>
                  <h4 className="font-space text-xs font-bold text-gray-400 uppercase">Direct Email</h4>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-semibold text-white hover:text-[#14b8a6]">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#2babeb]/20 text-[#2babeb] flex items-center justify-center font-bold">
                  💬
                </div>
                <div>
                  <h4 className="font-space text-xs font-bold text-gray-400 uppercase">Telegram Community</h4>
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-[#2babeb]">
                    t.me/ftldofficial
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  🌳
                </div>
                <div>
                  <h4 className="font-space text-xs font-bold text-gray-400 uppercase">Linktree / Founder Links</h4>
                  <a href={LINKTREE_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-emerald-400">
                    linktr.ee/theearneblueprint
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Side */}
          <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-8 sm:p-10 shadow-2xl relative">
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-[#14b8a6]/20 border border-[#14b8a6] text-[#14b8a6] text-sm font-semibold text-center animate-fadeIn">
                  ✓ Message sent! The Earn Blueprint team will get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-space font-bold text-gray-300 uppercase mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#14b8a6] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-space font-bold text-gray-300 uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#14b8a6] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-space font-bold text-gray-300 uppercase mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1f3c] border border-white/15 text-white text-sm focus:outline-none focus:border-[#14b8a6] transition-colors"
                  >
                    <option value="general">General Question</option>
                    <option value="product">Order & Delivery Help</option>
                    <option value="advisory">Consulting & Talent Inquiry</option>
                    <option value="partnership">Innovate Conf Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-space font-bold text-gray-300 uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you're working on or ask a question..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#14b8a6] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-space text-xs font-bold py-4 rounded-xl bg-[#14b8a6] text-white uppercase tracking-wider transition-all duration-300 hover:bg-[#14b8a6]/90 hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
