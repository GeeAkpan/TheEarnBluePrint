import Link from 'next/link';
import pg from 'pg';
import { Navbar } from '../../components/earnblueprint/Navbar';
import { ShareProductButton } from '../../components/earnblueprint/ShareProductButton';
import { whatsappOrderLink, type ProductRow } from '../../lib/products';

export const revalidate = 1800;

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const PAGE_SIZE = 20;

function likePattern(query: string): string {
  return `%${query.replace(/[\\%_]/g, (c) => '\\' + c)}%`;
}

async function fetchProducts(
  category: string,
  query: string,
  page: number,
): Promise<{ products: ProductRow[]; total: number; categories: string[] }> {
  const where: string[] = [`status = 'approved'`];
  const params: string[] = [];
  if (category !== 'all') {
    params.push(category);
    where.push(`category = $${params.length}`);
  }
  if (query) {
    params.push(likePattern(query));
    where.push(`(name ILIKE $${params.length} OR description ILIKE $${params.length} OR category ILIKE $${params.length})`);
  }
  const whereSql = where.join(' AND ');
  const offset = (page - 1) * PAGE_SIZE;

  const [{ rows }, { rows: countRows }, { rows: catRows }] = await Promise.all([
    pool.query<ProductRow>(
      `SELECT id, name, description, price, currency, category, image_url, seller_name, seller_whatsapp
         FROM products
        WHERE ${whereSql}
        ORDER BY submitted_at DESC
        LIMIT ${PAGE_SIZE} OFFSET $${params.length + 1}`,
      [...params, offset],
    ),
    pool.query<{ total: string }>(`SELECT count(*) AS total FROM products WHERE ${whereSql}`, params),
    pool.query<{ category: string }>(
      `SELECT DISTINCT category FROM products WHERE status = 'approved' ORDER BY category`,
    ),
  ]);
  return {
    products: rows,
    total: Number(countRows[0]?.total ?? 0),
    categories: catRows.map((r) => r.category),
  };
}

function buildHref(category: string, query: string, page: number): string {
  const params = new URLSearchParams();
  if (category !== 'all') params.set('category', category);
  if (query) params.set('q', query);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/store?${qs}` : '/store';
}

export default async function StorePage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string; page?: string };
}) {
  const query = (searchParams.q ?? '').trim().slice(0, 80);
  const page = Math.max(1, Number(searchParams.page) || 1);

  let products: ProductRow[] = [];
  let total = 0;
  let categories: string[] = [];
  let error: string | null = null;
  const requestedCategory = searchParams.category ?? 'all';
  try {
    ({ products, total, categories } = await fetchProducts(requestedCategory, query, page));
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load the store right now.';
  }
  const category = categories.includes(requestedCategory) ? requestedCategory : 'all';
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
              Pillar 02 · Entrepreneurship
            </span>
            <h1 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
              The Community Store
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-[640px] leading-relaxed">
              Products listed by people building income through this community. Order directly on
              WhatsApp with the seller — free to list, for now.
            </p>
            <Link
              href="/store/sell"
              className="mt-2 inline-flex items-center gap-2 font-space text-xs font-bold px-5 py-2.5 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
            >
              Sell Your Product
            </Link>
          </div>

          <form action="/store" method="GET" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[560px] mx-auto mb-6">
            {category !== 'all' && <input type="hidden" name="category" value={category} />}
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search products…"
              className="w-full sm:flex-1 rounded-lg bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#14b8a6]/60"
            />
            <button
              type="submit"
              className="w-full sm:w-auto font-space text-xs font-bold px-5 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
            >
              Search
            </button>
          </form>

          {categories.length > 0 && (
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
              {categories.map((c) => (
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
          )}

          {!error && total > 0 && (
            <p className="text-center text-xs text-gray-500 mb-6">
              Showing {rangeStart}–{rangeEnd} of {total} product{total === 1 ? '' : 's'}
            </p>
          )}

          {error && <p className="text-center text-gray-400 py-12">{error}</p>}

          {!error && products.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              No products listed yet.{' '}
              <Link href="/store/sell" className="text-[#14b8a6] hover:underline">
                Be the first to sell here
              </Link>
              .
            </p>
          )}

          {!error && products.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden flex flex-col hover:border-[#14b8a6]/40 hover:bg-white/[0.06] transition-all"
                >
                  <Link href={`/store/${product.id}`}>
                    {product.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image_url} alt={product.name} className="w-full h-44 object-cover" />
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[#14b8a6] text-xs font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                      <Link href={`/store/${product.id}`}>
                        <h3 className="font-space text-lg font-bold text-white mt-2 mb-1 hover:text-[#14b8a6] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-white font-semibold mb-2">
                        {product.currency} {Number(product.price).toLocaleString()}
                      </p>
                      {product.description && (
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={whatsappOrderLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 font-space text-xs font-bold px-4 py-2 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] text-center"
                      >
                        Order via WhatsApp
                      </a>
                      <ShareProductButton productId={product.id} productName={product.name} />
                    </div>
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
        </div>
      </div>
    </>
  );
}
