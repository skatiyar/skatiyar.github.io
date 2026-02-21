<script>
  import { siteConfig } from '$lib/config.js';

  let {
    title = siteConfig.title,
    description = siteConfig.description,
    url = siteConfig.url,
    image = '',
    article = false
  } = $props();

  const fullTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.title}`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="author" content={siteConfig.author} />

  <!-- Open Graph -->
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content={article ? 'article' : 'website'} />
  {#if image}
    <meta property="og:image" content={image} />
  {/if}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  {#if image}
    <meta name="twitter:image" content={image} />
  {/if}

  <link rel="canonical" href={url} />
</svelte:head>
