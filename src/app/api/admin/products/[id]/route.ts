import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'Invalid product id.' }, { status: 400 });
  }

  let body: { action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (body.action !== 'approve' && body.action !== 'reject') {
    return NextResponse.json({ error: 'action must be "approve" or "reject".' }, { status: 400 });
  }

  const status = body.action === 'approve' ? 'approved' : 'rejected';
  const { rowCount } = await pool.query(
    `UPDATE products SET status = $1, reviewed_at = now() WHERE id = $2 AND status = 'pending'`,
    [status, id],
  );
  if (!rowCount) {
    return NextResponse.json({ error: 'Product not found or already reviewed.' }, { status: 404 });
  }

  return NextResponse.json({ status });
}
