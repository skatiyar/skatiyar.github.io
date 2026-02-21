import { siteConfig } from '$lib/config.js';
import { getThoughts } from '$lib/utils/thoughts.js';
export const prerender = true;

export async function GET() {
  const thoughts = await getThoughts();

  const staticPages = ['', '/projects', '/thoughts'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (path) => `<url>
    <loc>${siteConfig.url}${path}</loc>
  </url>`
    )
    .join('\n  ')}
  ${thoughts
    .map(
      (thought) => `<url>
    <loc>${siteConfig.url}/thoughts/${thought.slug}</loc>
    <lastmod>${new Date(thought.date).toISOString().split('T')[0]}</lastmod>
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
