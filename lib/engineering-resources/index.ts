import { EngineeringResource } from './types'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const engResourcesDirectory = path.join(process.cwd(), 'engineering-resources-data');

export function getEngineeringResources(): EngineeringResource[] {
  try {
    if (!fs.existsSync(engResourcesDirectory)) {
      console.error(`Directory not found: ${engResourcesDirectory}`);
      return [];
    }

    const fileNames = fs.readdirSync(engResourcesDirectory);
    
    const engineeringResources = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        console.log(fileName)
        try {
          const filePath = path.join(engResourcesDirectory, fileName);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          
          // Parse the markdown file
          const { data, content } = matter(fileContents);
          
          // Create slug from filename if not provided in frontmatter
          const slug = data.slug || fileName.replace('.md', '');

          return {
            title: data.title,
            slug,
            excerpt: data.excerpt,
            image: data.image ? data.image: '',
            body: content,
          } as EngineeringResource;
        } catch (error) {
          console.error(`Error reading file ${fileName}:`, error);
          return null;
        }
      })
      .filter((engResource): engResource is EngineeringResource => engResource !== null);

    return engineeringResources;
  } catch (error) {
    console.error('Error getting engineering resources:', error);
    return [];
  }
}

export function getEngineeringResource(slug: string): EngineeringResource | null {
  return getEngineeringResources().find((engResource) => engResource.slug === slug) || null
}