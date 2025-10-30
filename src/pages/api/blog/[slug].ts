import { strapiDynamicBlogModulesMarkdown } from '@/components-cleaned/StrapiDynamicBlogModules'
import {
  findAll,
  getProxiedMediaUrl,
  getStagingOnlyFilters,
  isAuthorisedRevalidationRequest
} from '@/lib/api/strapi'
import { BlogProps } from '@/types/blog'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { slug, force } = request.query as {
    slug: string
    force?: string
  }

  const forceRevalidate =
    force === 'true' && isAuthorisedRevalidationRequest(request)

  const { data } = await findAll('blog-posts', {
    filters: {
      slug: {
        $eq: slug
      },
      $or: getStagingOnlyFilters()
    },
    populate: 'deep',
    pagination: { limit: 1 }
  })

  const blog = data?.[0]

  // Serve the right content type
  response.setHeader('Content-Type', 'text/markdown; charset=utf-8')

  // 1) Force path: bypass CDN and do NOT store this response.
  if (forceRevalidate) {
    response.setHeader('Vercel-CDN-Cache-Control', 'no-store')
    response.setHeader('CDN-Cache-Control', 'no-store')
    response.setHeader('Cache-Control', 'no-store, max-age=0') // for any intermediaries/browsers
  }

  // 2) Normal path: cache at the CDN "forever" (or long) until you manually update it
  else {
    response.setHeader(
      'Vercel-CDN-Cache-Control',
      'public, s-maxage=31536000, stale-while-revalidate'
    )
    response.setHeader(
      'CDN-Cache-Control',
      'public, s-maxage=31536000, stale-while-revalidate'
    )
    response.setHeader('Cache-Control', 'max-age=0, must-revalidate') // browsers don't cache
  }

  if (!blog) {
    return response.status(404).send('Blog not found')
  }

  const frontMatter = Object.entries({
    title: blog.title,
    date: blog.publishedAt,
    author: blog.author.name,
    category: blog.category,
    excerpt: blog.shortDescription
  })
    .map(([key, value]) => {
      if (value && String(value).trim().length) {
        return `${key}: "${value.replaceAll('"', '\\"')}"`
      }
      return null
    })
    .filter((value) => value !== null)

  // Each line will be joined with `\n\n`
  let lines: Array<string> = []

  // Add front matter values
  if (frontMatter.length) {
    lines.push(`---
${frontMatter.join('\n')}
---`)
  }

  // Add H1
  lines.push(`# ${blog.title}`)

  // Add blog builder sections
  if (blog.sections) {
    ;(blog.sections as BlogProps['sections']).forEach((section) => {
      const md = strapiDynamicBlogModulesMarkdown(section)
      if (md) {
        lines.push(md)
      }
    })
  }

  // Finally, add our standard markdown field value
  if (blog.content) {
    lines.push(blog.content)
  }

  let md = lines.join('\n\n')

  // Make relative upload urls absolute
  // e.g. /uploads/image.png -> https://clickhouse.com/uploads/image.png
  md = md.replaceAll(
    /\!\[([^\]]*)\]\((\/uploads\/[^\)]*)\)/g,
    (substring, alt, src) => {
      return substring.replace(src, getProxiedMediaUrl(src))
    }
  )

  return response.status(200).send(md)
}
