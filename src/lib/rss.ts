// Minimal hand-rolled RSS parser, ported from JobScalper's src/util.mjs
// (parseRssItems/stripHtml/decodeEntities/truncate) — good enough for the
// flat, well-formed <item> feeds the Learn section reads; avoids pulling in
// a heavy XML/RSS library for something this small.

export function decodeEntities(str = ''): string {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

export function stripHtml(str = ''): string {
  return decodeEntities(
    String(str)
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/<[^>]+>/g, ' ') // entity-encoded tags decode into real ones
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncate(str = '', max = 300): string {
  if (str.length <= max) return str;
  const cut = str.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return (space > max * 0.6 ? cut.slice(0, space) : cut).trim() + '…';
}

export interface RssItem {
  title: string;
  link: string;
  guid: string;
  description: string;
  pubDate: string;
  author: string;
}

export function parseRssItems(xml: string): RssItem[] {
  const tag = (chunk: string, name: string): string => {
    const m = chunk.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
    if (!m) return '';
    return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
  };
  return xml
    .split(/<item[\s>]/)
    .slice(1)
    .map((raw) => {
      const chunk = raw.split('</item>')[0];
      return {
        title: decodeEntities(tag(chunk, 'title')),
        link: decodeEntities(tag(chunk, 'link')),
        guid: decodeEntities(tag(chunk, 'guid')),
        description: tag(chunk, 'description'),
        pubDate: tag(chunk, 'pubDate'),
        // WordPress-family feeds use dc:creator; a plain <author> tag is the
        // fallback some other feeds use instead.
        author: decodeEntities(tag(chunk, 'dc:creator') || tag(chunk, 'author')),
      };
    });
}

export function toDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Lightweight heuristic, not real language detection — good enough as a
// curation filter, not a linguistics tool. Two checks on the combined
// title+excerpt: (1) reject if it contains non-Latin script (CJK, Cyrillic,
// Arabic, etc.) — a strong signal; (2) among Latin-script text, require at
// least a couple of common English stopwords, which filters out most
// Latin-script non-English languages (French, Spanish, German, ...)
// without needing an NLP library for a handful of curated feeds.
const NON_LATIN_SCRIPT = /[Ѐ-ӿ؀-ۿऀ-ॿ぀-ヿ一-鿿가-힯]/;
const ENGLISH_STOPWORDS = /\b(the|and|of|to|is|in|for|with|on|that|your|how|you|this|are)\b/gi;

export function isEnglish(text: string): boolean {
  if (!text || !text.trim()) return true; // nothing to judge, don't reject on absence
  if (NON_LATIN_SCRIPT.test(text)) return false;
  const words = text.trim().split(/\s+/).length;
  if (words < 4) return true; // too short for the stopword heuristic to be meaningful either way
  const matches = text.match(ENGLISH_STOPWORDS);
  return (matches?.length ?? 0) >= 2;
}
