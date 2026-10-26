import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const CURRENCIES = new Set(['NGN', 'USD']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id serial PRIMARY KEY,
      name text NOT NULL,
      description text,
      price numeric NOT NULL,
      currency text NOT NULL DEFAULT 'NGN',
      category text NOT NULL,
      image_url text,
      seller_name text NOT NULL,
      seller_whatsapp text NOT NULL,
      contact_email text,
      status text NOT NULL DEFAULT 'pending',
      submitted_at timestamptz NOT NULL DEFAULT now(),
      reviewed_at timestamptz
    );
  `);
}

// Keeps only digits (and a leading country code), since wa.me links need a
// plain international number with no +, spaces, or dashes.
function normalizeWhatsapp(raw: string): string {
  return raw.replace(/[^\d]/g, '');
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const description = String(body.description ?? '').trim().slice(0, 2000) || null;
  const priceRaw = Number(body.price);
  const currency = String(body.currency ?? 'NGN').trim().toUpperCase();
  const category = String(body.category ?? '').trim();
  const imageUrl = String(body.image_url ?? '').trim() || null;
  const sellerName = String(body.seller_name ?? '').trim();
  const sellerWhatsapp = normalizeWhatsapp(String(body.seller_whatsapp ?? ''));
  const contactEmail = String(body.contact_email ?? '').trim() || null;

  if (!name || !category || !sellerName || !sellerWhatsapp) {
    return NextResponse.json({ error: 'All required fields must be filled in.' }, { status: 400 });
  }
  if (!Number.isFinite(priceRaw) || priceRaw <= 0) {
    return NextResponse.json({ error: 'Price must be a positive number.' }, { status: 400 });
  }
  if (!CURRENCIES.has(currency)) {
    return NextResponse.json({ error: 'Invalid currency.' }, { status: 400 });
  }
  if (sellerWhatsapp.length < 10) {
    return NextResponse.json({ error: 'WhatsApp number looks invalid — include the country code.' }, { status: 400 });
  }
  if (imageUrl) {
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json({ error: 'Image URL must be a valid URL.' }, { status: 400 });
    }
  }
  if (contactEmail && !EMAIL_RE.test(contactEmail)) {
    return NextResponse.json({ error: 'Contact email is not valid.' }, { status: 400 });
  }

  try {
    await ensureSchema();
    await pool.query(
      `INSERT INTO products (name, description, price, currency, category, image_url, seller_name, seller_whatsapp, contact_email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [name, description, priceRaw, currency, category, imageUrl, sellerName, sellerWhatsapp, contactEmail],
    );
  } catch (err) {
    console.error('products insert failed:', err);
    return NextResponse.json({ error: 'Could not save your listing right now. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok' });
}
