import { getProjects } from '$lib/utils/projects.js';
import { getThoughts } from '$lib/utils/thoughts.js';

export async function load() {
  const projects = await getProjects();
  const thoughts = await getThoughts();
  return { projects, thoughts };
}
