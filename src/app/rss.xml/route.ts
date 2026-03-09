import { cmsBlogs } from '@/lib/indexing'
import { Feed } from 'feed'

export async function GET() {
  const siteURL = 'https://clickhouse.com'

  const indexedItems = await cmsBlogs()

  const feed = new Feed({
    title: 'ClickHouse Blog',
    description: 'Welcome to the ClickHouse Blog!',
    id: siteURL,
    link: `${siteURL}/blog`,
    image: `${siteURL}/logo-full.svg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ClickHouse Inc.`,
    feedLinks: {
      rss2: `${siteURL}/rss.xml`
    }
  })

  indexedItems.forEach((item) => {
    const link = `${siteURL}/${item.path.replace(/^\//, '')}`
    const cmsDate = item.publishedAt || item.lastModified
    feed.addItem({
      title: item.title || item.path,
      id: link,
      link,
      description: item.description || '',
      date: cmsDate ? new Date(cmsDate) : new Date()
    })
  })

  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'text/xml; charset=utf-8' }
  })
}
