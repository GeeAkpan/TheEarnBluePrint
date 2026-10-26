// Daily fetch for the Learn section, triggered by Vercel Cron (see
// vercel.json). Pulls every source in src/lib/blogSources.ts, stores
// title/excerpt/author/link — never the full article body (curation, not
// republishing). Mirrors the Authorization-header pattern JobScalper's own
// api/cron.mjs already uses for its daily digest cron.

import pg from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { BLOG_SOURCES } from '../../../../lib/blogSources';
import { parseRssItems, stripHtml, truncate, toDate } from '../../../../lib/rss';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id text PRIMARY KEY,
      title text NOT NULL,
      excerpt text,
      author text,
      source_name text NOT NULL,
      source_url text NOT NULL,
      url text NOT NULL,
      category text NOT NULL,
      published_at timestamptz,
      fetched_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts (category);
    CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts (published_at DESC);
  `);
}

async function fetchSource(source: (typeof BLOG_SOURCES)[number]) {
  const res = await fetch(source.feedUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheEarnBlueprintBot/1.0)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`${res.status} ${source.feedUrl}`);
  const xml = await res.text();
  const items = parseRssItems(xml);

  let inserted = 0;
  for (const item of items.slice(0, 20)) {
    const id = item.guid || item.link;
    if (!id || !item.title || !item.link) continue;
    const excerpt = truncate(stripHtml(item.description), 300);
    const publishedAt = toDate(item.pubDate);

    const { rowCount } = await pool.query(
      `INSERT INTO blog_posts (id, title, excerpt, author, source_name, source_url, url, category, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (id) DO NOTHING`,
      [
        id,
        item.title,
        excerpt || null,
        item.author || null,
        source.name,
        source.homepageUrl,
        item.link,
        source.category,
        publishedAt,
      ],
    );
    inserted += rowCount ?? 0;
  }
  return inserted;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  await ensureSchema();

  const results: Record<string, number | string> = {};
  for (const source of BLOG_SOURCES) {
    try {
      results[source.name] = await fetchSource(source);
    } catch (err) {
      results[source.name] = `error: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  return NextResponse.json({ status: 'ok', results });
}
