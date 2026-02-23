import { XMLBuilder } from 'fast-xml-parser';
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

  const urls = [
    ...staticPages.map((page) => ({
      loc: `${siteConfig.url}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority
    })),
    ...thoughts.map((thought) => ({
      loc: `${siteConfig.url}/thoughts/${thought.slug}`,
      lastmod: new Date(thought.date).toISOString().split('T')[0],
      changefreq: 'yearly',
      priority: '0.6'
    }))
  ];

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    indentBy: '  '
  });

  const xml = builder.build({
    '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
    urlset: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      url: urls.map((u) => ({
        loc: u.loc,
        lastmod: u.lastmod,
        changefreq: u.changefreq,
        priority: u.priority
      }))
    }
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
