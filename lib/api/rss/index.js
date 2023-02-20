import fs from 'fs'
import path from 'path'

import { Feed } from 'feed'

const siteUrl = process.env.WEBSITE_URL ?? 'localhost:3000'

export default async function generateRssFeed(data) {
  const feedOptions = {
    title: 'Blog posts | RSS Feed',
    description: 'Welcome to the ClickHouse Blog!',
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ClickHouse Inc.`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
  }

  const feed = new Feed(feedOptions)

  data.forEach((post) => {
    // console.log(post)
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.shortDescription,
      date: new Date(post.date)
    })
  })

  fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'public', 'rss.xml'), feed.rss2());
}
