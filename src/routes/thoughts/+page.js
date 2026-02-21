import { getThoughts } from '$lib/utils/thoughts.js';

export async function load() {
  const thoughts = await getThoughts();
  return { thoughts };
}
