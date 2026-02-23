import { siteConfig } from '$lib/config.js';
import { getThoughts } from '$lib/utils/thoughts.js';
export const prerender = true;

export async function GET() {
  const thoughts = await getThoughts();
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { path: '', changefreq: 'weekly', priority: '1.0' },
    { path: '/projects', changefreq: 'weekly', priority: '0.8' },
    { path: '/thoughts', changefreq: 'weekly', priority: '0.8' }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `<url>
    <loc>${siteConfig.url}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n  ')}
  ${thoughts
    .map(
      (thought) => `<url>
    <loc>${siteConfig.url}/thoughts/${thought.slug}</loc>
    <lastmod>${new Date(thought.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('\n  ')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
