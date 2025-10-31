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

          // Check for corresponding JSON-LD schema file
          let schema = null
          const schemaFileName = fileName.replace('.md', '.json')
          const schemaFilePath = path.join(engResourcesDirectory, schemaFileName)
          
          if (fs.existsSync(schemaFilePath)) {
            try {
              const schemaContents = fs.readFileSync(schemaFilePath, 'utf8')
              schema = JSON.parse(schemaContents)
            } catch (error) {
              console.error(`Error parsing JSON-LD file ${schemaFileName}:`, error)
            }
          }

          return {
            title: data.title,
            slug,
            excerpt: data.excerpt,
            image: data.image ? data.image : '',
            lastUpdated: data.lastUpdated || '',
            index: data.index ?? 9999, // Add index property with default value -1
            body: content,
            author: data.author || null,
            authorAvatar: data.authorAvatar || null,
            headersSelector: data.headersSelector || null,
            schema: schema
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
