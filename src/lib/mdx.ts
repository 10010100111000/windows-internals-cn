import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export async function getTopicMdx(slug: string) {
  const mdxPath = path.join(contentDir, 'explore', `${slug}.mdx`);
  const mdPath = path.join(contentDir, 'explore', `${slug}.md`);

  let filePath = '';
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return {
    content,
    frontmatter: data,
  };
}
