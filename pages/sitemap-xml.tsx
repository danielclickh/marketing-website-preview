import type { NextApiResponse } from 'next'
import { fetchAll } from '../lib/api/strapi'

//pages/sitemap.xml.js
//product
//company
//use cases
//pricing
//resources
//blogs
//news
//events
//videos
//ond demand
//comparisons

interface Items {
  id?: string
  slug?: string
  updatedAt?: string
  url?: string
}

function generateSiteMap(
  blogPosts: Items[],
  events: Items[],
  comparisons: Items[],
  richTextPages: Items[]
) {
  const siteURL = 'https://clickhouse.com'
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
      <loc>${siteURL}</loc>
  </url>
  <url>
      <loc>${siteURL}/clickhouse</loc>
  </url>
  <url>
      <loc>${siteURL}/clickhouse/keeper</loc>
  </url>
  <url>
      <loc>${siteURL}/cloud</loc>
  </url>
  <url>
      <loc>${siteURL}/cloud/azure-waitlist</loc>
  </url>
  <url>
      <loc>${siteURL}/cloud/clickpipes</loc>
  </url>
  <url>
      <loc>${siteURL}/company/careers</loc>
  </url>
  <url>
      <loc>${siteURL}/company/contact</loc>
  </url>
  <url>
      <loc>${siteURL}/company/news-events</loc>
  </url>
  <url>
      <loc>${siteURL}/company/our-story</loc>
  </url>
  <url>
      <loc>${siteURL}/learn</loc>
  </url>
  <url>
      <loc>${siteURL}/media</loc>
  </url>
  <url>
      <loc>${siteURL}/monitorama-2023</loc>
  </url>
  <url>
      <loc>${siteURL}/partners/aws</loc>
  </url>
  <url>
      <loc>${siteURL}/pricing</loc>
      <lastmod>2023-09-26</lastmod>
  </url>
  <url>
      <loc>${siteURL}/pricing/contact</loc>
  </url>
  <url>
      <loc>${siteURL}/sitemap</loc>
  </url>
  <url>
      <loc>${siteURL}/use-cases</loc>
  </url>
  <url>
      <loc>${siteURL}/use-cases/logging-and-metrics</loc>
  </url>
  <url>
      <loc>${siteURL}/use-cases/machine-learning-and-data-science</loc>
  </url>
  <url>
      <loc>${siteURL}/use-cases/real-time-analytics</loc>
  </url>
  <url>
      <loc>${siteURL}/user-stories</loc>
  </url>
  <url>
      <loc>${siteURL}/blog</loc>
  </url>
  ${blogPosts
    .map((post) => {
      return `
  <url>
      <loc>${`${siteURL}/blog/${post.slug}`}</loc>
      <lastmod>${post.updatedAt}</lastmod>
  </url>
  `
    })
    .join('')}

  ${events
    .map((post) => {
      return `
  <url>
      <loc>${`${siteURL}/company/events/${post.slug}`}</loc>
      <lastmod>${post.updatedAt}</lastmod>
  </url>
  `
    })
    .join('')}

  ${comparisons
    .map((post) => {
      return `
  <url>
      <loc>${`${siteURL}/comparison/${post.slug}`}</loc>
      <lastmod>${post.updatedAt}</lastmod>
  </url>
  `
    })
    .join('')}
  ${richTextPages
    .map((post) => {
      return `
  <url>
      <loc>${`${siteURL}${post.url}`}</loc>
      <lastmod>${post.updatedAt}</lastmod>
  </url>
  `
    })
    .join('')}
</urlset>

 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const blogsParams = {
    sort: ['date:DESC', 'publishedAt:DESC'],
    fields: ['createdAt', 'updatedAt', 'publishedAt', 'slug', 'date']
  }
  const blogPosts = await fetchAll('blog-posts', blogsParams)

  const events = await fetchAll('events', {
    sort: ['localDatetime:DESC'],
    populate: ['category']
  })

  const comparisonsParams = {
    sort: ['date:DESC', 'publishedAt:DESC'],
    fields: ['Title', 'slug', 'updatedAt']
  }
  const comparisons = await fetchAll('comparisons', comparisonsParams)

  const richTextPageParams = {
    sort: ['date:DESC', 'publishedAt:DESC'],
    fields: ['url', 'updatedAt']
  }
  const richTextPages = await fetchAll('rich-content-pages', richTextPageParams)

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(blogPosts, events, comparisons, richTextPages)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap
