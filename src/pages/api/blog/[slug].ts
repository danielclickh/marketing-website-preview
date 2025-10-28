import { strapiDynamicBlogModulesMarkdown } from '@/components-cleaned/StrapiDynamicBlogModules'
import { findAll, getStagingOnlyFilters } from '@/lib/api/strapi'
import { BlogProps } from '@/types/blog'
import type { NextApiRequest, NextApiResponse } from 'next'

async function getMarkdown(slug: string) {
  return `# ${slug}\n\nThis is **Markdown**.\n`
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { slug } = request.query as { slug: string }

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

  // Let Vercel’s CDN cache and revalidate in the background
  // (use CDN-Cache-Control so s-maxage/SWR are respected by the CDN)
  response.setHeader(
    'CDN-Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate'
  )

  if (!blog) {
    return response.status(404).send('Blog not found')
  }

  let lines: Array<string> = [`# ${blog.title}`]

  if (blog.sections) {
    ;(blog.sections as BlogProps['sections']).forEach((section) => {
      const md = strapiDynamicBlogModulesMarkdown(section)
      if (md) {
        lines.push(md)
      }
    })
  }

  if (blog.content) {
    lines.push(blog.content)
  }

  return response.status(200).send(lines.join('\n\n'))
}
