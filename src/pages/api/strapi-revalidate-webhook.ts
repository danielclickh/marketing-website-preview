import { fetchAll, getStagingOnlyFilters } from '@/lib/api/strapi'
import type { NextApiRequest, NextApiResponse } from 'next'

const revalidate = async (
  response: NextApiResponse,
  uris: Array<string> | string
) => {
  if (!Array.isArray(uris)) {
    uris = [uris]
  }

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
  (body: any, response: NextApiResponse) => Promise<void>
> = {
  /**
   * -----
   * Collection types
   * -----
   */
  'api::blog-post.blog-post': async function (body, response) {
    const paths = [`/sitemap` /*`/blog`*/]

    if (body?.entry?.slug) {
      paths.push(`/blog/${body.entry.slug}`)
      paths.push(`/jp/blog/${body.entry.slug}`)
    }

    // Revalidate open house page because it uses tagged content
    paths.push('/openhouse')

    await revalidate(response, paths)
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
    const paths = [`/sitemap`, `/company/events`]

    if (body?.entry?.slug) {
      paths.push(`/company/events/${body.entry.slug}`)
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
    const paths = [`/sitemap`, `/videos`, `/jp/videos`]

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
  'api::rich-content-page.rich-content-page': async function (body, response) {
    const paths = [`/sitemap`]

    if (body?.entry?.url) {
      paths.push(`${body.entry.url}`)
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

  /**
   * -----
   * Single types
   * -----
   */
  'api::blog.blog': async function (body, response) {
    const paths: Array<string> = [
      /*`/blog`, `/jp/blog`*/
    ]

    const data = await fetchAll('blog-posts', {
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
          }
        ]
      },
      fields: ['slug', 'category']
    })

    if (data) {
      data.forEach((post) => {
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
  const webhookToken = process.env.STRAPI_WEBHOOK_TOKEN
  if (
    !webhookToken ||
    !req.headers?.['isr-auth-token'] ||
    req.headers['isr-auth-token'] !== webhookToken
  ) {
    return res.status(403).send('Unauthorized')
  }

  // Validate request method
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  // Handle revalidation based on strapi UID
  const body = req.body
  if (body?.uid && CONTENT_TYPE_HANDLERS.hasOwnProperty(body.uid)) {
    try {
      await CONTENT_TYPE_HANDLERS[body.uid](body, res)
      return res.json({ revalidated: true })
    } catch (error) {
      console.log('Revalidate error', error)
      return res.status(500).send('Error revalidating')
    }
  }

  return res.json({ revalidated: false })
}
