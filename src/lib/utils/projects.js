/**
 * Fetches all markdown projects from src/projects/ and returns them sorted by date (newest first).
 * Each .md file must have frontmatter with at least: title, date, description, type.
 */
export async function getProjects() {
  const modules = import.meta.glob('/src/projects/*.md', { eager: true });

  const projects = Object.entries(modules).map(([filepath, module]) => {
    const slug = filepath.split('/').pop().replace('.md', '');
    return {
      slug,
      Content: module.default,
      ...module.metadata
    };
  });

  projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  return projects;
}
