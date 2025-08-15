import type { NextApiRequest, NextApiResponse } from 'next'

async function fetchJson<T>(url: string, init?: RequestInit) {
  const res = await fetch(url, { next: { revalidate: 60 }, ...init })
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

function youtubeUrls(id: string) {
  // Ordered largest → smallest
  // Includes both img.youtube.com and i.ytimg.com variants (they’re mirrors)
  const bases = ['https://img.youtube.com', 'https://i.ytimg.com']
  const paths = [
    `/vi/${id}/maxresdefault.jpg`,
    `/vi/${id}/sddefault.jpg`,
    `/vi/${id}/hqdefault.jpg`,
    `/vi/${id}/mqdefault.jpg`,
    `/vi/${id}/default.jpg`
  ]
  // flatten bases × paths; de-dupe later
  return bases.flatMap((b) => paths.map((p) => `${b}${p}`))
}

async function vimeoFromPlayerConfig(id: string, req: NextApiRequest) {
  // Forward the user's Referer so Vimeo recognizes your domain as an allowed embed origin.
  const referer = req.headers.referer || undefined

  type PlayerConfig = {
    video?: {
      thumbs?: Record<string, string> // keys like "640", "960", "1280", "base"
    }
  }

  const config = await fetchJson<PlayerConfig>(
    `https://player.vimeo.com/video/${id}/config`,
    {
      headers: referer ? { Referer: referer } : undefined
    }
  )

  const thumbs = config?.video?.thumbs
  if (!thumbs) return []

  // Sort widths descending; keep "base" (unknown size) at the end.
  const ordered = Object.entries(thumbs)
    .map(([k, url]) => ({
      w: Number.isFinite(Number(k)) ? Number(k) : -1,
      url
    }))
    .sort((a, b) => b.w - a.w)
    .map(({ url }) => url)

  return Array.from(new Set(ordered))
}

async function vimeoFromPublicApis(id: string) {
  const urls: string[] = []

  // 1) Simple API v2 (no auth). Some privacy settings block this (404).
  try {
    type V2 = Array<{
      thumbnail_small?: string
      thumbnail_medium?: string
      thumbnail_large?: string
    }>
    const data = await fetchJson<V2>(
      `https://vimeo.com/api/v2/video/${id}.json`
    )
    const v = data?.[0]
    if (v?.thumbnail_large) urls.push(v.thumbnail_large)
    if (v?.thumbnail_medium) urls.push(v.thumbnail_medium)
    if (v?.thumbnail_small) urls.push(v.thumbnail_small)
  } catch {
    // ignore → try oEmbed
  }

  // 2) oEmbed (often one medium-ish image). Also blocked for embed-only sometimes.
  if (urls.length === 0) {
    try {
      const oembed = await fetchJson<{ thumbnail_url?: string }>(
        `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
          `https://vimeo.com/${id}`
        )}`
      )
      if (oembed.thumbnail_url) urls.push(oembed.thumbnail_url)
    } catch {
      // still empty → return []
    }
  }

  return Array.from(new Set(urls))
}

async function vimeoUrls(id: string, req: NextApiRequest) {
  let urls: Array<string> = []
  // Try player config FIRST (works for embed-only when Referer is allowed)
  try {
    urls = await vimeoFromPlayerConfig(id, req)
  } catch {
    urls = []
  }
  // Fall back to public APIs if needed
  if (urls.length === 0) {
    urls = await vimeoFromPublicApis(id)
  }

  return urls
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id, provider } = request.query

  if (!id || typeof id !== 'string') {
    return response.status(400).json({ error: 'Missing video id' })
  }
  if (provider !== 'youtube' && provider !== 'vimeo') {
    return response.status(400).json({ error: 'Invalid provider' })
  }

  try {
    let urls = []
    switch (provider) {
      case 'youtube':
        urls = youtubeUrls(id)
        break
      case 'vimeo':
        urls = await vimeoUrls(id, request)
        break
    }
    return response
      .status(200)
      .json({ provider, id, urls: Array.from(new Set(urls)) })
  } catch (e: any) {
    return response
      .status(500)
      .json({ error: e?.message ?? 'Failed to fetch thumbnails' })
  }
}
