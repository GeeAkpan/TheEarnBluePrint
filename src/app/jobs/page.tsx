import Link from 'next/link';
import pg from 'pg';

// Refresh at most hourly — the underlying data only changes once a day
// (JobScalper's cron run), so there's no need to hit Postgres on every view.
export const revalidate = 3600;

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

type JobRow = {
  title: string;
  company: string | null;
  url: string;
  category: string;
  region: string;
  job_type: string;
  remote: boolean;
  first_seen: Date;
};

const FILTERS: Record<string, { label: string; where: string }> = {
  all: { label: 'All Jobs', where: 'true' },
  remote: { label: 'Remote', where: 'remote' },
  ng: { label: 'Nigeria', where: "region = 'Nigeria'" },
  af: { label: 'Africa', where: "region IN ('Nigeria', 'Africa')" },
  intern: { label: 'Internships', where: "job_type LIKE 'Internship%'" },
};

async function fetchJobs(filterKey: string): Promise<JobRow[]> {
  const filter = FILTERS[filterKey] ?? FILTERS.all;
  const { rows } = await pool.query<JobRow>(
    `SELECT title, company, url, category, region, job_type, remote, first_seen
       FROM jobs
      WHERE first_seen > now() - interval '7 days' AND ${filter.where}
      ORDER BY first_seen DESC
      LIMIT 60`,
  );
  return rows;
}

const REGION_FLAG: Record<string, string> = { Nigeria: '🇳🇬', Africa: '🌍', Global: '🌐' };

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const filterKey = searchParams.filter && FILTERS[searchParams.filter] ? searchParams.filter : 'all';
  let jobs: JobRow[] = [];
  let error: string | null = null;
  try {
    jobs = await fetchJobs(filterKey);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load jobs right now.';
  }

  return (
    <div className="min-h-screen bg-[#0d1f3c] text-white pt-32 pb-24 px-[5%]">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="font-space text-xs font-bold text-[#14b8a6] tracking-widest uppercase">
            Pillar 05 · Jobs
          </span>
          <h1 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Fresh Roles, <span className="text-[#14b8a6]">Updated Daily</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-[640px] leading-relaxed">
            Tech and non-tech roles, remote and on-site, internships — aggregated daily from public
            job boards across Nigeria, Africa, and the world.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {Object.entries(FILTERS).map(([key, { label }]) => (
            <Link
              key={key}
              href={key === 'all' ? '/jobs' : `/jobs?filter=${key}`}
              className={`font-space text-xs font-bold px-4 py-2 rounded-full border tracking-wider uppercase transition-all ${
                filterKey === key
                  ? 'bg-[#14b8a6] text-white border-[#14b8a6]'
                  : 'border-white/15 text-gray-300 hover:border-[#14b8a6]/60 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {error && (
          <p className="text-center text-gray-400 py-12">
            Couldn&apos;t load jobs right now. Please check back shortly.
          </p>
        )}

        {!error && jobs.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            Nothing here right now. New jobs land every morning.
          </p>
        )}

        {!error && jobs.length > 0 && (
          <ul className="flex flex-col gap-4">
            {jobs.map((job) => (
              <li
                key={job.url}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-[#14b8a6]/40 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="font-space text-lg font-bold text-white">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-400">
                      {job.company && <span>🏢 {job.company}</span>}
                      <span>
                        {REGION_FLAG[job.region] ?? '📍'} {job.remote ? 'Remote' : job.region}
                      </span>
                      <span>{job.job_type}</span>
                      <span className="text-[#14b8a6]">{job.category}</span>
                    </div>
                  </div>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-space text-xs font-bold px-4 py-2 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] whitespace-nowrap self-start"
                  >
                    View &amp; Apply
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-center text-xs text-gray-500 mt-12">
          Never pay to apply for a job. Sources: RemoteOK, Remotive, We Work Remotely, Jobicy,
          Himalayas, Working Nomads, Arbeitnow, MyJobMag, HotNigerianJobs, Web3.Career.
        </p>
      </div>
    </div>
  );
}
