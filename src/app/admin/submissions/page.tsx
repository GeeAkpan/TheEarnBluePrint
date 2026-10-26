import pg from 'pg';
import SubmissionActions from './SubmissionActions';

export const dynamic = 'force-dynamic';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

type Submission = {
  id: number;
  title: string;
  company: string;
  url: string;
  category: string;
  region: string;
  job_type: string;
  remote: boolean;
  contact_email: string;
  submitted_at: Date;
};

async function fetchPending(): Promise<Submission[]> {
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
  const { rows } = await pool.query<Submission>(
    `SELECT id, title, company, url, category, region, job_type, remote, contact_email, submitted_at
       FROM job_submissions WHERE status = 'pending' ORDER BY submitted_at ASC`,
  );
  return rows;
}

export default async function AdminSubmissionsPage() {
  let submissions: Submission[] = [];
  let error: string | null = null;
  try {
    submissions = await fetchPending();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load submissions.';
  }

  return (
    <div className="min-h-screen bg-[#0d1f3c] text-white pt-16 pb-24 px-[5%]">
      <div className="max-w-[900px] mx-auto">
        <h1 className="font-space font-bold text-3xl text-white mb-8">
          Pending Job Submissions {submissions.length > 0 && `(${submissions.length})`}
        </h1>

        {error && <p className="text-red-400">{error}</p>}

        {!error && submissions.length === 0 && (
          <p className="text-gray-400">No pending submissions.</p>
        )}

        {!error && submissions.length > 0 && (
          <ul className="flex flex-col gap-4">
            {submissions.map((s) => (
              <li
                key={s.id}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
              >
                <div>
                  <h2 className="font-space text-lg font-bold text-white">{s.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-400">
                    <span>🏢 {s.company}</span>
                    <span>{s.remote ? 'Remote' : s.region}</span>
                    <span>{s.job_type}</span>
                    <span className="text-[#14b8a6]">{s.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {s.contact_email} ·{' '}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {s.url}
                    </a>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Submitted {new Date(s.submitted_at).toLocaleString()}
                  </p>
                </div>
                <SubmissionActions id={s.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
