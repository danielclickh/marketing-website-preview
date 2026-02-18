import { globalAnnouncementsService, request } from '@/lib/api/strapi'
import { absoluteUrl } from '@/lib/next'
import { EntryGlobalAnnouncement } from '@/types/strapi'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const visitorCountry = ((req.query.country as string) || '')
    .trim()
    .toUpperCase()

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  )

  try {
    const entries = await globalAnnouncementsService.findAll({
      sort: ['publishedAt:desc']
    })

    if (!entries || !entries.length) {
      return res.json({})
    }

    // Country-specific match takes priority over global
    let match: EntryGlobalAnnouncement | undefined

    if (visitorCountry) {
      match = entries.find((e) => {
        if (!e.country) return false
        const codes = e.country.split(',').map((c) => c.trim().toUpperCase())
        return codes.includes(visitorCountry)
      })
    }

    if (!match) {
      match = entries.find((e) => !e.country)
    }

    if (!match) {
      return res.json({})
    }

    const url = new URL(absoluteUrl(match.url))

    // Add default loc param if not already defined
    if (!url.searchParams.has('loc')) {
      url.searchParams.set('loc', 'banner')
    }

    return res.json({ text: match.text, url: url.toString() })
  } catch (err) {
    console.error('Failed to fetch global announcement:', err)
    return res.json({})
  }
}
