<script>
  import { base } from '$app/paths';
  import { siteConfig } from '$lib/config.js';
</script>

<footer
  class="border-border text-text-secondary max-w-content mt-auto ml-[max(1.5rem,calc((100%-720px)/2.618))] flex items-center gap-6 border-t py-6 pr-6 text-sm"
>
  <p>&copy; {new Date().getFullYear()} {siteConfig.author}</p>
  <a href="{base}/rss.xml">RSS</a>
</footer>
