import type { NextApiRequest, NextApiResponse } from 'next'

const log = (...params: any[]) => {
  console.log('Revalidation webhook:', ...params)
}

// strapi UID => revalidation callback
const CONTENT_TYPE_HANDLERS: Record<
  string,
  (body: any, response: NextApiResponse) => Promise<void>
> = {
  'api::blog-post.blog-post': async function (body, response) {
    if (body?.entry?.slug) {
      const uri = `/blog/${body.entry.slug}`
      log(uri)
      await response.revalidate(uri)
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
    !req.headers?.authorization ||
    req.headers.authorization !== webhookToken
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
