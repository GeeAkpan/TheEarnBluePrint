import { NextRequest, NextResponse } from 'next/server';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const REGIONS = new Set(['Nigeria', 'Africa', 'Global']);
const JOB_TYPES = new Set(['Full-time', 'Part-time', 'Contract / Freelance', 'Internship / Graduate']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS job_submissions (
      id serial PRIMARY KEY,
      title text NOT NULL,
      company text NOT NULL,
      url text NOT NULL,
      category text NOT NULL,
      region text NOT NULL,
      job_type text NOT NULL,
      remote boolean NOT NULL DEFAULT false,
      contact_email text NOT NULL,
      status text NOT NULL DEFAULT 'pending',
      submitted_at timestamptz NOT NULL DEFAULT now(),
      reviewed_at timestamptz
    );
  `);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const title = String(body.title ?? '').trim();
  const company = String(body.company ?? '').trim();
  const url = String(body.url ?? '').trim();
  const category = String(body.category ?? '').trim();
  const region = String(body.region ?? '').trim();
  const jobType = String(body.job_type ?? '').trim();
  const remote = body.remote === true;
  const contactEmail = String(body.contact_email ?? '').trim();

  if (!title || !company || !url || !category || !region || !jobType || !contactEmail) {
    return NextResponse.json({ error: 'All required fields must be filled in.' }, { status: 400 });
  }
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Application URL must be a valid URL.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(contactEmail)) {
    return NextResponse.json({ error: 'Contact email is not valid.' }, { status: 400 });
  }
  if (!REGIONS.has(region)) {
    return NextResponse.json({ error: 'Invalid region.' }, { status: 400 });
  }
  if (!JOB_TYPES.has(jobType)) {
    return NextResponse.json({ error: 'Invalid job type.' }, { status: 400 });
  }

  try {
    await ensureSchema();
    await pool.query(
      `INSERT INTO job_submissions (title, company, url, category, region, job_type, remote, contact_email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [title, company, url, category, region, jobType, remote, contactEmail],
    );
  } catch (err) {
    console.error('job_submissions insert failed:', err);
    return NextResponse.json({ error: 'Could not save your submission right now. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok' });
}
