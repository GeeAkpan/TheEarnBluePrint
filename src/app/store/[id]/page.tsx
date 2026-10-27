import Link from 'next/link';
import pg from 'pg';
import type { Metadata } from 'next';
import { Navbar } from '../../../components/earnblueprint/Navbar';
import { ShareProductButton } from '../../../components/earnblueprint/ShareProductButton';
import { whatsappOrderLink, type ProductRow } from '../../../lib/products';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function fetchProduct(id: string): Promise<ProductRow | null> {
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return null;
  const { rows } = await pool.query<ProductRow>(
    `SELECT id, name, description, price, currency, category, image_url, seller_name, seller_whatsapp
       FROM products WHERE id = $1 AND status = 'approved'`,
    [numericId],
  );
  return rows[0] ?? null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.id).catch(() => null);
  if (!product) return { title: 'Product Not Found | The Earn Blueprint' };
  const description =
    product.description ??
    `${product.currency} ${Number(product.price).toLocaleString()} · Sold by ${product.seller_name} on The Earn Blueprint Store.`;
  return {
    title: `${product.name} | The Earn Blueprint Store`,
    description,
    openGraph: {
      title: product.name,
      description,
      type: 'website',
      images: product.image_url ? [product.image_url] : undefined,
    },
    twitter: {
      card: product.image_url ? 'summary_large_image' : 'summary',
      title: product.name,
      description,
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id).catch(() => null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0d1f3c] text-white pt-32 pb-24 px-[5%]">
        <div className="max-w-[720px] mx-auto">
          <Link
            href="/store"
            className="text-sm text-gray-400 hover:text-[#14b8a6] transition-colors inline-flex items-center gap-1 mb-6"
          >
            ← Back to Store
          </Link>

          {!product ? (
            <p className="text-center text-gray-400 py-12">
              Couldn&apos;t find that product — it may have been removed or is still pending review.
            </p>
          ) : (
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              {product.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image_url} alt={product.name} className="w-full h-64 sm:h-80 object-cover" />
              )}
              <div className="p-8">
                <span className="text-[#14b8a6] text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="font-space text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">
                  {product.name}
                </h1>
                <p className="text-xl font-semibold text-white mb-4">
                  {product.currency} {Number(product.price).toLocaleString()}
                </p>
                {product.description && (
                  <p className="text-gray-300 text-base leading-relaxed mb-6 whitespace-pre-wrap">
                    {product.description}
                  </p>
                )}
                <p className="text-sm text-gray-500 mb-8">Sold by {product.seller_name}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappOrderLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-space text-xs font-bold px-5 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] text-center"
                  >
                    Order via WhatsApp
                  </a>
                  <ShareProductButton productId={product.id} productName={product.name} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
