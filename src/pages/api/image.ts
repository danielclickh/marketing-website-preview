import { findImageDetails } from '@/lib/api/strapi'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const url = request.query.url as string
  const data = await findImageDetails(url)
  response.status(200).json(data)
}
