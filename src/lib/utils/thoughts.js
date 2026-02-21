/**
 * Fetches all markdown thoughts from src/thoughts/ and returns them sorted by date (newest first).
 * Each .md file must have frontmatter with at least: title, date, description.
 */
export async function getThoughts() {
  const modules = import.meta.glob('/src/thoughts/*.md', { eager: true });

  const thoughts = Object.entries(modules).map(([filepath, module]) => {
    const slug = filepath.split('/').pop().replace('.md', '');
    return {
      slug,
      ...module.metadata
    };
  });

  thoughts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return thoughts;
}
