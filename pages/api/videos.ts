import type { NextApiRequest, NextApiResponse } from 'next'
import { findAll, getStagingOnlyFilters } from '../../lib/api/strapi'
import { slugify } from '../../lib/utils/strings'
import { VideosApiResponse } from '../../types/videos'

const baseQuery: Record<string, any> = {
  sort: ['VideoDate:DESC', 'publishedAt:DESC'],
  populate: ['categories', 'RelatedVideos', 'seo', 'seo.image'],
  filters: {
    //$or: getStagingOnlyFilters() // Not used on videos
  }
}

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
  search = null
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

  const query = structuredClone(baseQuery)

  // Apply category filters
  if (category) {
    query.filters.categories = {
      CategoryName: {
        $eq: categories[category]
      }
    }
  }

  // Apply search filters
  if (search) {
    query.filters.Title = {
      $containsi: search
    }
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
    pagination
  }
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let { page = 1, category = null, search = null } = request.query

  const responseBody = await fetchVideos({
    page,
    category,
    search
  })

  response.status(200).json(responseBody)
}
