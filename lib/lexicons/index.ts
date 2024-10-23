import { Lexicon } from './types'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const lexiconDirectory = path.join(process.cwd(), 'lexicon-data');

export function getLexicons(): Lexicon[] {
  console.log(lexiconDirectory)
  
  try {
    if (!fs.existsSync(lexiconDirectory)) {
      console.error(`Directory not found: ${lexiconDirectory}`);
      return [];
    }

    const fileNames = fs.readdirSync(lexiconDirectory);
    
    const lexicons = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        try {
          const filePath = path.join(lexiconDirectory, fileName);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          
          // Parse the markdown file
          const { data, content } = matter(fileContents);
          
          // Create slug from filename if not provided in frontmatter
          const slug = data.slug || fileName.replace('.md', '');

          return {
            title: data.title,
            slug,
            excerpt: data.excerpt,
            body: content,
          } as Lexicon;
        } catch (error) {
          console.error(`Error reading file ${fileName}:`, error);
          return null;
        }
      })
      .filter((lexicon): lexicon is Lexicon => lexicon !== null);

    return lexicons;
  } catch (error) {
    console.error('Error getting lexicons:', error);
    return [];
  }
}

export function getLexicon(slug: string): Lexicon | null {
  return getLexicons().find((lexicon) => lexicon.slug === slug) || null
}