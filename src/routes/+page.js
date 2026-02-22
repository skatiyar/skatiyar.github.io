import { getProjects } from '$lib/utils/projects.js';
import { getThoughts } from '$lib/utils/thoughts.js';

export async function load() {
  const projects = await getProjects();
  const thoughts = await getThoughts();

  const latest = [
    ...projects.map((p) => ({ ...p, kind: 'project' })),
    ...thoughts.map((t) => ({ ...t, kind: 'thought' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return { latest: latest.slice(0, 7) };
}
