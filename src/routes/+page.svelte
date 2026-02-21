<script>
  import SEO from '$lib/components/SEO.svelte';
  import { base } from '$app/paths';

  let { data } = $props();
</script>

<SEO />

<section class="py-8">
  <h1 class="mb-2 text-4xl font-bold">Suyash Katiyar</h1>
  <p class="text-text-secondary text-lg">
    A maker at core, I enjoy spending time prototyping ideas, to learn and challenge myself. Having
    worked as both backend and frontend developer early in my career, has given me insights to
    understand challenges faced in product development and often helped me to come up with unique
    solutions.
  </p>
</section>

{#if data.latest.length > 0}
  <section>
    <h2 class="mb-4 text-2xl font-bold">Latest</h2>
    <div class="flex flex-col gap-6">
      {#each data.latest as item, i}
        {@const href =
          item.kind === 'thought' ? `${base}/thoughts/${item.slug}` : `${base}/projects`}
        <a {href} class="group flex gap-4 no-underline hover:no-underline">
          <div
            class="bg-bg-secondary border-border flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
          >
            {#if item.image}
              <img src="{base}{item.image}" alt={item.title} class="h-full w-full object-cover" />
            {:else}
              <span class="text-text-secondary text-lg font-bold">#{i + 1}</span>
            {/if}
          </div>
          <div class="flex min-w-0 flex-col justify-center">
            <div class="mb-2 flex items-center gap-2">
              <span
                class="text-text-primary group-hover:text-accent text-lg font-semibold transition-colors"
                >{item.title}</span
              >
              <span
                class="bg-bg-secondary text-text-secondary rounded-full px-2 py-0.5 text-sm capitalize"
                >{item.kind}</span
              >
            </div>
            <p class="text-text-secondary truncate text-base">{item.description}</p>
            <time class="text-text-secondary mt-2 text-sm"
              >{new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</time
            >
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}
