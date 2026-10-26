import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Same fingerprint convention as JobScalper's run.mjs, so an approved
// user-submitted job dedupes identically to a scraped one.
function fingerprint(title: string, company: string): string {
  return `${title}|${company}`.toLowerCase().replace(/[^a-z0-9|]+/g, '');
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'Invalid submission id.' }, { status: 400 });
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

  const { rows } = await pool.query(
    `SELECT * FROM job_submissions WHERE id = $1 AND status = 'pending'`,
    [id],
  );
  const submission = rows[0];
  if (!submission) {
    return NextResponse.json({ error: 'Submission not found or already reviewed.' }, { status: 404 });
  }

  if (body.action === 'reject') {
    await pool.query(
      `UPDATE job_submissions SET status = 'rejected', reviewed_at = now() WHERE id = $1`,
      [id],
    );
    return NextResponse.json({ status: 'rejected' });
  }

  // Approve: mark reviewed AND publish into the real jobs table, mirroring
  // the exact schema/convention JobScalper's own run.mjs INSERT uses.
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `UPDATE job_submissions SET status = 'approved', reviewed_at = now() WHERE id = $1`,
      [id],
    );
    // jobs.description doesn't exist on older rows (JobScalper's own scraper
    // never wrote one) — nullable add is backward-compatible.
    await client.query(`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS description text`);
    await client.query(
      `INSERT INTO jobs (id, fingerprint, title, company, url, source, category, region, job_type, remote, posted_at, description)
       VALUES ($1, $2, $3, $4, $5, 'submitted', $6, $7, $8, $9, now(), $10)
       ON CONFLICT (id) DO NOTHING`,
      [
        `submitted:${submission.id}`,
        fingerprint(submission.title, submission.company),
        submission.title,
        submission.company,
        submission.url,
        submission.category,
        submission.region,
        submission.job_type,
        submission.remote,
        submission.description ?? null,
      ],
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('approve submission failed:', err);
    return NextResponse.json({ error: 'Failed to approve submission.' }, { status: 500 });
  } finally {
    client.release();
  }

  return NextResponse.json({ status: 'approved' });
}
