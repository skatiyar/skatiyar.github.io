<script>
  let { title, description = undefined } = $props();
</script>

<section class="py-8">
  <h1 class="mb-2 text-4xl font-bold">{title}</h1>
  {#if description}
    <p class="text-text-secondary text-lg">{description}</p>
  {/if}
</section>
