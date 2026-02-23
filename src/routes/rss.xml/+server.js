import { XMLBuilder } from 'fast-xml-parser';
import { siteConfig } from '$lib/config.js';
import { getThoughts } from '$lib/utils/thoughts.js';

export const prerender = true;

export async function GET() {
  const thoughts = await getThoughts();

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    indentBy: '  '
  });

  const xml = builder.build({
    '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
    rss: {
      '@_version': '2.0',
      '@_xmlns:atom': 'http://www.w3.org/2005/Atom',
      channel: {
        title: siteConfig.title,
        description: siteConfig.description,
        link: siteConfig.url,
        'atom:link': {
          '@_href': `${siteConfig.url}/rss.xml`,
          '@_rel': 'self',
          '@_type': 'application/rss+xml'
        },
        language: siteConfig.language,
        item: thoughts.map((thought) => ({
          title: thought.title,
          description: thought.description || '',
          link: `${siteConfig.url}/thoughts/${thought.slug}`,
          guid: {
            '#text': `${siteConfig.url}/thoughts/${thought.slug}`,
            '@_isPermaLink': 'true'
          },
          pubDate: new Date(thought.date).toUTCString()
        }))
      }
    }
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
