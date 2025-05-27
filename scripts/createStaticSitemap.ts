import {
  fetchAll,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '../src/lib/api/strapi'
import { getEngineeringResources } from '../src/lib/engineering-resources'
import { getVideos } from '../src/lib/videos'
import { Video } from '../src/lib/videos/types'
import { Integration } from '../src/types/integrations'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({
  path: [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env')
  ]
})

const stagingOnlyFilters = getStagingOnlyFilters()

interface Items {
  id?: string
  slug?: string
  updatedAt?: string
  url?: string
  thumbnail?: string
  description?: string
  title?: string
}

interface BlogItems extends Items {
  category: string
}

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

function generateSiteMap(
  blogPosts: BlogItems[],
  events: Items[],
  comparisons: Items[],
  richTextPages: Items[],
  videos: Video[],
  engResources: Items[],
  integrations: Integration[]
) {
  const siteURL = 'https://clickhouse.com'

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
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
        <loc>${siteURL}/chdb</loc>
    </url>
    <url>
        <loc>${siteURL}/government</loc>
    </url>
    <url>
        <loc>${siteURL}/cloud/azure-waitlist</loc>
    </url>
    <url>
        <loc>${siteURL}/cloud/clickpipes</loc>
    </url>
    <url>
        <loc>${siteURL}/cloud/clickpipes/azure-blob-storage-connector</loc>
    </url>
    <url>
        <loc>${siteURL}/cloud/clickpipes/mysql-cdc-connector</loc>
    </url>
    <url>
        <loc>${siteURL}/cloud/clickpipes/postgres-cdc-connector</loc>
    </url>
    <url>
        <loc>${siteURL}/cloud/bring-your-own-cloud</loc>
    </url>
    <url>
        <loc>${siteURL}/company/careers</loc>
    </url>
    <url>
        <loc>${siteURL}/company/contact</loc>
    </url>
    <url>
        <loc>${siteURL}/company/request-demo</loc>
    </url>
    <url>
        <loc>${siteURL}/company/events</loc>
    </url>
    <url>
        <loc>${siteURL}/company/news</loc>
    </url>
    <url>
        <loc>${siteURL}/company/our-story</loc>
    </url>
    <url>
        <loc>${siteURL}/learn</loc>
    </url>
    <url>
        <loc>${siteURL}/learn/certification</loc>
    </url>
    <url>
        <loc>${siteURL}/media</loc>
    </url>
    <url>
      <loc>${siteURL}/videos</loc>
    </url>
    <url>
        <loc>${siteURL}/integrations</loc>
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
        <loc>${siteURL}/use-cases/observability</loc>
    </url>
    <url>
        <loc>${siteURL}/use-cases/machine-learning-and-data-science</loc>
    </url>
    <url>
        <loc>${siteURL}/use-cases/real-time-analytics</loc>
    </url>
    <url>
        <loc>${siteURL}/use-cases/observability</loc>
    </url>
    <url>
        <loc>${siteURL}/user-stories</loc>
    </url>
    <url>
      <loc>${siteURL}/real-time-data-warehouse</loc>
    </url>

    <url>
        <loc>${siteURL}/comparison/rockset</loc>
    </url>
    <url>
        <loc>${siteURL}/comparison/doublecloud</loc>
    </url>
    <url>
        <loc>${siteURL}/blog</loc>
    </url>
    <url>
        <loc>${siteURL}/industries/gaming</loc>
    </url>
    ${blogPosts
      .map((post) => {
        const prefix = post.category === 'Japanese' ? '/jp' : ''
        return `
    <url>
        <loc>${siteURL}${prefix}/blog/${post.slug}</loc>
        <lastmod>${post.updatedAt}</lastmod>
    </url>
    `
      })
      .join('')}

    ${events
      .map((post) => {
        return `
    <url>
        <loc>${siteURL}/company/events/${post.slug}</loc>
        <lastmod>${post.updatedAt}</lastmod>
    </url>
    `
      })
      .join('')}

    ${comparisons
      .map((post) => {
        return `
    <url>
        <loc>${siteURL}/comparison/${post.slug}</loc>
        <lastmod>${post.updatedAt}</lastmod>
    </url>
    `
      })
      .join('')}
    ${richTextPages
      .map((post) => {
        return `
    <url>
        <loc>${siteURL}${post.url}</loc>
        <lastmod>${post.updatedAt}</lastmod>
    </url>
    `
      })
      .join('')}
   ${videos
     .map((post) => {
       return `
    <url>
        <loc>${siteURL}/videos/${post.slug}</loc>
    </url>
    `
     })
     .join('')}

     ${engResources
       .map((engResource) => {
         return `
    <url>
        <loc>${siteURL}/engineering-resources/${engResource.slug}</loc>
    </url>
    `
       })
       .join('')}

     ${integrations
       .map((integration) => {
         return `
    <url>
        <loc>${siteURL}/integrations/${integration.slug}</loc>
    </url>
    `
       })
       .join('')}
</urlset>`
  try {
    const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
    fs.writeFileSync(outputPath, sitemapXML)
    log('Sitemap successfully written to file.')
  } catch (error) {
    warn(`Error writing sitemap to file:  ${JSON.stringify(error)}`)
  }
}

async function triggerSitemap() {
  log('Starting to build sitemap')

  log('Fetching blogs')
  const blogPosts = await fetchAll('blog-posts', {
    sort: ['date:DESC', 'publishedAt:DESC'],
    fields: [
      'createdAt',
      'updatedAt',
      'publishedAt',
      'slug',
      'date',
      'category'
    ],
    filters: { $or: stagingOnlyFilters }
  })

  log('Fetching events')
  const events = await fetchAll('events', {
    sort: ['localDatetime:DESC'],
    populate: ['category'],
    filters: {
      $or: getUnlistedFilters()
    }
  })

  log('Fetching comparisons')
  const comparisons = await fetchAll('comparisons', {
    sort: ['publishedAt:DESC'],
    fields: ['Title', 'slug', 'updatedAt']
  })

  log('Fetching rich content pages')
  const richTextPages = await fetchAll('rich-content-pages', {
    sort: ['publishedAt:DESC'],
    fields: ['url', 'updatedAt', 'publishedAt']
  })

  log('Fetching integrations')
  const integrations = await fetchAll('integrations', {
    filters: {
      // Integrations with `openInNewWindow` set to true are excluded from the query.
      // This is because they link off externally. See the IntegrationTile component.
      $or: [
        {
          openInNewWindow: {
            $eq: false
          }
        },
        {
          openInNewWindow: {
            $null: true
          }
        }
      ]
    }
  })

  log('Fetching videos')
  const videos = await getVideos()

  log('Fetching engineering resources')
  const engineeringResources = getEngineeringResources()

  // We generate the XML sitemap with the posts data
  generateSiteMap(
    blogPosts,
    events,
    comparisons,
    richTextPages,
    videos,
    engineeringResources,
    integrations
  )
}

triggerSitemap()
