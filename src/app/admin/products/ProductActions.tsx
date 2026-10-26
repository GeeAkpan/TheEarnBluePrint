'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductActions({ id }: { id: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function act(action: 'approve' | 'reject') {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body.error || 'Action failed.');
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      alert('Action failed — check your connection and try again.');
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={() => act('approve')}
        className="font-space text-xs font-bold px-4 py-2 rounded-lg bg-[#14b8a6] text-white tracking-wider uppercase transition-all disabled:opacity-50"
      >
        Approve
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => act('reject')}
        className="font-space text-xs font-bold px-4 py-2 rounded-lg border border-red-400/50 text-red-400 tracking-wider uppercase transition-all disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
