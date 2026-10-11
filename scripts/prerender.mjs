/**
 * Post-build step (runs after `vite build` + the SSR build, see package.json):
 *  1. Renders the React app to static HTML and injects it into dist/index.html,
 *     so crawlers and social link previews get the full page content.
 *  2. Replaces the __SITE_URL__ placeholders (canonical, Open Graph, JSON-LD).
 *  3. Writes dist/sitemap.xml and dist/robots.txt.
 *
 * Site URL: SITE_URL env var if set, otherwise Vercel's production domain
 * (VERCEL_PROJECT_PRODUCTION_URL — your custom domain once one is added).
 */
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const serverDir = resolve(root, 'dist-server');

const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:4173'
).replace(/\/+$/, '');

if (siteUrl.includes('localhost')) {
  console.warn('[prerender] No SITE_URL / Vercel domain found — using', siteUrl, '(fine for local testing).');
}

// 1. Render the app
const { render } = await import(pathToFileURL(resolve(serverDir, 'entry-server.js')).href);
const appHtml = render();

const indexPath = resolve(dist, 'index.html');
let html = readFileSync(indexPath, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('[prerender] #root placeholder not found');
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// 2. Absolute URLs
html = html.replaceAll('__SITE_URL__', siteUrl);
writeFileSync(indexPath, html);

// 3. sitemap + robots
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
);
writeFileSync(
  resolve(dist, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`
);

rmSync(serverDir, { recursive: true, force: true });
console.log(`[prerender] ✓ ${Math.round(appHtml.length / 1024)} KB of HTML pre-rendered · site URL ${siteUrl}`);
