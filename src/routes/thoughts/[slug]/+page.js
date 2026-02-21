export async function load({ params }) {
  const thought = await import(`../../../thoughts/${params.slug}.md`);

  return {
    content: thought.default,
    meta: thought.metadata
  };
}
