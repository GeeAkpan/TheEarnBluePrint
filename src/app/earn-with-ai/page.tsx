import { Navbar } from '../../components/earnblueprint/Navbar';
import { AI_PLATFORMS, ELIGIBILITY_LABEL } from '../../lib/aiPlatforms';

export default function EarnWithAiPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0d1f3c] text-white pt-32 pb-24 px-[5%]">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
              Pillar 06 · Earn with AI
            </span>
            <h1 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
              Get Paid to <span className="text-[#14b8a6]">Train AI</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-[640px] leading-relaxed">
              Platforms paying for RLHF, data labeling, and model evaluation work. Hand-verified —
              not scraped — because this space is heavily targeted by scam clones, and eligibility
              varies a lot by country.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {AI_PLATFORMS.map((platform) => {
              const badge = ELIGIBILITY_LABEL[platform.eligibility];
              return (
                <li
                  key={platform.id}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-[#14b8a6]/40 hover:bg-white/[0.06] transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="font-space text-xl font-bold text-white">{platform.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold border whitespace-nowrap ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{platform.tagline}</p>
                  <p className="text-[#14b8a6] text-sm font-semibold mb-3">💰 {platform.payRange}</p>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{platform.eligibilityNote}</p>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-space text-xs font-bold px-4 py-2 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
                  >
                    Visit Platform →
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="text-center text-xs text-gray-500 mt-12">
            Verify eligibility for your specific country directly on each platform before applying
            — policies change often. Never pay to apply or to &ldquo;unlock&rdquo; training work;
            legitimate platforms don&apos;t charge applicants.
          </p>
        </div>
      </div>
    </>
  );
}
