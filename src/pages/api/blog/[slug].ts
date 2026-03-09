import { strapiDynamicBlogModulesMarkdown } from '@/components-cleaned/StrapiDynamicBlogModules'
import {
  blogService,
  getAbsoluteMediaUrl,
  getProxiedMediaUrl,
  isAuthorisedRevalidationRequest
} from '@/lib/api/strapi'
import { interleaveWithLast } from '@/lib/utils/arrays'
import { escapeForRegex } from '@/lib/utils/strings'
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

  const blog = await blogService.findOne({
    filters: {
      slug: {
        $eq: slug
      }
    }
  })

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

  let authorName = blog.author?.name || null

  if (blog.author?.profiles) {
    authorName = interleaveWithLast(
      blog.author.profiles.map((author) => author.name),
      ', ',
      ' and '
    ).join('')
  }

  const frontMatter = Object.entries({
    title: blog.title,
    date: blog.publishedAt,
    author: authorName,
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
    blog.sections.forEach((section) => {
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

  // Make absolute CMS upload urls relative
  // e.g. https://cms.clickhouse-dev.com/uploads -> /uploads
  md = md.replaceAll(
    new RegExp(escapeForRegex(getAbsoluteMediaUrl('/uploads')), 'gi'),
    '/uploads'
  )

  // Make relative upload urls absolute proxied
  // e.g. /uploads/image.png -> https://clickhouse.com/uploads/image.png
  md = md.replaceAll(
    /\!\[([^\]]*)\]\((\/uploads\/[^\)]*)\)/g,
    (substring, alt, src) => {
      return substring.replace(src, getProxiedMediaUrl(src))
    }
  )

  return response.status(200).send(md)
}
