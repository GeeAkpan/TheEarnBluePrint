'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../../components/earnblueprint/Navbar';

export default function SellPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get('name') ?? ''),
      description: String(form.get('description') ?? ''),
      price: Number(form.get('price') ?? 0),
      currency: String(form.get('currency') ?? 'NGN'),
      category: String(form.get('category') ?? ''),
      image_url: String(form.get('image_url') ?? ''),
      seller_name: String(form.get('seller_name') ?? ''),
      seller_whatsapp: String(form.get('seller_whatsapp') ?? ''),
      contact_email: String(form.get('contact_email') ?? ''),
    };

    try {
      const res = await fetch('/api/store/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong. Please try again.');
      }
      setStatus('done');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-lg bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#14b8a6]/60';
  const labelClass = 'block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2';

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0d1f3c] text-white pt-32 pb-24 px-[5%]">
        <div className="max-w-[640px] mx-auto">
          <Link
            href="/store"
            className="text-sm text-gray-400 hover:text-[#14b8a6] transition-colors inline-flex items-center gap-1 mb-6"
          >
            ← Back to Store
          </Link>

          <div className="flex flex-col gap-3 mb-10">
            <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
              Sell a Product
            </span>
            <h1 className="font-space font-bold text-3xl sm:text-4xl text-white">
              List Your Product, Free
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Every listing is reviewed before it goes live. Buyers reach you directly on
              WhatsApp to close the order — there&apos;s no fee to list right now.
            </p>
          </div>

          {status === 'done' ? (
            <div className="rounded-2xl bg-white/[0.03] border border-[#14b8a6]/40 p-8 text-center">
              <p className="text-lg font-bold text-white mb-2">Submitted</p>
              <p className="text-gray-400">
                Your listing is being reviewed and will go live once approved.
              </p>
              <Link
                href="/store"
                className="inline-block mt-6 font-space text-xs font-bold px-5 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase"
              >
                Back to Store
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className={labelClass}>Product Name *</label>
                <input type="text" name="name" required placeholder="e.g. Handmade Leather Wallet" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="What it is, what makes it worth buying…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Price *</label>
                  <input type="number" name="price" required min="1" step="0.01" placeholder="15000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Currency *</label>
                  <select name="currency" required defaultValue="NGN" className={inputClass}>
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Category *</label>
                <input type="text" name="category" required placeholder="e.g. Fashion & Accessories" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Image URL</label>
                <input type="url" name="image_url" placeholder="https://..." className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Your Name *</label>
                <input type="text" name="seller_name" required placeholder="e.g. Ada Okafor" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>WhatsApp Number *</label>
                <input
                  type="tel"
                  name="seller_whatsapp"
                  required
                  placeholder="e.g. +234 801 234 5678"
                  className={inputClass}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include your country code. Buyers will message you here directly to order.
                </p>
              </div>

              <div>
                <label className={labelClass}>Contact Email</label>
                <input type="email" name="contact_email" placeholder="you@example.com" className={inputClass} />
              </div>

              {status === 'error' && <p className="text-sm text-red-400">{errorMessage}</p>}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="font-space text-sm font-bold px-6 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit for Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
