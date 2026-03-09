import { findAll } from '@/lib/api/strapi'
import { slugify } from '@/lib/utils/strings'
import { VideosApiResponse } from '@/types/videos'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function fetchVideoCategories() {
  const response = await findAll('marketing-videos-categories', {
    sort: ['CategoryName:ASC']
  })
  const data = response.data as Array<{ id: number; CategoryName: string }>
  const categories: Record<string, string> = {}

  data.forEach((cat) => {
    categories[slugify(cat.CategoryName)] = cat.CategoryName
  })

  return categories
}

export async function fetchVideos({
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
    | VideosApiResponse['pagination']['page']
  category?:
    | undefined
    | null
    | string
    | string[]
    | VideosApiResponse['params']['category']
  search?:
    | undefined
    | null
    | string
    | string[]
    | VideosApiResponse['params']['search']
  locale?: undefined | null | string | string[]
}): Promise<VideosApiResponse> {
  const categories = await fetchVideoCategories()

  // Get and validate the paginated page number
  page = Number(page)
  page = isNaN(page) ? 1 : page
  page = page < 1 ? 1 : page

  // Validate the category param
  category = category ? String(category) : null
  category = category && category in categories ? category : null

  // Validate the search param
  search = search ? String(search) : null
  search = search && search.trim() ? search : null

  // Validate the locale param
  locale = locale ? String(locale) : null
  locale = locale && locale.trim() ? locale : null

  const baseQuery: Record<string, any> = {
    sort: ['VideoDate:DESC', 'publishedAt:DESC'],
    populate: ['categories', 'seo', 'seo.image'],
    filters: {
      //$or: getStagingOnlyFilters() // Not used on videos
      $and: []
    }
  }

  // Include/exclude japanese blogs
  baseQuery.filters.$and.push({
    language: { $eq: locale === 'jp' ? 'Japanese' : 'English' }
  })

  const query = structuredClone(baseQuery)

  // Apply category filters
  if (category) {
    query.filters.$and.push({
      categories: {
        CategoryName: {
          $eq: categories[category]
        }
      }
    })
  }

  // Apply search filters
  if (search) {
    query.filters.$and.push({
      $or: [
        {
          Title: {
            $containsi: search
          }
        },
        {
          IntroText: {
            $containsi: search
          }
        },
        {
          Description: {
            $containsi: search
          }
        }
      ]
    })
  }

  // Get paginated blog posts
  const { data, pagination } = await findAll('marketing-videos', {
    ...query,
    pagination: { pageSize: 15, page: page }
  })

  return {
    data: {
      videos: data,
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

  const responseBody = await fetchVideos({
    page,
    category,
    search,
    locale
  })

  response.status(200).json(responseBody)
}
