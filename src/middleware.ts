import { NextRequest, NextResponse } from 'next/server';

// Edge runtime has no Node `crypto.timingSafeEqual`. Comparing raw strings
// byte-by-byte still leaks the secret's length through an early return on a
// length mismatch, so hash both sides to a fixed-length digest first (Edge
// runtime's Web Crypto is available globally) and compare those instead.
async function timingSafeEqualStr(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [digestA, digestB] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b)),
  ]);
  const viewA = new Uint8Array(digestA);
  const viewB = new Uint8Array(digestB);
  let result = 0;
  for (let i = 0; i < viewA.length; i++) {
    result |= viewA[i] ^ viewB[i];
  }
  return result === 0;
}

export async function middleware(req: NextRequest) {
  const secret = process.env.ADMIN_REVIEW_SECRET;
  if (!secret) {
    return new NextResponse('Admin review is not configured.', { status: 503 });
  }

  const header = req.headers.get('authorization');
  if (header?.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    const separatorIndex = decoded.indexOf(':');
    const suppliedPassword = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : decoded;
    if (await timingSafeEqualStr(suppliedPassword, secret)) {
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
