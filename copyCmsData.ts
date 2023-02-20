import dotenv from 'dotenv'
dotenv.config()
import generateRssFeed from './lib/api/rss'
import { fetchAll } from './lib/api/strapi'

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

async function generateRssXml() {
  try {
    const blogsParams = {
      sort: ['date:DESC', 'publishedAt:DESC'],
      populate: ['author', 'author.avatarPng', 'thumbnailPng'],
      fields: [
        'category',
        'title',
        'shortDescription',
        'createdAt',
        'updatedAt',
        'publishedAt',
        'slug',
        'date'
      ]
    }
    log('fetching blog posts for rss.xml...')
    const data = await fetchAll('blog-posts', blogsParams)
    log('generating rss.xml...')
    await generateRssFeed(data)
    log('done generating rss.xml')
  } catch (e) {
    if (e instanceof Error) {
      warn(`Error generating rss.xml: ${e.message}`)
    } else {
      warn(`Error generating rss.xml: ${e}`)
    }
  }
}

generateRssXml()
