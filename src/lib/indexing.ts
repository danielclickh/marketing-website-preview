import { BuildRecord } from '../../scripts/buildIndex'
import buildIndex from '@/../public/buildIndex.json'
import {
  fetchAll,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { getVideos } from '@/lib/videos'

interface IndexedItem extends Partial<Omit<BuildRecord, 'title'>> {
  title: string | null
  path: string
  lastModified: string | null
}

export async function all(): Promise<Array<IndexedItem>> {
  const staticItems = buildIndex.filter((item) => item.indexable)

  const [blogs, events, comparisons, pages, videos, integrations] =
    await Promise.all([
      cmsBlogs(),
      cmsEvents(),
      cmsComparisons(),
      cmsPages(),
      cmsVideos(),
      cmsIntegrations()
    ])

  // Deduplicate by path (later entries override earlier ones)
  return [
    ...new Map(
      [
        ...staticItems,
        ...blogs,
        ...events,
        ...comparisons,
        ...pages,
        ...videos,
        ...integrations
      ].map((item) => [item.path, item])
    ).values()
  ]
}

export async function cmsBlogs(): Promise<Array<IndexedItem>> {
  const blogPosts = await fetchAll('blog-posts', {
    sort: ['date:DESC', 'publishedAt:DESC'],
    fields: [
      'title',
      'shortDescription',
      'slug',
      'category',
      'publishedAt',
      'updatedAt'
    ],
    filters: { $or: getStagingOnlyFilters() }
  })

  return blogPosts.map((post) => {
    const prefix = post.category === 'Japanese' ? '/jp' : ''
    return {
      title: post.title,
      path: `${prefix}/blog/${post.slug}`,
      description: post.shortDescription,
      lastModified: post.updatedAt
    }
  })
}

export async function cmsEvents(): Promise<Array<IndexedItem>> {
  const events = await fetchAll('events', {
    sort: ['localDatetime:DESC'],
    fields: ['title', 'slug', 'publishedAt', 'updatedAt'],
    filters: {
      $and: [
        {
          $or: getStagingOnlyFilters()
        },
        {
          $or: getUnlistedFilters()
        }
      ]
    }
  })

  return events.map((post) => {
    return {
      title: post.title,
      path: `/company/events/${post.slug}`,
      lastModified: post.updatedAt
    }
  })
}

export async function cmsVideos(): Promise<Array<IndexedItem>> {
  const videos = await getVideos()

  return videos
    .map((post) => {
      return [
        {
          title: post.title,
          path: `/videos/${post.slug}`,
          lastModified: post.updatedAt
        },
        {
          title: post.title,
          path: `/jp/videos/${post.slug}`,
          lastModified: post.updatedAt
        }
      ]
    })
    .flat()
}

export async function cmsComparisons(): Promise<Array<IndexedItem>> {
  const comparisons = await fetchAll('comparisons', {
    sort: ['publishedAt:DESC'],
    fields: ['Title', 'slug', 'updatedAt']
  })

  return comparisons
    .map((post) => {
      return [
        {
          title: post.Title,
          path: `/comparison/${post.slug}`,
          lastModified: post.updatedAt
        },
        {
          title: post.Title,
          path: `/jp/comparison/${post.slug}`,
          lastModified: post.updatedAt
        }
      ]
    })
    .flat()
}

export async function cmsPages(): Promise<Array<IndexedItem>> {
  const richTextPages = await fetchAll('rich-content-pages', {
    sort: ['publishedAt:DESC'],
    fields: ['title', 'url', 'updatedAt']
  })
  return richTextPages.map((post) => {
    const uri = post.url.replace(/^\/+/, '').replace(/\/+$/, '')
    return {
      title: post.title,
      path: `/${uri}`,
      lastModified: post.updatedAt
    }
  })
}

export async function cmsIntegrations(): Promise<Array<IndexedItem>> {
  const integrations = await fetchAll('integrations', {
    fields: ['slug', 'name', 'updatedAt'],
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

  return integrations
    .map((post) => {
      return [
        {
          title: post.name,
          path: `/integrations/${post.slug}`,
          lastModified: post.updatedAt
        },
        {
          title: post.name,
          path: `/jp/integrations/${post.slug}`,
          lastModified: post.updatedAt
        }
      ]
    })
    .flat()
}
