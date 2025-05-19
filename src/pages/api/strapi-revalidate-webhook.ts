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
    console.log('Revalidation webhook:', uri)
    promises.push(response.revalidate(uri))
  })

  return await Promise.all(promises)
}

// strapi UID => revalidation callback
const CONTENT_TYPE_HANDLERS: Record<
  string,
  (body: any, response: NextApiResponse) => Promise<void>
> = {
  'api::blog-post.blog-post': async function (body, response) {
    const paths = ['/sitemap']

    if (body?.entry?.slug) {
      paths.push(`/blog/${body.entry.slug}`)
      paths.push(`/jp/blog/${body.entry.slug}`)
    }

    await revalidate(response, paths)
  },
  'api::marketing-video.marketing-video': async function (body, response) {
    const paths = ['/sitemap']

    if (body?.entry?.Slug) {
      paths.push(`/videos/${body.entry.Slug}`)
    }

    await revalidate(response, paths)
  },
  'api::rich-content-page.rich-content-page': async function (body, response) {
    const paths = ['/sitemap']

    if (body?.entry?.url) {
      paths.push(`${body.entry.url}`)
    }

    await revalidate(response, paths)
  },
  'api::demo.demo': async function (body, response) {
    const paths = [`/demos`, `/jp/demos`]

    if (body?.entry?.Link) {
      paths.push(`/demos/${body.entry.Link}`)
      paths.push(`/jp/demos/${body.entry.Link}`)
    }

    await revalidate(response, paths)
  },
  'api::comparison.comparison': async function (body, response) {
    const paths = ['/sitemap']

    if (body?.entry?.slug) {
      paths.push(`/comparison/${body.entry.slug}`)
    }

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
  'api::user-story.user-story': async function (body, response) {
    await revalidate(response, `/user-stories`)
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
    await CONTENT_TYPE_HANDLERS[body.uid](body, res)
    return res.json({ revalidated: true })
  }

  return res.json({ revalidated: false })
}
