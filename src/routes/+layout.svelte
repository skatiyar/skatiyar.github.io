<script>
  import '../app.css';
  import { browser } from '$app/environment';
  import { siteConfig } from '$lib/config.js';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();

  const websiteSchemaTag =
    '<script type="application/ld+json">' +
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.title,
      url: siteConfig.url
    }) +
    '</' +
    'script>';

  $effect(() => {
    if (!browser) return;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (!prefersLight) return;

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.classList.remove('dark');
      });
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html websiteSchemaTag}
</svelte:head>

<Header />
<main class="max-w-content ml-[max(1.5rem,calc((100%-720px)/2.618))] flex-1 pt-3 pr-6 pb-8">
  {@render children()}
</main>
<Footer />
