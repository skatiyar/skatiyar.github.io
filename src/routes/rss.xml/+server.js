import { siteConfig } from '$lib/config.js';
import { getThoughts } from '$lib/utils/thoughts.js';

export const prerender = true;

export async function GET() {
  const thoughts = await getThoughts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.title)}</title>
    <description>${escape(siteConfig.description)}</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>${siteConfig.language}</language>
    ${thoughts
      .map(
        (thought) => `
    <item>
      <title>${escape(thought.title)}</title>
      <description>${escape(thought.description || '')}</description>
      <link>${siteConfig.url}/thoughts/${thought.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/thoughts/${thought.slug}</guid>
      <pubDate>${new Date(thought.date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
