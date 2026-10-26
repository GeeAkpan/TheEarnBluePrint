import { NextRequest, NextResponse } from 'next/server';

// Edge runtime has no Node `crypto.timingSafeEqual` — this is the portable
// constant-time equivalent (XOR every byte instead of short-circuiting on
// the first mismatch).
function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function middleware(req: NextRequest) {
  const secret = process.env.ADMIN_REVIEW_SECRET;
  if (!secret) {
    return new NextResponse('Admin review is not configured.', { status: 503 });
  }

  const header = req.headers.get('authorization');
  if (header?.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    const separatorIndex = decoded.indexOf(':');
    const suppliedPassword = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : decoded;
    if (timingSafeEqualStr(suppliedPassword, secret)) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="EarnBlueprint Admin"' },
  });
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
