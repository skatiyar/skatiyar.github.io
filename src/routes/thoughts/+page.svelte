<script>
  import SEO from '$lib/components/SEO.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import { base } from '$app/paths';

  let { data } = $props();
</script>

<SEO title="Thoughts" description="Ideas, learnings, and notes." />

<Hero title="Thoughts" description="Ideas, learnings, and notes." />

<ul class="flex list-none flex-col gap-6">
  {#each data.thoughts as thought}
    <li>
      <a href="{base}/thoughts/{thought.slug}" class="flex items-baseline justify-between gap-4">
        <span class="text-lg font-semibold">{thought.title}</span>
        <span class="text-text-secondary text-sm whitespace-nowrap"
          >{new Date(thought.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</span
        >
      </a>
      {#if thought.description}
        <p class="text-text-secondary mt-2 text-base">{thought.description}</p>
      {/if}
    </li>
  {/each}
</ul>
