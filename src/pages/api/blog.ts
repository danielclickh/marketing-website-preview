import { findAll, getStagingOnlyFilters } from '@/lib/api/strapi'
import { BlogApiResponse } from '@/types/blogs'
import type { NextApiRequest, NextApiResponse } from 'next'

const baseQuery: Record<string, any> = {
  sort: ['date:DESC', 'publishedAt:DESC'],
  populate: ['author', 'author.avatarPng', 'thumbnailPng'],
  fields: [
    'category',
    'title',
    'shortDescription',
    'createdAt',
    'updatedAt',
    'publishedAt',
    'slug',
    'date',
    'StagingOnly',
    'ListOnBlogs'
  ],
  filters: {
    $and: [{ category: { $ne: 'japanese' } }, { $or: getStagingOnlyFilters() }]
  }
}

export async function fetchCategories(): Promise<Record<string, string>> {
  return {
    product: 'Product',
    community: 'Community',
    engineering: 'Engineering',
    'user-stories': 'User stories',
    'company-and-culture': 'Company and culture'
  }
}

export async function fetchBlogs({
  page = 1,
  category = null,
  search = null
}: {
  page?:
    | undefined
    | null
    | string
    | string[]
    | BlogApiResponse['pagination']['page']
  category?:
    | undefined
    | null
    | string
    | string[]
    | BlogApiResponse['params']['category']
  search?:
    | undefined
    | null
    | string
    | string[]
    | BlogApiResponse['params']['search']
}): Promise<BlogApiResponse> {
  // Get and validate the paginated page number
  page = Number(page)
  page = isNaN(page) ? 1 : page
  page = page < 1 ? 1 : page

  const categories = await fetchCategories()

  // Validate the category param
  category = category ? String(category) : null
  category = category && category in categories ? category : null

  // Validate the search param
  search = search ? String(search) : null
  search = search && search.trim() ? search : null

  const { data: featuredBlog } = await findAll('blog-posts', {
    ...baseQuery,
    pagination: { limit: 1 }
  })

  const query = structuredClone(baseQuery)

  // Excluded featured blog from query
  if (featuredBlog[0]) {
    query.filters.$and.push({
      slug: {
        $ne: featuredBlog[0].slug
      }
    })
  }

  // Apply category filters
  if (category) {
    query.filters.$and.push({
      category: {
        $eq: categories[category]
      }
    })
  }

  // Apply search filters
  if (search) {
    query.filters.$and.push({
      $or: [
        {
          title: {
            $containsi: search
          }
        },
        {
          content: {
            $containsi: search
          }
        },
        {
          keywords: {
            $containsi: search
          }
        },
        {
          author: {
            name: {
              $containsi: search
            }
          }
        },
      ]
    })
  }

  // Get paginated blog posts
  const { data, pagination } = await findAll('blog-posts', {
    ...query,
    pagination: { pageSize: 15, page: page }
  })

  return {
    data: {
      featured: featuredBlog[0],
      blogs: data,
      categories
    },
    params: {
      search,
      category
    },
    pagination
  }
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let { page = 1, category = null, search = null } = request.query

  const responseBody = await fetchBlogs({
    page,
    category,
    search
  })

  response.status(200).json(responseBody)
}
