'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../../components/earnblueprint/Navbar';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract / Freelance', 'Internship / Graduate'];
const REGIONS = ['Nigeria', 'Africa', 'Global'];

export default function PostJobPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = new FormData(e.currentTarget);
    const payload = {
      title: String(form.get('title') ?? ''),
      company: String(form.get('company') ?? ''),
      url: String(form.get('url') ?? ''),
      category: String(form.get('category') ?? ''),
      region: String(form.get('region') ?? ''),
      job_type: String(form.get('job_type') ?? ''),
      remote: form.get('remote') === 'on',
      contact_email: String(form.get('contact_email') ?? ''),
    };

    try {
      const res = await fetch('/api/jobs/submit', {
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
          href="/jobs"
          className="text-sm text-gray-400 hover:text-[#14b8a6] transition-colors inline-flex items-center gap-1 mb-6"
        >
          ← Back to Jobs
        </Link>

        <div className="flex flex-col gap-3 mb-10">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Post a Job
          </span>
          <h1 className="font-space font-bold text-3xl sm:text-4xl text-white">
            Reach Our <span className="text-[#14b8a6]">Community</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Every listing is reviewed before it goes live, to keep the board free of spam and scams.
          </p>
        </div>

        {status === 'done' ? (
          <div className="rounded-2xl bg-white/[0.03] border border-[#14b8a6]/40 p-8 text-center">
            <p className="text-lg font-bold text-white mb-2">✅ Submitted</p>
            <p className="text-gray-400">
              Your listing is being reviewed and will go live once approved. We&apos;ll reach out at
              the contact email if we need anything else.
            </p>
            <Link
              href="/jobs"
              className="inline-block mt-6 font-space text-xs font-bold px-5 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase"
            >
              Back to Jobs
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Job Title *</label>
              <input type="text" name="title" required placeholder="e.g. Senior Backend Engineer" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Company *</label>
              <input type="text" name="company" required placeholder="e.g. Acme Inc." className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Application URL *</label>
              <input type="url" name="url" required placeholder="https://..." className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Category *</label>
              <input type="text" name="category" required placeholder="e.g. Software & IT" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Region *</label>
                <select name="region" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select a region
                  </option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Job Type *</label>
                <select name="job_type" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select a type
                  </option>
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm text-gray-300">
              <input type="checkbox" name="remote" className="w-4 h-4 accent-[#14b8a6]" />
              This role is remote
            </label>

            <div>
              <label className={labelClass}>Contact Email *</label>
              <input type="email" name="contact_email" required placeholder="you@company.com" className={inputClass} />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

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
