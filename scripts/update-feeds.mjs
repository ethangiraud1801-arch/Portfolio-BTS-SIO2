import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const root = resolve(import.meta.dirname, '..');
const sources = JSON.parse(await readFile(resolve(root, 'src/data/feed-sources.json'), 'utf8'));
const cachePath = resolve(root, 'src/data/feed-cache.json');
const previous = JSON.parse(await readFile(cachePath, 'utf8'));
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_', cdataPropName: '#text' });
const asArray = value => value == null ? [] : Array.isArray(value) ? value : [value];
const plain = value => typeof value === 'string' ? value : typeof value === 'object' && value ? String(value['#text'] ?? value['@_href'] ?? '') : '';
const clean = value => plain(value).replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, match => ({'&nbsp;':' ','&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[match])).replace(/\s+/g, ' ').trim();
const safeUrl = value => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
const canonical = value => { const url = new URL(value); url.hash = ''; for (const key of [...url.searchParams.keys()]) if (/^(utm_|fbclid|gclid)/i.test(key)) url.searchParams.delete(key); return url.href.replace(/\/$/, ''); };
const cutoff = Date.now() - 90 * 86400000;
const errors = [];
const fresh = [];

for (const source of sources) {
  try {
    const response = await fetch(source.url, { headers: { 'User-Agent': 'Ethan-Giraud-Portfolio-RSS/1.0', Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml' }, signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = parser.parse(await response.text());
    const entries = asArray(xml.rss?.channel?.item ?? xml.feed?.entry);
    if (!entries.length) throw new Error('aucun article reconnu');
    for (const item of entries) {
      const link = safeUrl(plain(item.link) || plain(asArray(item.link).find(link => link?.['@_rel'] === 'alternate')));
      const title = clean(item.title);
      const rawDate = plain(item.pubDate ?? item.published ?? item.updated ?? item['dc:date']);
      const dateValue = Date.parse(rawDate);
      if (!link || !title || !Number.isFinite(dateValue) || dateValue < cutoff || dateValue > Date.now() + 86400000) continue;
      fresh.push({ title, source: source.name, category: source.category, date: new Date(dateValue).toISOString(), summary: clean(item.description ?? item.summary ?? item.content).slice(0, 260), url: link });
    }
  } catch (error) { errors.push(`${source.name}: ${error.message}`); }
}

// Conserver temporairement les articles de la dernière collecte lorsqu'un flux échoue.
const activeSources = new Set(sources.map(source => source.name));
const combined = [...fresh, ...asArray(previous.articles).filter(article => activeSources.has(article.source) && Date.parse(article.date) >= cutoff)];
const seen = new Set();
const articles = combined.sort((a,b) => Date.parse(b.date) - Date.parse(a.date)).filter(article => { const key = canonical(article.url); if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, 36);
const next = { updatedAt: fresh.length ? new Date().toISOString() : previous.updatedAt, articles, errors };
await writeFile(cachePath, JSON.stringify(next, null, 2) + '\n');
console.log(`${articles.length} articles en cache, ${errors.length} flux indisponible(s).`);
if (errors.length) console.warn(errors.join('\n'));
