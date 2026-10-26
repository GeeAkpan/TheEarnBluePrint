export interface Pillar {
  id: string;
  num: string;
  icon: string;
  name: string;
  badge: string;
  headline?: string;
  tagline: string;
  status: string;
  isAvailable: boolean;
  bullets?: string[];
  link?: string;
}

export interface Product {
  id: string;
  title: string;
  category: 'freelancing' | 'entrepreneurship' | 'business-growth' | 'ai-tech' | 'bundles';
  tag: string;
  tagClass: 't-free' | 't-paid' | 't-bundle';
  price: string;
  origPrice?: string;
  savings?: string;
  desc: string;
  highlights: string[];
  cta: string;
  ctaClass: string;
  featured?: boolean;
  isBundle?: boolean;
  link?: string;
}

export interface Insight {
  id: string;
  pillar: string;
  pillarNum: string;
  categoryTag: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  date: string;
  content?: string[];
}

export interface CommunityHighlight {
  id: string;
  icon: string;
  title: string;
  desc: string;
  badge?: string;
  link?: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}
