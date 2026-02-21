<script>
  import '../app.css';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();

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

<Header />
<main class="max-w-content ml-[max(1.5rem,calc((100%-720px)/2.618))] w-full flex-1 pt-3 pr-6 pb-8">
  {@render children()}
</main>
<Footer />
