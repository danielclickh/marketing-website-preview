import { blogService } from '@/lib/api/strapi'
import { BlogApiResponse } from '@/types/blogs'
import type { NextApiRequest, NextApiResponse } from 'next'

const baseQuery: Record<string, any> = {
  sort: ['date:DESC', 'publishedAt:DESC'],
  populate: [
    'author',
    'author.avatarPng',
    'thumbnailPng',
    'author.profiles',
    'author.profiles.avatar'
  ],
  fields: [
    'category',
    'title',
    'shortDescription',
    'createdAt',
    'updatedAt',
    'publishedAt',
    'slug',
    'date',
    'reading_time',
    'reading_time_override'
  ],
  filters: {
    $and: [
      {
        $or: [{ ListOnBlogs: { $null: true } }, { ListOnBlogs: { $eq: true } }]
      }
    ]
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
  search = null,
  locale
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
  locale?: undefined | null | string | string[]
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

  // Validate the locale param
  locale = locale ? String(locale) : null
  locale = locale && locale.trim() ? locale : null

  // Remove JP blogs from standard query
  if (locale === 'jp') {
    baseQuery.filters.$and.push({
      category: { $eq: 'Japanese' }
    })
  } else if (!category) {
    baseQuery.filters.$and.push({
      category: { $ne: 'Japanese' }
    })
  }

  const featuredBlog = await blogService.findOne(baseQuery)

  const query = structuredClone(baseQuery)

  // Excluded featured blog from query
  if (featuredBlog) {
    query.filters.$and.push({
      slug: {
        $ne: featuredBlog.slug
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
        {
          author: {
            profiles: {
              name: {
                $containsi: search
              }
            }
          }
        }
      ]
    })
  }

  // Get paginated blog posts
  const { data, pagination } = await blogService.findMany(
    {
      ...query,
      pagination: { pageSize: 15, page: page }
    },
    true
  )

  return {
    data: {
      featured: featuredBlog || null,
      blogs: data,
      categories
    },
    params: {
      search,
      category
    },
    pagination: pagination || {
      page: 1,
      pageSize: 1,
      pageCount: 1,
      total: 1
    }
  }
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let {
    page = 1,
    category = null,
    search = null,
    locale = null
  } = request.query

  const responseBody = await fetchBlogs({
    page,
    category,
    search,
    locale
  })

  response.status(200).json(responseBody)
}
