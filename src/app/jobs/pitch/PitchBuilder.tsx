'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Tone = 'professional' | 'friendly' | 'direct';

const TONES: { id: Tone; label: string }[] = [
  { id: 'professional', label: 'Professional' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'direct', label: 'Direct' },
];

function buildPitch(
  tone: Tone,
  { title, company, name, skillHighlight, portfolioLink }: {
    title: string;
    company: string;
    name: string;
    skillHighlight: string;
    portfolioLink: string;
  },
): string {
  const role = title || 'this role';
  const at = company ? ` at ${company}` : '';
  const who = name || '[Your name]';
  const highlight = skillHighlight || '[A sentence or two on the relevant experience/result that makes you a fit]';
  const portfolioLine = portfolioLink ? `\nHere's a quick look at my work: ${portfolioLink}\n` : '';

  if (tone === 'friendly') {
    return [
      `Hey! 👋`,
      ``,
      `Saw the ${role}${at} opening and had to reach out — it's exactly the kind of work I enjoy.`,
      ``,
      highlight,
      portfolioLine,
      `Would love to chat more if you're open to it!`,
      ``,
      who,
    ].filter((line) => line !== '').join('\n');
  }

  if (tone === 'direct') {
    return [
      `Re: ${role}${at}`,
      ``,
      `I'm a strong fit for this role.`,
      ``,
      highlight,
      portfolioLine,
      `Available to start immediately. Let's talk.`,
      ``,
      who,
    ].filter((line) => line !== '').join('\n');
  }

  return [
    `Hi,`,
    ``,
    `I came across the ${role}${at} role and wanted to reach out directly.`,
    ``,
    highlight,
    portfolioLine,
    `I'd welcome the chance to discuss how I can contribute to this role. Looking forward to hearing from you.`,
    ``,
    `Best regards,`,
    who,
  ].filter((line) => line !== '').join('\n');
}

export default function PitchBuilder() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') ?? '';
  const company = searchParams.get('company') ?? '';
  const category = searchParams.get('category') ?? '';

  const [tone, setTone] = useState<Tone>('professional');
  const [name, setName] = useState('');
  const [skillHighlight, setSkillHighlight] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [copied, setCopied] = useState(false);

  const pitch = useMemo(
    () => buildPitch(tone, { title, company, name, skillHighlight, portfolioLink }),
    [tone, title, company, name, skillHighlight, portfolioLink],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pitch);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — nothing to recover,
      // the text is already visible for the user to select manually.
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1f3c] text-white pt-32 pb-24 px-[5%]">
      <div className="max-w-[720px] mx-auto">
        <Link
          href="/jobs"
          className="text-sm text-gray-400 hover:text-[#14b8a6] transition-colors inline-flex items-center gap-1 mb-6"
        >
          ← Back to Jobs
        </Link>

        <div className="flex flex-col gap-3 mb-10">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Pitch Builder
          </span>
          <h1 className="font-space font-bold text-3xl sm:text-4xl text-white">
            {title ? (
              <>
                Pitch for <span className="text-[#14b8a6]">{title}</span>
              </>
            ) : (
              'Build Your Pitch'
            )}
          </h1>
          {(company || category) && (
            <p className="text-gray-400 text-base">
              {company && <>🏢 {company}</>}
              {company && category && <> · </>}
              {category && <span className="text-[#14b8a6]">{category}</span>}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 mb-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ada Okafor"
              className="w-full rounded-lg bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#14b8a6]/60"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Why you&apos;re a fit (1-2 sentences)
            </label>
            <textarea
              value={skillHighlight}
              onChange={(e) => setSkillHighlight(e.target.value)}
              placeholder="e.g. I've spent 4 years building e-commerce sites for 20+ clients, with a 95% five-star rating."
              rows={3}
              className="w-full rounded-lg bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#14b8a6]/60 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Portfolio or work sample link (optional)
            </label>
            <input
              type="text"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              placeholder="e.g. https://yourportfolio.com"
              className="w-full rounded-lg bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#14b8a6]/60"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              className={`font-space text-xs font-bold px-4 py-2 rounded-full border tracking-wider uppercase transition-all ${
                tone === t.id
                  ? 'bg-[#14b8a6] text-white border-[#14b8a6]'
                  : 'border-white/15 text-gray-300 hover:border-[#14b8a6]/60 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Your Pitch
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="font-space text-xs font-bold px-4 py-2 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-200 leading-relaxed">
            {pitch}
          </pre>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Want the full cold-outreach system — templates, follow-up sequences, and the strategy
          behind them?{' '}
          <Link href="/#products" className="text-[#14b8a6] hover:underline">
            Check out the Cold Email Playbook
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
