import pg from 'pg';
import ProductActions from './ProductActions';

export const dynamic = 'force-dynamic';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

type PendingProduct = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  currency: string;
  category: string;
  image_url: string | null;
  seller_name: string;
  seller_whatsapp: string;
  contact_email: string | null;
  submitted_at: Date;
};

async function fetchPending(): Promise<PendingProduct[]> {
  const { rows } = await pool.query<PendingProduct>(
    `SELECT id, name, description, price, currency, category, image_url, seller_name, seller_whatsapp, contact_email, submitted_at
       FROM products WHERE status = 'pending' ORDER BY submitted_at ASC`,
  );
  return rows;
}

export default async function AdminProductsPage() {
  let products: PendingProduct[] = [];
  let error: string | null = null;
  try {
    products = await fetchPending();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load product submissions.';
  }

  return (
    <div className="min-h-screen bg-[#0d1f3c] text-white pt-16 pb-24 px-[5%]">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-space font-bold text-3xl text-white mb-8">
          Pending Product Listings {products.length > 0 && `(${products.length})`}
        </h1>

        {error && <p className="text-red-400">{error}</p>}

        {!error && products.length === 0 && (
          <p className="text-gray-400">No pending listings.</p>
        )}

        {!error && products.length > 0 && (
          <ul className="flex flex-col gap-4">
            {products.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
              >
                <div>
                  <h2 className="font-space text-lg font-bold text-white">{p.name}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-400">
                    <span>
                      {p.currency} {Number(p.price).toLocaleString()}
                    </span>
                    <span className="text-[#14b8a6]">{p.category}</span>
                  </div>
                  {p.description && (
                    <p className="text-sm text-gray-300 mt-3 whitespace-pre-wrap max-w-[500px]">
                      {p.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Seller: {p.seller_name} · WhatsApp: {p.seller_whatsapp}
                    {p.contact_email && ` · ${p.contact_email}`}
                  </p>
                  {p.image_url && (
                    <a href={p.image_url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-gray-500">
                      View image
                    </a>
                  )}
                  <p className="text-xs text-gray-600 mt-1">
                    Submitted {new Date(p.submitted_at).toLocaleString()}
                  </p>
                </div>
                <ProductActions id={p.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
