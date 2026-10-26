import Link from 'next/link';
import pg from 'pg';
import type { Metadata } from 'next';
import { Navbar } from '../../../components/earnblueprint/Navbar';

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

async function fetchPost(id: string): Promise<BlogRow | null> {
  const { rows } = await pool.query<BlogRow>(
    `SELECT id, title, excerpt, author, source_name, source_url, url, category, published_at
       FROM blog_posts WHERE id = $1`,
    [id],
  );
  return rows[0] ?? null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await fetchPost(decodeURIComponent(params.id)).catch(() => null);
  if (!post) return { title: 'Article Not Found | The Earn Blueprint' };
  const description = post.excerpt ?? `By ${post.author ?? post.source_name} on The Earn Blueprint.`;
  return {
    title: `${post.title} | The Earn Blueprint`,
    description,
    openGraph: { title: post.title, description, type: 'article' },
    twitter: { card: 'summary', title: post.title, description },
  };
}

export default async function LearnArticlePage({ params }: { params: { id: string } }) {
  const post = await fetchPost(decodeURIComponent(params.id)).catch(() => null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0d1f3c] text-white pt-32 pb-24 px-[5%]">
        <div className="max-w-[720px] mx-auto">
          <Link
            href="/learn"
            className="text-sm text-gray-400 hover:text-[#14b8a6] transition-colors inline-flex items-center gap-1 mb-6"
          >
            ← Back to Learn
          </Link>

          {!post ? (
            <p className="text-center text-gray-400 py-12">
              Couldn&apos;t find that article — it may have been removed from the source feed.
            </p>
          ) : (
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8">
              <span className="text-[#14b8a6] text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <h1 className="font-space text-2xl sm:text-3xl font-bold text-white mt-3 mb-4">
                {post.title}
              </h1>
              <p className="text-sm text-gray-400 mb-6">
                {post.author ? `By ${post.author} · ` : ''}
                {post.source_name}
                {post.published_at && ` · ${new Date(post.published_at).toLocaleDateString()}`}
              </p>
              {post.excerpt && (
                <p className="text-gray-300 text-base leading-relaxed mb-8">{post.excerpt}</p>
              )}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-space text-xs font-bold px-5 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
              >
                Read Full Article on {post.source_name} →
              </a>
              <p className="text-xs text-gray-500 mt-6">
                Full credit and content belongs to {post.author ? `${post.author} and ` : ''}
                {post.source_name}. This page links to their original work — we never republish it.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
