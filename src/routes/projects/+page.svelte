<script>
  import SEO from '$lib/components/SEO.svelte';
  import { base } from '$app/paths';

  let { data } = $props();

  const opensource = data.projects.filter((p) => p.type === 'opensource');
  const closed = data.projects.filter((p) => p.type === 'closed');

  function relatedThoughts(slug) {
    return data.thoughts.filter((thought) => thought.project === slug);
  }
</script>

<SEO title="Projects" description="Open source and closed source projects" />

<h1 class="mb-8 text-2xl font-bold">Projects</h1>

{#if opensource.length > 0}
  <h2 class="mb-4 text-2xl font-bold">Open Source</h2>
  <div class="mb-8 flex flex-col gap-6">
    {#each opensource as project}
      <div class="border-border rounded-lg border p-5">
        <div class="mb-2 flex items-baseline justify-between gap-4">
          <h3 class="text-lg font-bold">{project.title}</h3>
          <div class="flex gap-4 text-sm whitespace-nowrap">
            {#if project.repo}
              <a href={project.repo} target="_blank" rel="noopener noreferrer">Repo</a>
            {/if}
            {#if project.url}
              <a href={project.url} target="_blank" rel="noopener noreferrer">Website</a>
            {/if}
          </div>
        </div>
        <div class="prose max-w-none">
          <project.Content />
        </div>
        {#if relatedThoughts(project.slug).length > 0}
          <div class="border-border mt-4 border-t pt-4">
            <h4 class="text-text-secondary mb-2 text-sm">Related thoughts</h4>
            <ul class="flex list-none flex-col gap-2">
              {#each relatedThoughts(project.slug) as thought}
                <li>
                  <a href="{base}/thoughts/{thought.slug}" class="text-sm">{thought.title}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}

{#if closed.length > 0}
  <h2 class="mb-4 text-2xl font-bold">Closed Source</h2>
  <div class="mb-8 flex flex-col gap-6">
    {#each closed as project}
      <div class="border-border rounded-lg border p-5">
        <div class="mb-2 flex items-baseline justify-between gap-4">
          <h3 class="text-lg font-bold">{project.title}</h3>
          <div class="flex gap-4 text-sm whitespace-nowrap">
            {#if project.url}
              <a href={project.url} target="_blank" rel="noopener noreferrer">Website</a>
            {/if}
          </div>
        </div>
        <div class="prose max-w-none">
          <project.Content />
        </div>
        {#if relatedThoughts(project.slug).length > 0}
          <div class="border-border mt-4 border-t pt-4">
            <h4 class="text-text-secondary mb-2 text-sm">Related thoughts</h4>
            <ul class="flex list-none flex-col gap-2">
              {#each relatedThoughts(project.slug) as thought}
                <li>
                  <a href="{base}/thoughts/{thought.slug}" class="text-sm">{thought.title}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}
