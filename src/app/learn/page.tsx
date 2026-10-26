import Link from 'next/link';
import pg from 'pg';
import { BLOG_CATEGORIES } from '../../lib/blogSources';
import { Navbar } from '../../components/earnblueprint/Navbar';

// Refreshed daily by the fetch-blogs cron, so there's no need to hit
// Postgres on every view.
export const revalidate = 3600;

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

type BlogRow = {
  id: string;
  title: string;
  excerpt: string | null;
  author: string | null;
  source_name: string;
  source_url: string;
  url: string;
  category: string;
  published_at: Date | null;
};

const PAGE_SIZE = 20;

// Same escaping JobScalper's own search uses, so a query with %, _, or \
// can't break the ILIKE pattern.
function likePattern(query: string): string {
  return `%${query.replace(/[\\%_]/g, (c) => '\\' + c)}%`;
}

async function fetchPosts(
  category: string,
  query: string,
  page: number,
): Promise<{ posts: BlogRow[]; total: number }> {
  const where: string[] = ['true'];
  const params: string[] = [];
  if (category !== 'all') {
    params.push(category);
    where.push(`category = $${params.length}`);
  }
  if (query) {
    params.push(likePattern(query));
    where.push(`(title ILIKE $${params.length} OR excerpt ILIKE $${params.length} OR author ILIKE $${params.length} OR source_name ILIKE $${params.length})`);
  }
  const whereSql = where.join(' AND ');
  const offset = (page - 1) * PAGE_SIZE;

  const [{ rows }, { rows: countRows }] = await Promise.all([
    pool.query<BlogRow>(
      `SELECT id, title, excerpt, author, source_name, source_url, url, category, published_at
         FROM blog_posts
        WHERE ${whereSql}
        ORDER BY published_at DESC NULLS LAST, fetched_at DESC
        LIMIT ${PAGE_SIZE} OFFSET $${params.length + 1}`,
      [...params, offset],
    ),
    pool.query<{ total: string }>(`SELECT count(*) AS total FROM blog_posts WHERE ${whereSql}`, params),
  ]);
  return { posts: rows, total: Number(countRows[0]?.total ?? 0) };
}

function buildHref(category: string, query: string, page: number): string {
  const params = new URLSearchParams();
  if (category !== 'all') params.set('category', category);
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/learn?${qs}` : '/learn';
}

export default async function LearnPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string; page?: string };
}) {
  const category =
    searchParams.category && BLOG_CATEGORIES.includes(searchParams.category as (typeof BLOG_CATEGORIES)[number])
      ? searchParams.category
      : 'all';
  const query = (searchParams.q ?? '').trim().slice(0, 80);
  const page = Math.max(1, Number(searchParams.page) || 1);

  let posts: BlogRow[] = [];
  let total = 0;
  let error: string | null = null;
  try {
    ({ posts, total } = await fetchPosts(category, query, page));
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load articles right now.';
  }
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, total);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0d1f3c] text-white pt-32 pb-24 px-[5%]">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Learn
          </span>
          <h1 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Curated Reading on <span className="text-[#14b8a6]">Earning Online</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-[640px] leading-relaxed">
            Hand-picked daily from across the web — making money online, personal growth, career
            development, digital market trends, and remote work. Every piece links back to the
            original writer; we never republish full articles.
          </p>
        </div>

        {/* Search */}
        <form action="/learn" method="GET" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[560px] mx-auto mb-6">
          {category !== 'all' && <input type="hidden" name="category" value={category} />}
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search articles by title, author, or source…"
            className="w-full sm:flex-1 rounded-lg bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#14b8a6]/60"
          />
          <button
            type="submit"
            className="w-full sm:w-auto font-space text-xs font-bold px-5 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
          >
            Search
          </button>
          {query && (
            <Link
              href={buildHref(category, '', 1)}
              className="w-full sm:w-auto text-center font-space text-xs font-bold px-4 py-3 rounded-lg border border-white/15 text-gray-300 hover:border-white/40 hover:text-white tracking-wider uppercase whitespace-nowrap"
            >
              Clear
            </Link>
          )}
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <Link
            href={buildHref('all', query, 1)}
            className={`font-space text-xs font-bold px-4 py-2 rounded-full border tracking-wider uppercase transition-all ${
              category === 'all'
                ? 'bg-[#14b8a6] text-white border-[#14b8a6]'
                : 'border-white/15 text-gray-300 hover:border-[#14b8a6]/60 hover:text-white'
            }`}
          >
            All
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={buildHref(c, query, 1)}
              className={`font-space text-xs font-bold px-4 py-2 rounded-full border tracking-wider uppercase transition-all ${
                category === c
                  ? 'bg-[#14b8a6] text-white border-[#14b8a6]'
                  : 'border-white/15 text-gray-300 hover:border-[#14b8a6]/60 hover:text-white'
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        {!error && total > 0 && (
          <p className="text-center text-xs text-gray-500 mb-6">
            Showing {rangeStart}–{rangeEnd} of {total} article{total === 1 ? '' : 's'}
            {query && <> matching &ldquo;{query}&rdquo;</>}
          </p>
        )}

        {error && (
          <p className="text-center text-gray-400 py-12">
            Couldn&apos;t load articles right now. Please check back shortly.
          </p>
        )}

        {!error && posts.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            Nothing here yet. New articles land daily.
          </p>
        )}

        {!error && posts.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {posts.map((post) => (
              <li
                key={post.id}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-[#14b8a6]/40 hover:bg-white/[0.06] transition-all"
              >
                <div>
                  <span className="text-[#14b8a6] text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-space text-lg font-bold text-white mt-2 mb-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-3">
                    {post.author ? `By ${post.author} · ` : ''}
                    {post.source_name}
                  </p>
                  <Link
                    href={`/learn/${encodeURIComponent(post.id)}`}
                    className="font-space text-xs font-bold px-4 py-2 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] inline-block"
                  >
                    Read More →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!error && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            {page > 1 ? (
              <Link
                href={buildHref(category, query, page - 1)}
                className="font-space text-xs font-bold px-4 py-2 rounded-lg border border-white/15 text-gray-300 hover:border-[#14b8a6]/60 hover:text-white tracking-wider uppercase"
              >
                ‹ Prev
              </Link>
            ) : (
              <span className="font-space text-xs font-bold px-4 py-2 rounded-lg border border-white/5 text-gray-600 tracking-wider uppercase">
                ‹ Prev
              </span>
            )}
            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={buildHref(category, query, page + 1)}
                className="font-space text-xs font-bold px-4 py-2 rounded-lg border border-white/15 text-gray-300 hover:border-[#14b8a6]/60 hover:text-white tracking-wider uppercase"
              >
                Next ›
              </Link>
            ) : (
              <span className="font-space text-xs font-bold px-4 py-2 rounded-lg border border-white/5 text-gray-600 tracking-wider uppercase">
                Next ›
              </span>
            )}
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-12">
          Curated from public RSS feeds. All credit and full content belongs to the original
          publications and authors linked above.
        </p>
      </div>
      </div>
    </>
  );
}
