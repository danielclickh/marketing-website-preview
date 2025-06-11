import { fetchAll, getStagingOnlyFilters } from '@/lib/api/strapi'
import dotenv from 'dotenv'
import { Feed } from 'feed'
import fs from 'fs'
import path from 'path'

dotenv.config({
  path: [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env')
  ]
})

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL ?? 'localhost:3005'

export default async function generateRssFeed(data: any) {
  const feedOptions = {
    title: 'ClickHouse Blog',
    description: 'Welcome to the ClickHouse Blog!',
    id: siteUrl,
    link: `${siteUrl}/blog`,
    image: `${siteUrl}/logo.svg`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ClickHouse Inc.`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`
    }
  }

  const feed = new Feed(feedOptions)

  data.forEach((post: any) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.shortDescription,
      date: new Date(post.date)
    })
  })

  fs.writeFileSync(path.join(__dirname, '..', 'public', 'rss.xml'), feed.rss2())
}

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
        'date',
        'StagingOnly'
      ],
      filters: {
        $or: getStagingOnlyFilters()
      }
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
