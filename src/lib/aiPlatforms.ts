export type Eligibility = 'open' | 'limited' | 'us-only' | 'invite-only';

export interface AiPlatform {
  id: string;
  name: string;
  tagline: string;
  payRange: string;
  eligibility: Eligibility;
  eligibilityNote: string;
  url: string;
}

export const ELIGIBILITY_LABEL: Record<Eligibility, { label: string; className: string }> = {
  open: { label: '✅ Open to most of Africa', className: 'bg-[#14b8a6]/20 text-[#14b8a6] border-[#14b8a6]/40' },
  limited: { label: '⚠️ Limited / exclusions apply', className: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  'us-only': { label: '🇺🇸 US work authorization required', className: 'bg-red-500/20 text-red-400 border-red-500/40' },
  'invite-only': { label: '🔒 Invite / referral only in Africa', className: 'bg-white/10 text-gray-300 border-white/20' },
};

// Hand-verified via cross-referenced search, not scraped — this list changes
// slowly enough that a daily pipeline (like Jobs/Learn) isn't needed. Revisit
// eligibility notes periodically; platforms change country policies often.
export const AI_PLATFORMS: AiPlatform[] = [
  {
    id: 'mercor',
    name: 'Mercor',
    tagline: 'AI-matched expert network for RLHF, evaluation, and specialist work for frontier AI labs.',
    payRange: '$85/hr average, $200+/hr for senior specialists',
    eligibility: 'limited',
    eligibilityNote:
      'Many African countries are explicitly supported (incl. Nigeria, Ghana, South Africa, Egypt, Kenya), but listings that don’t specify a region default to US/CA/UK/EU only — check each listing’s region tag before applying.',
    url: 'https://mercor.com',
  },
  {
    id: 'handshake-ai',
    name: 'Handshake AI',
    tagline: 'AI training fellowship from the career platform Handshake — evaluation and model-testing work for top AI labs.',
    payRange: '$17–$125/hr depending on role',
    eligibility: 'us-only',
    eligibilityNote: 'Requires being based in the U.S. with valid work authorization — not accessible for most of this audience.',
    url: 'https://joinhandshake.com/ai',
  },
  {
    id: 'micro1',
    name: 'Micro1',
    tagline: 'RLHF and model-evaluation work, screened by an AI interviewer that passes only the top applicants.',
    payRange: '$10–$95/hr generalist, up to $200/hr for frontier AI/ML specialists',
    eligibility: 'open',
    eligibilityNote: 'Hires globally except a specific ~20-country blocklist (sanctioned/restricted regions) — Nigeria and most African countries are not excluded.',
    url: 'https://talent.micro1.ai',
  },
  {
    id: 'outlier',
    name: 'Outlier',
    tagline: 'Scale AI’s generalist RLHF and expert-tier platform — skills assessment to start.',
    payRange: '$15–$25/hr generalist, $30–$60/hr coding/expert-tier',
    eligibility: 'limited',
    eligibilityNote: 'Working-location policy explicitly excludes Nigeria, Ghana, Kenya, Uganda, and Ethiopia — check current availability for your specific country before applying.',
    url: 'https://outlier.ai',
  },
  {
    id: 'dataannotation',
    name: 'DataAnnotation',
    tagline: 'Generalist AI training work — strong English reading/writing and instruction-following.',
    payRange: 'Varies by project, generalist-tier',
    eligibility: 'limited',
    eligibilityNote: 'Primary markets are US/CA/UK/AU/NZ; African applicants report limited project access rather than a hard block.',
    url: 'https://www.dataannotation.tech',
  },
  {
    id: 'alignerr',
    name: 'Alignerr',
    tagline: 'Expert and generalist AI training network, similar scope to Mercor and Outlier.',
    payRange: 'Varies by role and expertise tier',
    eligibility: 'limited',
    eligibilityNote: 'Accepts applicants globally, but blocks a short list of countries that includes Kenya — most other African countries are unaffected.',
    url: 'https://alignerr.com',
  },
  {
    id: 'surge-ai',
    name: 'Surge AI',
    tagline: 'High-end RLHF and data work for frontier labs — among the highest-paying in this space.',
    payRange: 'Reported as the highest consistent rates of any Africa-facing platform',
    eligibility: 'invite-only',
    eligibilityNote: 'Operates in Kenya, Nigeria, and South Africa, but on an invitation/referral basis rather than open application.',
    url: 'https://www.surgehq.ai',
  },
];
