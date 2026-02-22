<script>
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config.js';

  let {
    title = siteConfig.title,
    description = siteConfig.description,
    image = '',
    article = false
  } = $props();

  const fullTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.title}`;
  const pageUrl = `${siteConfig.url}${$page.url.pathname}`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <meta name="author" content={siteConfig.author} />

  <!-- Open Graph -->
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:type" content={article ? 'article' : 'website'} />
  <meta property="og:site_name" content={siteConfig.title} />
  <meta property="og:locale" content="en_US" />
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

  <link rel="canonical" href={pageUrl} />
</svelte:head>
