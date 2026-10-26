// Curated, hand-validated RSS sources for the Learn section. Every feed here
// was curled and confirmed to return live, recently-dated RSS XML before
// being added — see the commit this file first landed in for the validation
// notes. This is a curation/aggregation model: we store title + excerpt +
// author + link back to the original, never the full article body. LinkedIn
// and other platforms that prohibit feed/content redistribution are excluded
// on the same principle JobScalper's own src/sources.mjs follows.

export type BlogCategory =
  | 'Making Money Online'
  | 'Personal Development & Growth'
  | 'Career Development'
  | 'Digital Market Trends'
  | 'Remote Work';

export interface BlogSource {
  name: string;
  feedUrl: string;
  homepageUrl: string;
  category: BlogCategory;
}

export const BLOG_SOURCES: BlogSource[] = [
  {
    name: 'Smart Passive Income',
    feedUrl: 'https://www.smartpassiveincome.com/feed/',
    homepageUrl: 'https://www.smartpassiveincome.com',
    category: 'Making Money Online',
  },
  {
    name: 'Side Hustle Nation',
    feedUrl: 'https://www.sidehustlenation.com/feed/',
    homepageUrl: 'https://www.sidehustlenation.com',
    category: 'Making Money Online',
  },
  {
    name: 'Lifehacker',
    feedUrl: 'https://lifehacker.com/feed/rss',
    homepageUrl: 'https://lifehacker.com',
    category: 'Personal Development & Growth',
  },
  {
    name: 'HubSpot Marketing Blog',
    feedUrl: 'https://blog.hubspot.com/marketing/rss.xml',
    homepageUrl: 'https://blog.hubspot.com/marketing',
    category: 'Digital Market Trends',
  },
  {
    name: 'Neil Patel',
    feedUrl: 'https://neilpatel.com/feed/',
    homepageUrl: 'https://neilpatel.com/blog',
    category: 'Digital Market Trends',
  },
  {
    name: 'Inc.com',
    feedUrl: 'https://www.inc.com/rss/',
    homepageUrl: 'https://www.inc.com',
    category: 'Career Development',
  },
  {
    name: 'Fast Company',
    feedUrl: 'https://www.fastcompany.com/rss.xml',
    homepageUrl: 'https://www.fastcompany.com',
    category: 'Career Development',
  },
  {
    name: 'DEV Community',
    feedUrl: 'https://dev.to/feed',
    homepageUrl: 'https://dev.to',
    category: 'Career Development',
  },
  {
    name: 'The Zapier Blog',
    feedUrl: 'https://zapier.com/blog/feeds/latest/',
    homepageUrl: 'https://zapier.com/blog',
    category: 'Remote Work',
  },
  {
    name: 'Buffer Resources',
    feedUrl: 'https://buffer.com/resources/feed/',
    homepageUrl: 'https://buffer.com/resources',
    category: 'Remote Work',
  },
  {
    name: 'VirtualVocations Blog',
    feedUrl: 'https://www.virtualvocations.com/blog/feed/',
    homepageUrl: 'https://www.virtualvocations.com/blog',
    category: 'Remote Work',
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Making Money Online',
  'Personal Development & Growth',
  'Career Development',
  'Digital Market Trends',
  'Remote Work',
];
