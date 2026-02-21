<script>
  import SEO from '$lib/components/SEO.svelte';

  let { data } = $props();
  const { content: Content, meta } = data;
</script>

<SEO title={meta.title} description={meta.description} article={true} />

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
