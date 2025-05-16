import type { NextApiRequest, NextApiResponse } from 'next'

const revalidate = async (response: NextApiResponse, uri: string) => {
  console.log('Revalidation webhook:', uri)
  await response.revalidate(uri)
}

// strapi UID => revalidation callback
const CONTENT_TYPE_HANDLERS: Record<
  string,
  (body: any, response: NextApiResponse) => Promise<void>
> = {
  'api::blog-post.blog-post': async function (body, response) {
    if (body?.entry?.slug) {
      const en = revalidate(response, `/blog/${body.entry.slug}`)
      const jp = revalidate(response, `/jp/blog/${body.entry.slug}`)
      await Promise.all([en, jp])
    }
  },
  'api::marketing-video.marketing-video': async function (body, response) {
    if (body?.entry?.Slug) {
      await revalidate(response, `/videos/${body.entry.Slug}`)
    }
  },
  'api::rich-content-page.rich-content-page': async function (body, response) {
    if (body?.entry?.url) {
      await revalidate(response, `${body.entry.url}`)
    }
  },
  'api::demo.demo': async function (body, response) {
    if (body?.entry?.Link && !body?.entry?.External) {
      await revalidate(response, `/demo/${body.entry.Link}`)
    }
  },
  'api::comparison.comparison': async function (body, response) {
    if (body?.entry?.slug) {
      await revalidate(response, `/comparison/${body.entry.slug}`)
    }
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
