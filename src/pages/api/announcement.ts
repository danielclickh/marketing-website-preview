import { request } from '@/lib/api/strapi'
import type { NextApiRequest, NextApiResponse } from 'next'

interface AnnouncementEntry {
  text: string
  url: string
  global: boolean
  country: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const visitorCountry = (
    (req.query.country as string) || ''
  )
    .trim()
    .toUpperCase()

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  )

  try {
    const { data } = await request('global-announcements', {
      filters: { enabled: { $eq: true } },
      fields: ['text', 'url', 'global', 'country'],
      publicationState: 'live'
    })

    if (!data || !data.length) {
      return res.json({})
    }

    const entries: AnnouncementEntry[] = data.map((entry: any) => ({
      text: entry.attributes?.text ?? entry.text,
      url: entry.attributes?.url ?? entry.url,
      global: entry.attributes?.global ?? entry.global ?? true,
      country: entry.attributes?.country ?? entry.country ?? null
    }))

    // Country-specific match takes priority over global
    let match: AnnouncementEntry | undefined

    if (visitorCountry) {
      match = entries.find((e) => {
        if (e.global || !e.country) return false
        const codes = e.country
          .split(',')
          .map((c) => c.trim().toUpperCase())
        return codes.includes(visitorCountry)
      })
    }

    if (!match) {
      match = entries.find((e) => e.global)
    }

    if (!match) {
      return res.json({})
    }

    const url = new URL(match.url, 'https://clickhouse.com')
    url.searchParams.set('loc', 'banner')

    return res.json({ text: match.text, url: url.toString() })
  } catch (err) {
    console.error('Failed to fetch global announcement:', err)
    return res.json({})
  }
}
