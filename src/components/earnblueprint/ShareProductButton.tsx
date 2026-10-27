'use client';

import { useState } from 'react';

export function ShareProductButton({ productId, productName }: { productId: number; productName: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/store/${productId}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: productName, url });
        return;
      } catch {
        // User cancelled the share sheet, or share isn't permitted here — fall
        // through to clipboard copy instead.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — nothing to recover.
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="font-space text-xs font-bold px-4 py-2 rounded-lg border border-white/15 text-gray-300 tracking-wider uppercase transition-all hover:border-[#14b8a6]/60 hover:text-white"
    >
      {copied ? '✓ Link Copied' : 'Share'}
    </button>
  );
}
