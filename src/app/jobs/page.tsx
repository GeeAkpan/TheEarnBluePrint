import Link from 'next/link';
import pg from 'pg';
import { Navbar } from '../../components/earnblueprint/Navbar';

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
  description: string | null;
};

const FILTERS: Record<string, { label: string; where: string }> = {
  all: { label: 'All Jobs', where: 'true' },
  remote: { label: 'Remote', where: 'remote' },
  ng: { label: 'Nigeria', where: "region = 'Nigeria'" },
  af: { label: 'Africa', where: "region IN ('Nigeria', 'Africa')" },
  intern: { label: 'Internships', where: "job_type LIKE 'Internship%'" },
};

const PAGE_SIZE = 20;

// Role-based quick filters. There's no dedicated fine-grained role field, so
// these match keywords against the existing title column — same mechanism
// as the free-text search, just pre-packaged as one-click options.
const ROLE_CATEGORIES: Record<string, string[]> = {
  'Community Manager': ['community manager', 'community lead'],
  'Product Manager': ['product manager', 'product owner'],
  'Digital Marketer': ['digital marketing', 'digital marketer', 'growth marketing'],
  'Web Developer': ['web developer', 'frontend developer', 'front-end developer', 'backend developer', 'back-end developer', 'full stack developer', 'full-stack developer'],
  'Software Engineer': ['software engineer', 'software developer'],
  'Content Writer': ['content writer', 'copywriter', 'content creator'],
  'Graphic Designer': ['graphic designer'],
  'UI/UX Designer': ['ux designer', 'ui designer', 'product designer', 'ui/ux'],
  'Virtual Assistant': ['virtual assistant'],
  'Customer Support': ['customer support', 'customer service', 'support specialist'],
  'Data Analyst': ['data analyst', 'data analytics'],
  'Social Media Manager': ['social media manager', 'social media specialist'],
  'Sales Representative': ['sales representative', 'sales executive', 'account executive'],
  'Project Manager': ['project manager'],
  'Accountant': ['accountant', 'bookkeeper'],
};

// Same escaping JobScalper's own bot.mjs searchFilter() uses, so a query
// with %, _, or \ in it can't break the ILIKE pattern.
function likePattern(query: string): string {
  return `%${query.replace(/[\\%_]/g, (c) => '\\' + c)}%`;
}

async function fetchJobs(
  filterKey: string,
  query: string,
  role: string,
  page: number,
): Promise<{ jobs: JobRow[]; total: number }> {
  const filter = FILTERS[filterKey] ?? FILTERS.all;
  const where = [`first_seen > now() - interval '7 days'`, filter.where];
  const params: string[] = [];
  if (query) {
    params.push(likePattern(query));
    where.push(`(title ILIKE $${params.length} OR company ILIKE $${params.length} OR category ILIKE $${params.length})`);
  }
  const roleKeywords = ROLE_CATEGORIES[role];
  if (roleKeywords) {
    const clauses = roleKeywords.map((kw) => {
      params.push(likePattern(kw));
      return `title ILIKE $${params.length}`;
    });
    where.push(`(${clauses.join(' OR ')})`);
  }
  const whereSql = where.join(' AND ');
  const offset = (page - 1) * PAGE_SIZE;

  const [{ rows }, { rows: countRows }] = await Promise.all([
    pool.query<JobRow>(
      `SELECT title, company, url, category, region, job_type, remote, first_seen, description
         FROM jobs
        WHERE ${whereSql}
        ORDER BY first_seen DESC
        LIMIT ${PAGE_SIZE} OFFSET $${params.length + 1}`,
      [...params, offset],
    ),
    pool.query<{ total: string }>(`SELECT count(*) AS total FROM jobs WHERE ${whereSql}`, params),
  ]);
  return { jobs: rows, total: Number(countRows[0]?.total ?? 0) };
}

type Stats = { freshWeek: number; companiesWeek: number; categoriesTotal: number; allTime: number };

async function fetchStats(): Promise<Stats> {
  const { rows } = await pool.query<{
    fresh_week: string;
    companies_week: string;
    categories_total: string;
    all_time: string;
  }>(`
    SELECT
      count(*) FILTER (WHERE first_seen > now() - interval '7 days') AS fresh_week,
      count(DISTINCT company) FILTER (WHERE first_seen > now() - interval '7 days' AND company IS NOT NULL) AS companies_week,
      count(DISTINCT category) AS categories_total,
      count(*) AS all_time
    FROM jobs
  `);
  const r = rows[0];
  return {
    freshWeek: Number(r?.fresh_week ?? 0),
    companiesWeek: Number(r?.companies_week ?? 0),
    categoriesTotal: Number(r?.categories_total ?? 0),
    allTime: Number(r?.all_time ?? 0),
  };
}

const REGION_FLAG: Record<string, string> = { Nigeria: '🇳🇬', Africa: '🌍', Global: '🌐' };

function buildHref(filterKey: string, query: string, role: string, page: number): string {
  const params = new URLSearchParams();
  if (filterKey !== 'all') params.set('filter', filterKey);
  if (query) params.set('q', query);
  if (role) params.set('role', role);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/jobs?${qs}` : '/jobs';
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { filter?: string; q?: string; role?: string; page?: string };
}) {
  const filterKey = searchParams.filter && FILTERS[searchParams.filter] ? searchParams.filter : 'all';
  const query = (searchParams.q ?? '').trim().slice(0, 80);
  const role = searchParams.role && ROLE_CATEGORIES[searchParams.role] ? searchParams.role : '';
  const page = Math.max(1, Number(searchParams.page) || 1);

  let jobs: JobRow[] = [];
  let total = 0;
  let stats: Stats | null = null;
  let error: string | null = null;
  try {
    [{ jobs, total }, stats] = await Promise.all([fetchJobs(filterKey, query, role, page), fetchStats()]);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load jobs right now.';
  }
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
            Pillar 05 · Jobs
          </span>
          <h1 className="font-space font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Fresh Roles, <span className="text-[#14b8a6]">Updated Daily</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-[640px] leading-relaxed">
            Tech and non-tech roles, remote and on-site, internships — aggregated daily from public
            job boards across Nigeria, Africa, and the world.
          </p>

          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-4 mb-2">
              {[
                { value: stats.freshWeek, label: 'Fresh Jobs This Week' },
                { value: stats.companiesWeek, label: 'Companies Hiring' },
                { value: stats.categoriesTotal, label: 'Job Categories' },
                { value: stats.allTime, label: 'Jobs Tracked All-Time' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="font-space text-2xl sm:text-3xl font-bold text-[#14b8a6]">
                    {s.value.toLocaleString()}+
                  </span>
                  <span className="text-xs text-gray-400 mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <a
              href="https://t.me/jobscalperbot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-space text-xs font-bold px-5 py-2.5 rounded-lg border border-[#14b8a6]/60 text-[#14b8a6] tracking-wider uppercase transition-all hover:bg-[#14b8a6] hover:text-white"
            >
              🔔 Get daily job alerts on Telegram
            </a>
            <Link
              href="/jobs/post"
              className="inline-flex items-center gap-2 font-space text-xs font-bold px-5 py-2.5 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
            >
              📝 Post a Job
            </Link>
          </div>
        </div>

        {/* Search */}
        <form action="/jobs" method="GET" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[560px] mx-auto mb-6">
          {filterKey !== 'all' && <input type="hidden" name="filter" value={filterKey} />}
          {role && <input type="hidden" name="role" value={role} />}
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search by role, skill, or company…"
            className="w-full sm:flex-1 rounded-lg bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#14b8a6]/60"
          />
          <button
            type="submit"
            className="w-full sm:w-auto font-space text-xs font-bold px-5 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)]"
          >
            Search
          </button>
          {query && (
            <Link
              href={buildHref(filterKey, '', role, 1)}
              className="w-full sm:w-auto text-center font-space text-xs font-bold px-4 py-3 rounded-lg border border-white/15 text-gray-300 hover:border-white/40 hover:text-white tracking-wider uppercase whitespace-nowrap"
            >
              Clear
            </Link>
          )}
        </form>

        {/* Role category dropdown */}
        <form action="/jobs" method="GET" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-[560px] mx-auto mb-6">
          {filterKey !== 'all' && <input type="hidden" name="filter" value={filterKey} />}
          {query && <input type="hidden" name="q" value={query} />}
          <select
            name="role"
            defaultValue={role}
            className="w-full sm:flex-1 rounded-lg bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#14b8a6]/60"
          >
            <option value="">All Categories</option>
            {Object.keys(ROLE_CATEGORIES).map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto font-space text-xs font-bold px-5 py-3 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] whitespace-nowrap"
          >
            Apply
          </button>
          {role && (
            <Link
              href={buildHref(filterKey, query, '', 1)}
              className="w-full sm:w-auto text-center font-space text-xs font-bold px-4 py-3 rounded-lg border border-white/15 text-gray-300 hover:border-white/40 hover:text-white tracking-wider uppercase whitespace-nowrap"
            >
              Clear
            </Link>
          )}
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {Object.entries(FILTERS).map(([key, { label }]) => (
            <Link
              key={key}
              href={buildHref(key, query, role, 1)}
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

        {!error && total > 0 && (
          <p className="text-center text-xs text-gray-500 mb-6">
            Showing {rangeStart}–{rangeEnd} of {total} job{total === 1 ? '' : 's'}
            {query && <> matching &ldquo;{query}&rdquo;</>}
          </p>
        )}

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
                    {job.description && (
                      <p className="text-sm text-gray-400 mt-3 leading-relaxed line-clamp-3">
                        {job.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 self-start">
                    <Link
                      href={`/jobs/pitch?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company ?? '')}&category=${encodeURIComponent(job.category)}`}
                      className="font-space text-xs font-bold px-4 py-2 rounded-lg border border-[#14b8a6]/50 text-[#14b8a6] tracking-wider uppercase transition-all hover:bg-[#14b8a6]/10 whitespace-nowrap text-center"
                    >
                      ✍️ Generate Pitch
                    </Link>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-space text-xs font-bold px-4 py-2 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] whitespace-nowrap text-center"
                    >
                      View &amp; Apply
                    </a>
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
                href={buildHref(filterKey, query, role, page - 1)}
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
                href={buildHref(filterKey, query, role, page + 1)}
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

        <p className="text-center text-xs text-gray-500 mt-12">
          Never pay to apply for a job. Sources: RemoteOK, Remotive, We Work Remotely, Jobicy,
          Himalayas, Working Nomads, Arbeitnow, MyJobMag, HotNigerianJobs, Web3.Career.
        </p>
      </div>
      </div>
    </>
  );
}
