import { EngineeringResource } from './types'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const engResourcesDirectory = path.join(
  process.cwd(),
  'src',
  'engineering-resources-data'
)

export function getEngineeringResources(): EngineeringResource[] {
  try {
    if (!fs.existsSync(engResourcesDirectory)) {
      console.error(`Directory not found: ${engResourcesDirectory}`)
      return []
    }

    const fileNames = fs.readdirSync(engResourcesDirectory)

    const engineeringResources = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          const filePath = path.join(engResourcesDirectory, fileName)
          const fileContents = fs.readFileSync(filePath, 'utf8')

          // Parse the markdown file
          const { data, content } = matter(fileContents)

          // Create slug from filename if not provided in frontmatter
          const slug = data.slug || fileName.replace('.md', '')

          return {
            title: data.title,
            slug,
            excerpt: data.excerpt,
            image: data.image ? data.image : '',
            lastUpdated: data.lastUpdated || '',
            index: data.index ?? 9999, // Add index property with default value -1
            body: content,
            author: data.author || null,
            authorAvatar: data.authorAvatar || null
          } as EngineeringResource
        } catch (error) {
          console.error(`Error reading file ${fileName}:`, error)
          return null
        }
      })
      .filter(
        (engResource): engResource is EngineeringResource =>
          engResource !== null
      )
      .sort((a, b) => a.index - b.index) // Sort by the 'index' property

    return engineeringResources
  } catch (error) {
    console.error('Error getting engineering resources:', error)
    return []
  }
}

export function getEngineeringResource(
  slug: string
): EngineeringResource | null {
  return (
    getEngineeringResources().find(
      (engResource) => engResource.slug === slug
    ) || null
  )
}
