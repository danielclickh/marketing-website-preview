import { pages as learnPages } from '@/data/learn'
import {
  blogService,
  fetchAll,
  isAuthorisedRevalidationRequest,
  resourceCategoriesService,
  resourcesService
} from '@/lib/api/strapi'
import { absoluteUrl } from '@/lib/next'
import { OpenhouseEntry } from '@/pages/openhouse/[slug]/types'
import { waitUntil } from '@vercel/functions'
import type { NextApiRequest, NextApiResponse } from 'next'

const revalidate = async (
  response: NextApiResponse,
  uris: Array<string> | string
) => {
  if (!Array.isArray(uris)) {
    uris = [uris]
  }

  // Always revalidate html sitemap page
  uris.push('/sitemap')

  const promises: Array<Promise<void>> = []

  uris.forEach((uri) => {
    console.log('Revalidating:', uri)
    promises.push(response.revalidate(uri))
  })

  return await Promise.all(promises)
}

// strapi UID => revalidation callback
const CONTENT_TYPE_HANDLERS: Record<
  string,
  (
    body: any,
    response: NextApiResponse,
    request: NextApiRequest
  ) => Promise<void>
> = {
  /**
   * -----
   * Collection types
   * -----
   */
  'api::authors.authors': async function (body, response, request) {
    const paths = [`/sitemap` /*`/blog`*/]

    const id = body?.entry?.id
    const slug = body?.entry?.slug

    if (slug) {
      paths.push(`/authors/${slug}`)
    }

    // Update blogs
    if (id) {
      const authorBlogs = await blogService.findAll({
        fields: ['slug'],
        populate: [],
        filters: {
          author: {
            profiles: {
              id
            }
          }
        }
      })

      authorBlogs.forEach((blog) => {
        paths.push(`/blog/${blog.slug}`)
      })
    }

    await revalidate(response, paths)
  },
  'api::blog-post.blog-post': async function (body, response, request) {
    const paths = [`/sitemap` /*`/blog`*/]

    const slug = body?.entry?.slug

    if (slug) {
      paths.push(`/blog/${slug}`)
      paths.push(`/jp/blog/${slug}`)
    }

    // Revalidate open house page because it uses tagged content
    paths.push('/openhouse')

    // Get all author relation slugs
    const authorSlugs = body?.entry?.author?.profiles?.map(
      // @ts-expect-error todo: better type handling
      (profile) => profile.slug
    )

    // Revalidate author pages
    if (authorSlugs) {
      // @ts-expect-error todo: better type handling
      authorSlugs.forEach((authorSlug) => {
        paths.push(`/authors/${authorSlug}`)
      })
    }

    // Standard ISR revalidation
    await revalidate(response, paths)

    // Markdown api route revalidation workaround
    if (slug) {
      try {
        const markdownUrl = absoluteUrl(`/blog/${slug}.md`)
        console.log(`Revalidating: ${markdownUrl}`)

        // 1. Fetch a fresh markdown version, bypassing CDN cache
        const token = Array.isArray(request?.headers?.['isr-auth-token'])
          ? request?.headers?.['isr-auth-token'][0]
          : request?.headers?.['isr-auth-token']

        await fetch(`${markdownUrl}?force=true`, {
          method: 'GET',
          headers: token
            ? {
                'isr-auth-token': token
              }
            : {}
        })

        // 2. Reseed CDN cache immediately with the new data
        await fetch(absoluteUrl(`/blog/${body.entry.slug}.md`), {
          headers: { 'Cache-Control': 'no-cache' }
        })
      } catch (error) {
        console.log('Error revalidating markdown', error)
      }
    }
  },
  'api::comparison.comparison': async function (body, response) {
    const paths = [`/sitemap`]

    if (body?.entry?.slug) {
      paths.push(`/comparison/${body.entry.slug}`)
    }

    await revalidate(response, paths)
  },
  'api::demo.demo': async function (body, response) {
    const paths = [`/sitemap`, `/demos`, `/jp/demos`]

    if (body?.entry?.Link) {
      paths.push(`/demos/${body.entry.Link}`)
      paths.push(`/jp/demos/${body.entry.Link}`)
    }

    await revalidate(response, paths)
  },
  'api::event.event': async function (body, response) {
    const paths = [`/sitemap`, `/company/events`, `/learn`]

    if (body?.entry?.slug) {
      paths.push(`/company/events/${body.entry.slug}`)
      paths.push(`/company/events/${body.entry.slug}/thank-you`)
    }

    await revalidate(response, paths)
  },
  'api::individual-use-case.individual-use-case': async function (
    body,
    response
  ) {
    const paths = [`/use-cases`, `/jp/use-cases`]
    await revalidate(response, paths)
  },
  'api::integration.integration': async function (body, response) {
    const paths = [`/sitemap`, `/integrations`, `/jp/integrations`]

    if (body?.entry?.slug) {
      paths.push(`/integrations/${body.entry.slug}`)
      paths.push(`/jp/integrations/${body.entry.slug}`)
    }

    await revalidate(response, paths)
  },
  'api::marketing-video.marketing-video': async function (body, response) {
    const paths = [`/sitemap`, `/videos`, `/jp/videos`, `/clickhouse`]

    if (body?.entry?.Slug) {
      paths.push(`/videos/${body.entry.Slug}`)
      paths.push(`/jp/videos/${body.entry.Slug}`)
    }

    // Revalidate open house page because it uses tagged content
    paths.push('/openhouse')

    await revalidate(response, paths)
  },
  'api::marketing-videos-category.marketing-videos-category': async function (
    body,
    response
  ) {
    const paths = [`/videos`, `/jp/videos`]
    await revalidate(response, paths)
  },
  'api::pricing-per-region.pricing-per-region': async function (
    body,
    response
  ) {
    // const paths = [`/pricing`, `/jp/pricing`]
    // await revalidate(response, paths)
  },
  'api::pricing-plan.pricing-plan': async function (body, response) {
    // const paths = [`/pricing`, `/jp/pricing`]
    // await revalidate(response, paths)
  },
  'api::page.page': async function (body, response) {
    const paths = [`/sitemap`]

    if (body?.entry?.path) {
      paths.push(`/${body.entry.path}`)
    }

    await revalidate(response, paths)
  },
  'api::use-case-quote.use-case-quote': async function (body, response) {
    const paths = [`/use-cases`, `/jp/use-cases`]
    await revalidate(response, paths)
  },
  'api::user-story.user-story': async function (body, response) {
    const paths = [`/user-stories`]
    await revalidate(response, paths)
  },
  'api::openhouse.openhouse': async function (body, response) {
    const paths: Array<string> = ['/openhouse']

    if (body?.entry?.slug) {
      paths.push(`/openhouse/${body.entry.slug}`)
    }

    await revalidate(response, paths)
  },
  'api::openhouse-speaker.openhouse-speaker': async function (body, response) {
    const paths: Array<string> = []

    const data: Array<Pick<OpenhouseEntry, 'slug'>> = await fetchAll(
      'openhouses',
      {
        fields: ['slug']
      }
    )

    if (data) {
      data.forEach((page) => {
        paths.push(`/openhouse/${page.slug}`)
      })
    }

    await revalidate(response, paths)
  },
  'api::resource.resource': async function (body, response) {
    const paths: Array<string> = ['/resources']

    if (body?.entry?.category?.slug && body?.entry?.slug) {
      paths.push(`/resources/${body.entry.category.slug}`)
      paths.push(`/resources/${body.entry.category.slug}/${body.entry.slug}`)
    }

    await revalidate(response, paths)
  },
  'api::resource-category.resource-category': async function (body, response) {
    const paths: Array<string> = ['/resources']

    if (body?.entry?.slug) {
      paths.push(`/resources/${body.entry.slug}`)

      const categoryResources = await resourcesService.findAll({
        fields: ['slug'],
        populate: [], // Disables relationship populating which isn't needed here
        filters: {
          category: {
            slug: {
              $eq: body.entry.slug
            }
          }
        }
      })
      categoryResources.forEach((resource) => {
        paths.push(`/resources/${body.entry.slug}/${resource.slug}`)
      })
    }

    await revalidate(response, paths)
  },

  /**
   * -----
   * Single types
   * -----
   */
  'api::blog.blog': async function (body, response) {
    const paths: Array<string> = [
      /*`/blog`, `/jp/blog`*/
    ]

    const blogs = await blogService.findAll({
      filters: {
        $or: [
          {
            ShowCloudCTAHeader: {
              $eq: true
            }
          },
          {
            ShowCloudCTAFooter: {
              $eq: true
            }
          },
          {
            enableSidebarGlobalCta: {
              $eq: true
            }
          }
        ]
      },
      fields: ['slug', 'category'],
      populate: []
    })

    if (blogs) {
      blogs.forEach((post) => {
        if (post.category === 'Japanese') {
          paths.push(`/jp/blog/${post.slug}`)
        } else {
          paths.push(`/blog/${post.slug}`)
        }
      })
    }

    await revalidate(response, paths)
  },
  'api::career.career': async function (body, response) {
    const paths = [`/company/careers`]
    await revalidate(response, paths)
  },
  'api::click-house.click-house': async function (body, response) {
    const paths = [`/clickhouse`, `/jp/clickhouse`]
    await revalidate(response, paths)
  },
  'api::cloud.cloud': async function (body, response) {
    const paths = [`/cloud`, `/jp/cloud`]
    await revalidate(response, paths)
  },
  'api::contact-us.contact-us': async function (body, response) {
    const paths = [
      `/company/contact`,
      `/jp/company/contact`,
      `/air-gapped`,
      `/big-data-frankfurt`,
      `/trial-extension`,
      `/comparison/doublecloud`,
      `/comparison/imply`,
      `/comparison/rockset`,
      `/current2024`,
      `/pricing/contact`,
      `/jp/pricing/contact`,
      `/kickoff-current-happy-hour`,
      `/partners/deal-registration`
    ]
    await revalidate(response, paths)
  },
  'api::use-case.use-case': async function (body, response) {
    const paths = [`/user-stories`]
    await revalidate(response, paths)
  },
  'api::demos-page.demos-page': async function (body, response) {
    const paths = [`/demos`, `/jp/demos`]
    await revalidate(response, paths)
  },
  'api::footer.footer': async function (body, response) {
    // @todo revalidate all pages
  },
  'api::getting-started.getting-started': async function (body, response) {
    // @todo revalidate all pages
  },
  'api::homepage.homepage': async function (body, response) {
    const paths = [
      `/`,
      `/learn`,
      `/learn/certification`,
      ...learnPages.map((page) => `/learn/${page.slug}`),
      `/monitorama-2023`,
      `/launch-week/may-2024`,
      `/industries/gaming`,
      `/use-cases/machine-learning-and-data-science`,
      `/use-cases/data-warehousing`,
      `/use-cases/observability`,
      `/use-cases/real-time-analytics`,
      `/partners/azure`,
      `/comparison/doublecloud`,
      `/comparison/bigquery`,
      `/comparison/bigquery/costs`,
      `/comparison/bigquery/performance`,
      `/comparison/snowflake`,
      `/comparison/rockset`,
      `/comparison/imply`,
      `/campaigns/bigquery-to-clickhouse-on-aws`,
      `/jp`,
      `/jp/use-cases/machine-learning-and-data-science`,
      `/jp/use-cases/business-intelligence`,
      `/jp/use-cases/logging-and-metrics`,
      `/jp/use-cases/real-time-analytics`,
      `/jp/comparison/bigquery`,
      `/jp/comparison/snowflake`,
      `/real-time-data-warehouse`
    ]
    await revalidate(response, paths)
  },
  'api::news-and-event.news-and-event': async function (body, response) {
    const paths = [`/sitemap`, `/company/events`, `/company/news`]
    await revalidate(response, paths)
  },
  'api::news-item.news-item': async function (body, response) {
    const paths: Array<string> = ['/company/news']
    await revalidate(response, paths)
  },
  'api::newsletter-form.newsletter-form': async function (body, response) {
    // @todo revalidate all blogs, jp blogs, demos
  },
  'api::our-story.our-story': async function (body, response) {
    const paths = [`/company/our-story`, `/jp/company/our-story`]
    await revalidate(response, paths)
  },
  'api::pricing.pricing': async function (body, response) {
    // const paths = [`/pricing`, `/jp/pricing`]
    // await revalidate(response, paths)
  },
  'api::pricing-v2.pricing-v2': async function (body, response) {
    // const paths = [`/pricing`, `/jp/pricing`]
    // await revalidate(response, paths)
  },
  'api::service-unavailable-country.service-unavailable-country':
    async function (body, response) {
      const paths = [`/service-unavailable-country`]
      await revalidate(response, paths)
    },
  'api::use-case-feature.use-case-feature': async function (body, response) {
    const paths = [`/use-cases`, `/jp/use-cases`]
    await revalidate(response, paths)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Authorize request
  if (!isAuthorisedRevalidationRequest(req)) {
    return res.status(403).send('Unauthorized')
  }

  // Validate request method
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  // Handle revalidation based on strapi UID
  const body = req.body
  console.log('Revalidation request', body)
  if (body?.uid && CONTENT_TYPE_HANDLERS.hasOwnProperty(body.uid)) {
    // Send and forget revalidation requests, no need to wait
    waitUntil(CONTENT_TYPE_HANDLERS[body.uid](body, res, req))

    // Return success response to webhook sender
    return res.json({ revalidated: true })
  }

  return res.json({ revalidated: false })
}
