<script>
  import SEO from '$lib/components/SEO.svelte';
  import { siteConfig } from '$lib/config.js';

  let { data } = $props();
  const { content: Content, meta } = data;

  const articleSchemaTag =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.title,
      description: meta.description,
      datePublished: meta.date,
      author: {
        '@type': 'Person',
        name: siteConfig.author,
        url: siteConfig.url
      }
    }) +
    '</' +
    'script>';
</script>

<SEO title={meta.title} description={meta.description} article={true} />
<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html articleSchemaTag}
</svelte:head>

<article>
  <header class="mb-8">
    <h1 class="mb-2 text-2xl font-bold">{meta.title}</h1>
    <time datetime={meta.date} class="text-text-secondary text-sm">
      {new Date(meta.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </time>
  </header>

  <div class="prose max-w-none">
    <Content />
  </div>
</article>
