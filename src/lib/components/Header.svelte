<script>
  import { base } from '$app/paths';
</script>

<header class="pt-8">
  <div class="max-w-content ml-[max(1.5rem,calc((100%-720px)/2.618))] flex flex-col gap-3 pr-6">
    <a href="{base}/" class="no-underline hover:no-underline hover:opacity-80">
      <img src="{base}/logo.png" alt="Home" class="h-24 w-24 rounded" />
    </a>
    <nav class="flex items-center gap-6 pt-8">
      <a href="{base}/">Home</a>
      <a href="{base}/projects">Projects</a>
      <a href="{base}/thoughts">Thoughts</a>
    </nav>
  </div>
</header>
