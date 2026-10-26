import type { Pillar, Product, Insight, CommunityHighlight } from '../types/earnblueprint';

export const HERO_DATA = {
  headline: "Every Way to Earn More Starts Here.",
  subheadline: "Practical guides, tools, and insights for freelancers, entrepreneurs, and business people who are serious about building income that lasts. Not motivation. The actual system.",
  quote: "We exist to give every freelancer, entrepreneur, and business person the system they were never taught — so they can earn more and build something real.",
  stats: [
    { value: "5,000+", label: "People Trained" },
    { value: "4", label: "Guides Live Now" },
    { value: "3,000+", label: "Innovate Attendees" },
    { value: "7 Yrs", label: "Building Live" }
  ],
  pillarBadges: [
    { icon: "💼", label: "Freelancing" },
    { icon: "🚀", label: "Entrepreneurship" },
    { icon: "📈", label: "Business Growth" },
    { icon: "🤖", label: "AI and Tech" }
  ]
};

export const PILLARS_DATA: Pillar[] = [
  {
    id: 'freelancing',
    num: '01',
    icon: '💼',
    name: 'Freelancing',
    badge: 'Pillar 01',
    headline: 'Build a Sustainable Freelance Career',
    tagline: 'Find clients, raise rates, win on platforms, and build a sustainable freelance career that pays what you are worth.',
    status: '4 products available now · more coming',
    isAvailable: true,
    bullets: [
      'Cold email outreach templates & 4-email follow-up sequences',
      'Rate calculator, objection scripts, and 90-day rate increase strategy',
      'Complete Upwork profile & proposal system with JSS protection',
      'Twitter/X content strategy & DM pipeline for inbound clients'
    ]
  },
  {
    id: 'entrepreneurship',
    num: '02',
    icon: '🚀',
    name: 'Entrepreneurship',
    badge: 'Pillar 02',
    headline: 'Launch & Scale Digital Products',
    tagline: 'Launch digital products, build brands, create income streams, and grow from solo operator to real business owner.',
    status: 'Coming soon',
    isAvailable: false,
    bullets: [
      'Digital product idea validation & Gumroad / LemonSqueezy launchkits',
      'Audience-first brand positioning & organic content funnels',
      'Productized service frameworks & revenue diversification'
    ]
  },
  {
    id: 'business-growth',
    num: '03',
    icon: '📈',
    name: 'Business Growth',
    badge: 'Pillar 03',
    headline: 'Systems, Strategy & Scaling Operations',
    tagline: 'Systems, strategy, and tools to grow an existing business — from marketing and sales to operations and team building.',
    status: 'Coming soon',
    isAvailable: false,
    bullets: [
      'Standardized Operating Procedures (SOPs) for delegation',
      'Sales pipeline optimization & high-ticket proposal structures',
      'Cash flow allocation & profit-first financial management'
    ]
  },
  {
    id: 'ai-tech',
    num: '04',
    icon: '🤖',
    name: 'AI and Tech',
    badge: 'Pillar 04',
    headline: 'Earn Smarter in the New Economy',
    tagline: 'Leverage AI tools, tech platforms, and the latest in Web3 and digital infrastructure to earn smarter in the new economy.',
    status: 'Coming soon',
    isAvailable: false,
    bullets: [
      'AI prompt workflows to 10x content & client deliverable speed',
      'Web3 & decentralized digital infrastructure monetization',
      'Automated marketing & client onboarding tech stacks'
    ]
  },
  {
    id: 'jobs',
    num: '05',
    icon: '📋',
    name: 'Jobs',
    badge: 'Pillar 05',
    headline: 'Fresh Roles, Updated Daily',
    tagline: 'Tech and non-tech roles, remote and on-site, internships — aggregated daily from public job boards across Nigeria, Africa, and the world.',
    status: 'Live now · updated daily',
    isAvailable: true,
    bullets: [
      'Remote and on-site roles across tech, marketing, design, and more',
      'Filter by region: Nigeria, Africa, or worldwide',
      'Internships and graduate programmes alongside full-time roles'
    ],
    link: '/jobs'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'cold-email-playbook',
    title: 'The Cold Email Playbook',
    category: 'freelancing',
    tag: 'INSTANT DELIVERY',
    tagClass: 't-paid',
    price: '₦5,000',
    desc: '5 templates, a 4-email follow-up sequence, and a 30-day plan. Stop guessing. Start getting replies.',
    highlights: [
      '5 battle-tested cold email templates',
      '4-email follow-up sequence',
      'Day-by-day 30-day outreach action plan'
    ],
    cta: 'Get Cold Email Playbook — ₦5,000',
    ctaClass: 'btn-main',
    featured: false,
    link: 'https://selar.com/zu816584i7'
  },
  {
    id: 'how-to-raise-your-rates',
    title: 'How to Raise Your Rates',
    category: 'freelancing',
    tag: 'INSTANT DELIVERY',
    tagClass: 't-paid',
    price: '₦5,000',
    desc: 'Rate calculator, the exact client email, objection scripts, and a 90-day plan. Know your worth. Charge it.',
    highlights: [
      'Interactive Rate Calculator framework',
      'Exact email copy to send existing clients',
      'Objection handling scripts & 90-day rate increase plan'
    ],
    cta: 'Get Raise Your Rates — ₦5,000',
    ctaClass: 'btn-main',
    featured: false,
    link: 'https://selar.com/7295348t6r'
  },
  {
    id: 'upwork-in-30-days',
    title: 'Upwork in 30 Days',
    category: 'freelancing',
    tag: 'INSTANT DELIVERY',
    tagClass: 't-paid',
    price: '₦5,000',
    desc: 'Profile, proposals, first reviews from zero, JSS protection, and a day-by-day 30-day plan.',
    highlights: [
      'High-converting profile breakdown',
      'Winning proposal templates that get read',
      'Getting first reviews from zero & JSS protection'
    ],
    cta: 'Get Upwork in 30 Days — ₦5,000',
    ctaClass: 'btn-main',
    featured: false,
    link: 'https://selar.com/8p516654dr'
  },
  {
    id: 'twitter-x-for-clients',
    title: 'Twitter/X for Clients',
    category: 'freelancing',
    tag: 'INSTANT DELIVERY',
    tagClass: 't-paid',
    price: '₦5,000',
    desc: 'The content strategy, daily routine, search terms, and DM method that turns Twitter/X into a client pipeline.',
    highlights: [
      'Daily 20-minute client discovery routine',
      'High-intent search terms & keywords list',
      'Direct Message (DM) conversion framework'
    ],
    cta: 'Get Twitter/X for Clients — ₦5,000',
    ctaClass: 'btn-main',
    featured: false,
    link: 'https://selar.com/586e14m7b8'
  },
  {
    id: 'building-ai-agents-guide',
    title: "Building AI Agents: From Zero to Your First Working Agent",
    category: 'ai-tech',
    tag: 'NEW · INSTANT DELIVERY',
    tagClass: 't-free',
    price: '₦5,000',
    desc: "A beginner's guide to building autonomous AI agents step-by-step. Go from zero to deploying your first working AI agent system.",
    highlights: [
      'Zero-to-One AI agent development roadmap',
      'Core agentic frameworks & prompt logic',
      'Building real-world automated agent workflows'
    ],
    cta: 'Get AI Agents Guide — ₦5,000',
    ctaClass: 'btn-main',
    featured: false,
    link: 'https://selar.com/hz54g77v77'
  },
  {
    id: 'personal-books-collection',
    title: 'The Earn Blueprint Books Collection',
    category: 'entrepreneurship',
    tag: 'COLLECTION',
    tagClass: 't-paid',
    price: 'INSTANT ACCESS',
    desc: 'Ebooks, strategic guides, and foundational books on growth, career execution, and modern business.',
    highlights: [
      'Curated books & frameworks',
      'Actionable execution blueprints',
      'Direct access via Selar digital store'
    ],
    cta: 'Explore Books',
    ctaClass: 'btn-main',
    featured: false,
    link: 'https://selar.com/95f95a6737'
  }
];

export const BUNDLE_DATA: Product = {
  id: 'freelancer-complete-pack',
  title: 'The Complete Freelancer Pack (4-in-1)',
  category: 'bundles',
  tag: 'BUY 3 GET 1 FREE',
  tagClass: 't-bundle',
  price: '₦15,000',
  origPrice: '₦20,000',
  savings: 'Save ₦5,000',
  desc: 'Get All Four. Pay For Three. The complete freelancing system. Every template, script, and action plan. One purchase. Instant delivery to your inbox.',
  highlights: [
    'The Cold Email Playbook (₦5,000 value)',
    'How to Raise Your Rates (₦5,000 value)',
    'Upwork in 30 Days (₦5,000 value)',
    'Twitter/X for Clients (₦5,000 value)'
  ],
  cta: 'Get The Complete Pack — ₦15,000',
  ctaClass: 'btn-main',
  featured: true,
  isBundle: true,
  link: 'https://selar.com/771s547758'
};

export const SELAR_STORE_URL = 'https://selar.com/m/theearneblueprint';
export const TELEGRAM_URL = 'https://t.me/ftldofficial';
export const CONTACT_EMAIL = 'support@theearneblueprint.co';
export const LINKTREE_URL = 'https://linktr.ee/theearneblueprint';
export const CONCAVE_LABS_URL = 'https://theconcavelabs.org';
export const AI_AGENTS_BOOK_URL = 'https://selar.com/hz54g77v77';
export const PERSONAL_BOOKS_URL = 'https://selar.com/95f95a6737';

export const FOUNDER_DATA = {
  name: "The Earn Blueprint Team",
  title: "The Earn Blueprint | FTLD | The Concave Labs",
  stats: [
    { value: "7 Yrs", label: "Building Systems" },
    { value: "5K+", label: "People Trained" },
    { value: "3K+", label: "Innovate 2025" },
    { value: "2.3K+", label: "FTLD Members" }
  ],
  socials: [
    { platform: "💬", handle: "t.me/ftldofficial", link: TELEGRAM_URL },
    { platform: "⚙️", handle: "theconcavelabs.org", link: CONCAVE_LABS_URL },
    { platform: "𝕏", handle: "@the_ftldconcave", link: "https://twitter.com/the_ftldconcave" },
    { platform: "🌍", handle: "ftld.org", link: "https://ftld.org" }
  ],
  keyQuote: "The problem was never skill. Nobody taught the business.",
  bioParagraphs: [
    "We did not build this from theoretical courses. We built it from seven years of sending emails, building proposals, navigating platforms, raising rates, losing clients, winning better ones, and slowly building something real.",
    "The Earn Blueprint is not just a product store. It is the platform we wish had existed when starting out. Every guide, every insight, every tool on this platform is built from real experience — tested in real situations, with real results.",
    "We are just getting started. The library grows. The pillars expand. The community deepens. This is a long-term platform built for people who are serious about building income."
  ]
};

export const INSIGHTS_DATA: Insight[] = [
  {
    id: 'cold-email-mistakes',
    pillar: 'freelancing',
    pillarNum: 'Pillar 01',
    categoryTag: 'Freelancing · Cold Outreach',
    title: 'The 5 cold email mistakes that are killing your reply rate — and how to fix every one of them',
    excerpt: 'Most cold emails get ignored because they pitch before building relevance. Here is the fix.',
    readTime: '7 min read',
    author: 'The Earn Blueprint Team',
    date: '2025',
    content: [
      'Mistake 1: Writing a long bio about yourself instead of focusing on the client\'s immediate problem.',
      'Mistake 2: Vague subject lines that look like spam.',
      'Mistake 3: Asking for a 30-minute call upfront without offering low-friction value.',
      'Mistake 4: Not sending a structured 4-email follow-up sequence.',
      'Mistake 5: Failing to personalize the first line based on real research.'
    ]
  },
  {
    id: 'upwork-profile-invitations',
    pillar: 'freelancing',
    pillarNum: 'Pillar 01',
    categoryTag: 'Freelancing · Upwork',
    title: 'Why your Upwork profile gets views but zero invitations',
    excerpt: 'A high view count with zero invites means your headline and overview are failing to build instant trust.',
    readTime: '5 min read',
    author: 'The Earn Blueprint Team',
    date: '2025',
    content: [
      'Clients browse Upwork looking for problem solvers, not generic title lists.',
      'Structure your profile headline with an outcome proposition: "I help [Niche] achieve [Result] through [Skill]."',
      'Place your best client social proof in the first 3 lines before the "read more" fold.'
    ]
  },
  {
    id: 'ai-tools-freelancer-productivity',
    pillar: 'ai-tech',
    pillarNum: 'Pillar 04',
    categoryTag: 'AI and Tech',
    title: 'How to use AI tools to 10x your productivity as a freelancer or entrepreneur',
    excerpt: 'Leverage AI for rapid research, proposal drafting, and client deliverable velocity without sacrificing quality.',
    readTime: '6 min read',
    author: 'The Earn Blueprint Team',
    date: '2025',
    content: [
      'AI is an amplifier for clear thinkers. Use LLMs to generate research outlines and proposal drafts in minutes.',
      'Build custom prompt templates for client onboarding, technical specification documents, and outreach messages.'
    ]
  }
];

export const COMMUNITY_HIGHLIGHTS: CommunityHighlight[] = [
  {
    id: 'ftld-telegram',
    icon: '💬',
    title: 'FTLD Telegram Community',
    desc: '2,300+ freelancers, founders, and tech professionals sharing opportunities, feedback, and wins daily.',
    badge: '2,300+ Members',
    link: TELEGRAM_URL
  },
  {
    id: 'innovate-conference',
    icon: '🎤',
    title: 'Innovate Conference',
    desc: 'The largest annual tech and freelance conference in Uyo, Nigeria. 3,000+ attendees in 2025. Real rooms. Real connections.',
    badge: '3,000+ Attendees',
    link: 'https://ftld.org'
  },
  {
    id: 'concave-labs',
    icon: '⚙️',
    title: 'The Concave Labs',
    desc: 'AI, tech, and talent consulting — the consulting arm of FTLD. If you need strategic help or vetted talent from our pipeline, this is where it starts.',
    badge: 'Consulting Arm of FTLD',
    link: CONCAVE_LABS_URL
  }
];

export const CLOSING_CTA_DATA = {
  headline: "The room is open.",
  text: "You will spend ₦15,000 this week on something. The only question is whether it spends you or builds you.",
  ctaText: "Get The Complete Pack — ₦15,000",
  subtext: "Buy 3 Get 1 FREE · All 4 guides · Instant delivery to your inbox"
};

export const FAQS_DATA = [
  {
    id: 'faq-1',
    q: 'Who is The Earn Blueprint designed for?',
    a: 'The Earn Blueprint is built for freelancers, entrepreneurs, and business people who are serious about building income that lasts.'
  },
  {
    id: 'faq-2',
    q: 'How are the products delivered?',
    a: 'All PDF guides, templates, and action plans are delivered to your email inbox instantly after payment.'
  },
  {
    id: 'faq-3',
    q: 'What is included in the Complete Freelancer Pack (₦15,000)?',
    a: 'The Complete Pack includes all 4 guides: Cold Email Playbook, How to Raise Your Rates, Upwork in 30 Days, and Twitter/X for Clients (Buy 3 Get 1 FREE, saving ₦5,000).'
  },
  {
    id: 'faq-4',
    q: 'What is FTLD?',
    a: 'FTLD is one of Africa\'s largest tech and freelance talent communities with 2,300+ Telegram members and 3,000+ Innovate annual conference attendees.'
  }
];

