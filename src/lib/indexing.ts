import { BuildRecord } from '../../scripts/buildIndex'
import buildIndex from '@/../public/buildIndex.json'
import {
  authorsService,
  blogService,
  eventsService,
  fetchAll,
  getStagingOnlyFilters,
  getUnlistedFilters,
  pagesService,
  resourcesService
} from '@/lib/api/strapi'
import { getVideos } from '@/lib/videos'

interface IndexedItem extends Partial<Omit<BuildRecord, 'title'>> {
  title: string | null
  path: string
  lastModified?: string | null
  publishedAt?: string | null
}

export async function all(
  indexableOnly: boolean = true
): Promise<Array<IndexedItem>> {
  const [
    blogs,
    events,
    comparisons,
    pages,
    videos,
    integrations,
    resources,
    authors
  ] = await Promise.all([
    cmsBlogs(),
    cmsEvents(),
    cmsComparisons(),
    cmsPages(),
    cmsVideos(),
    cmsIntegrations(),
    cmsResources(),
    cmsAuthors()
  ])

  const byPath = new Map<string, IndexedItem>()

  const add = (arr: readonly IndexedItem[]) => {
    for (const item of arr) {
      // Skip non-indexable if requested
      if (indexableOnly && 'indexable' in item && item.indexable === false) {
        continue
      }

      // Later entries override earlier ones
      byPath.set(item.path, item)
    }
  }

  add(buildIndex)
  add(blogs)
  add(events)
  add(comparisons)
  add(pages)
  add(videos)
  add(integrations)
  add(resources)
  add(authors)

  return Array.from(byPath.values())
}

export async function cmsBlogs(): Promise<Array<IndexedItem>> {
  const blogPosts = await blogService.findAll({
    sort: ['date:DESC', 'publishedAt:DESC'],
    fields: [
      'title',
      'shortDescription',
      'slug',
      'category',
      'publishedAt',
      'updatedAt'
    ]
  })

  return blogPosts.map((post) => {
    const prefix = post.language === 'Japanese' ? '/jp' : ''
    return {
      title: post.title,
      path: `${prefix}/blog/${post.slug}`,
      description: post.shortDescription,
      publishedAt: post.publishedAt,
      lastModified: post.updatedAt
    }
  })
}

export async function cmsEvents(): Promise<Array<IndexedItem>> {
  const events = await eventsService.findAll({
    fields: ['title', 'slug', 'publishedAt', 'updatedAt'],
    populate: false,
    filters: {
      $and: [
        {
          $or: getStagingOnlyFilters()
        },
        {
          $or: getUnlistedFilters()
        }
      ]
    },
    sort: ['localDatetime:DESC']
  })

  return events.map((post) => {
    //const prefix = post.language === 'Japanese' ? '/jp' : ''
    return {
      title: post.title,
      path: `/company/events/${post.slug}`,
      publishedAt: post.publishedAt,
      lastModified: post.updatedAt
    }
  })
}

export async function cmsVideos(): Promise<Array<IndexedItem>> {
  const videos = await getVideos()

  return videos
    .map((post) => {
      const prefix = post.language === 'Japanese' ? '/jp' : ''
      return [
        {
          title: post.title,
          path: `${prefix}/videos/${post.slug}`,
          lastModified: post.updatedAt,
          publishedAt: post.publishedAt
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
          lastModified: post.updatedAt,
          publishedAt: post.publishedAt
        },
        {
          title: post.Title,
          path: `/jp/comparison/${post.slug}`,
          lastModified: post.updatedAt,
          publishedAt: post.publishedAt
        }
      ]
    })
    .flat()
}

export async function cmsPages(): Promise<Array<IndexedItem>> {
  const pages = await pagesService.findAll({
    fields: ['title', 'path', 'updatedAt'],
    sort: ['publishedAt:DESC'],
    populate: ['seo']
  })
  return pages.map((page) => {
    return {
      title: page.title,
      path: `/${page.path}`,
      lastModified: page.updatedAt,
      publishedAt: page.publishedAt,
      indexable: !page?.seo?.noindex && !page?.seo?.robots?.includes('noindex')
    }
  })
}

export async function cmsAuthors(): Promise<Array<IndexedItem>> {
  const authors = await authorsService.findAll({
    fields: ['name', 'slug', 'title', 'updatedAt'],
    sort: ['name:ASC'],
    populate: []
  })
  return authors.map((author) => {
    return {
      title: [author.name, author.title].filter(Boolean).join(' — '),
      path: `/authors/${author.slug}`,
      lastModified: author.updatedAt,
      publishedAt: author.publishedAt
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
          lastModified: post.updatedAt,
          publishedAt: post.publishedAt
        },
        {
          title: post.name,
          path: `/jp/integrations/${post.slug}`,
          lastModified: post.updatedAt,
          publishedAt: post.publishedAt
        }
      ]
    })
    .flat()
}

export async function cmsResources(): Promise<Array<IndexedItem>> {
  const resources = await resourcesService.findAll()
  return resources.map((resource) => {
    return {
      title: resource.title,
      path: `/resources/${resource.category.slug}/${resource.slug}`,
      lastModified: resource.updatedAt,
      publishedAt: resource.publishedAt
    }
  })
}
