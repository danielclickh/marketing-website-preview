import { PricingV2 } from './types'
import { SeoContainerProps } from '@/components/SeoContainer'
import { absoluteUrl, IS_PRODUCTION, relativeUrl } from '@/lib/next'
import {
  ApiFieldFilter,
  ApiRequestParams,
  ApiResponse,
  ComponentSeo,
  EntryAuthor,
  EntryBlogPost,
  EntryEvent,
  EntryMarketingVideo,
  EntryPage,
  EntryResource,
  EntryResourceCategory
} from '@/types/strapi'
import crypto from 'crypto'
import type { NextApiRequest } from 'next'
import pLimit from 'p-limit'
import { stringify } from 'qs'

const limit = pLimit(5)

const memoryCache = new Map()

const strapiApiUrl =
  process.env.STRAPI_API_URL ?? 'https://cms.clickhouse-dev.com:1337'
const url = `${strapiApiUrl}/api/`

export function getStagingOnlyFilters(
  fieldName: string = 'StagingOnly'
): Array<Record<string, any>> {
  const filter = IS_PRODUCTION ? { $eq: false } : { $eq: true }
  return [
    { [fieldName]: { $null: true } },
    { [fieldName]: filter },
    { [fieldName]: { $eq: false } }
  ]
}

export function isAuthorisedRevalidationRequest(request: NextApiRequest) {
  const webhookToken = process.env.STRAPI_WEBHOOK_TOKEN
  return webhookToken && request?.headers?.['isr-auth-token'] === webhookToken
}

export function getUnlistedFilters() {
  return [{ unlisted: { $null: true } }, { unlisted: { $eq: false } }]
}

export function getAbsoluteMediaUrl(path: string | null = '') {
  if (!path) path = ''

  // In case of already absolute URL
  if (path.startsWith('http') || path.startsWith('//')) {
    return path
  }

  let url = strapiApiUrl
  url = url.replace(/\/$/, '')
  path = path.replace(/^\//, '')
  return `${url}/${path}`
}

export function getRelativeMediaUrl(path: string) {
  path = getAbsoluteMediaUrl(path)

  const base = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || strapiApiUrl

  if (base.trim().length && path.startsWith(base)) {
    path = path.replace(base, '')
    path = path.replace(/^\//, '')
  }

  return path
}

export function getProxiedMediaUrl(path: string) {
  return absoluteUrl(getRelativeMediaUrl(path))
}

export function getProxiedMediaPath(path: string) {
  return relativeUrl(getProxiedMediaUrl(path))
}

export async function request(
  path: string,
  params: Record<any, any> = {},
  options?: RequestInit
): Promise<ApiResponse> {
  const queryString = stringify(params)
  let uri = `${url.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
  if (queryString.length) uri += `?${queryString}`

  const requestInit: RequestInit = {
    next: {
      revalidate: 5
    },
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
    },

    // Merge options
    ...(options || {})
  }

  const hash = crypto
    .createHash('sha1')
    .update(JSON.stringify({ uri, requestInit }))
    .digest('hex')

  // Only return cached responses in build process
  if (
    process.env.NEXT_PHASE === 'phase-production-build' &&
    memoryCache.has(hash)
  ) {
    return memoryCache.get(hash)
  }

  const response = await limit(() => fetch(uri, requestInit))

  if (!response.ok) {
    throw new Error(
      `STRAPI HTTP Error: ${response.status} (${response.statusText}) ${uri}`
    )
  }

  const data = await response.json()

  memoryCache.set(hash, data)

  return data
}

export function cleanStrapiObject(element: any): any {
  const newElement =
    typeof element === 'object' && 'attributes' in element && 'id' in element
      ? { id: element.id, ...element.attributes }
      : element

  if (typeof newElement !== 'object') return element

  const cleaned = Object.entries(newElement).map(([field, value]) => {
    if (Array.isArray(value)) {
      return [field, value.map((item) => cleanStrapiObject(item))]
    }

    if (value && typeof value === 'object') {
      if ('data' in value && Array.isArray(value.data)) {
        return [field, value.data.map((item) => cleanStrapiObject(item))]
      }

      let convertedObj: any = cleanStrapiObject(value)

      if ('data' in convertedObj && Object.keys(convertedObj).length === 1) {
        convertedObj = convertedObj.data
      }

      return [field, convertedObj]
    }

    return [field, value]
  })

  return Object.fromEntries(cleaned)
}

export async function getPathsValues(
  pathName: string,
  obj: Record<string, any>,
  type = 'slug',
  isDynamicUrl = false,
  paramName = 'slug',
  list: any[] = [],
  pageNumber: number = 1
) {
  let newParam = {
    ...obj,
    pagination: {
      page: pageNumber
    }
  }
  const { data, pagination } = await findAll(pathName, newParam)
  const urlList = data.map((page: Record<string, any>) => {
    const slugList = isDynamicUrl
      ? page[type].split('/').filter((slug: string) => slug.length > 0)
      : page[type]
    return {
      params: {
        [paramName]: slugList
      }
    }
  })
  if (pagination && pagination.pageCount > pageNumber) {
    const newPages = await getPathsValues(
      pathName,
      obj,
      type,
      isDynamicUrl,
      pathName,
      urlList,
      pageNumber + 1
    )
    list = list.concat(newPages)
  } else {
    list = list.concat(urlList)
  }

  return list
}

export async function fetchAll(
  pathName: string,
  params: Record<string, any>,
  list: any[] = [],
  pageNumber: number = 1
) {
  let newParam = {
    ...params,
    pagination: {
      page: pageNumber
    }
  }
  const { data, pagination } = await findAll(pathName, newParam)
  if (pagination && pageNumber < pagination.pageCount) {
    const newData = await fetchAll(pathName, params, data, pageNumber + 1)
    list = list.concat(newData)
  } else {
    list = list.concat(data)
  }
  return list
}

export async function findAll(pathName: string, params: Record<string, any>) {
  const { data, meta } = await request(pathName, params)
  const dataList = data.map(cleanStrapiObject)
  return {
    data: dataList,
    pagination: meta.pagination
  }
}

export async function findOne(pathName: string, params: Record<string, any>) {
  const { data } = await request(pathName, params)
  return await cleanStrapiObject(data)
}

export async function findHeader(requestString: string) {
  const headerData = await findOne(requestString, {
    populate: ['seo', 'seo.image']
  })

  return headerData.seo
}

export async function getPricingV2() {
  const response = await findOne('pricing-v2', {
    populate: [
      'plans.*',
      'plans.perks.*',
      'plans.priceList.*',
      'plans.packages.*',
      'providers.*',
      'providers.logo.*',
      'providers.regions.*',
      'providers.regions.icon.*',
      'useCases.*',
      'dataSources.*',
      'dataSources.icon.*'
    ]
  })
  return response as PricingV2
}

export async function findImageDetails(imageUrl: string) {
  const { data } = await request('upload/files', {
    filters: {
      url: {
        $eq: imageUrl
      }
    }
  })
  return data.length > 0 ? data[0] : null
}

class StrapiEntryService<EntryType> {
  constructor(
    private apiUri: string,
    private stagingFilters: boolean | string = false,
    private deepPopulate: boolean = false
  ) {}

  private mergeStagingFilters(params: ApiRequestParams<EntryType>) {
    if (!this.stagingFilters) return params

    const fieldName =
      typeof this.stagingFilters === 'string' ? this.stagingFilters : undefined

    const extra = { $or: getStagingOnlyFilters(fieldName) }
    return {
      ...params,
      filters: params.filters ? { $and: [params.filters, extra] } : extra
    }
  }

  private applyDeepPopulate(params: ApiRequestParams<EntryType>) {
    if (!params.populate && this.deepPopulate) {
      params.populate = 'deep'
    }
    return params
  }

  private modifyParams(params: ApiRequestParams<EntryType>) {
    return this.mergeStagingFilters(this.applyDeepPopulate(params))
  }

  async findOne(params: Omit<ApiRequestParams<EntryType>, 'pagination'> = {}) {
    const result = await this.findMany({
      ...params,
      pagination: {
        page: 1,
        pageSize: 1,
        withCount: false
      }
    })

    return result.pop()
  }

  async findMany<T extends boolean = false>(
    params: ApiRequestParams<EntryType> = {},
    withPagination: T = false as T
  ): Promise<
    T extends true
      ? {
          pagination: ApiResponse['meta']['pagination']
          data: Array<EntryType>
        }
      : Array<EntryType>
  > {
    const response = await request(this.apiUri, this.modifyParams(params))

    const data = response.data.map(cleanStrapiObject) as Array<EntryType>

    if (withPagination) {
      return {
        data,
        pagination: response.meta.pagination
      } as T extends true
        ? {
            pagination: ApiResponse['meta']['pagination']
            data: Array<EntryType>
          }
        : never
    }

    return data as T extends true ? never : Array<EntryType>
  }

  async findAll(params: Omit<ApiRequestParams<EntryType>, 'pagination'> = {}) {
    let combined: Array<EntryType> = []

    let currentPage = 0
    let totalPages = 1

    while (currentPage < totalPages) {
      params.pagination = {
        pageSize: 100,
        page: currentPage + 1
      }
      const { data, pagination } = await this.findMany(params, true)

      combined = combined.concat(data)

      totalPages = pagination?.pageCount || totalPages
      currentPage = pagination?.page || currentPage + 1
    }

    return combined
  }

  async find(id: number, params: ApiRequestParams<EntryType> = {}) {
    const response = await request(
      `${this.apiUri}/${id}`,
      this.modifyParams(params)
    )
    return cleanStrapiObject(response.data) as EntryType
  }
}

export function seoFieldToNextComponentProps(
  seo: undefined | null | ComponentSeo,
  defaults: SeoContainerProps
): SeoContainerProps {
  const merged = { ...defaults }

  if (seo?.title) merged.title = seo.title
  if (seo?.description) merged.description = seo.description
  if (seo?.image) merged.image = [seo.image]
  if (seo?.schema) merged.schema = seo.schema
  if (seo?.canonicalUrl) merged.path = seo.canonicalUrl

  if (seo?.nofollow || seo?.noindex || seo?.robots) {
    merged.robots = [
      merged.robots,
      seo.robots,
      seo?.nofollow ? 'nofollow' : null,
      seo?.noindex ? 'noindex' : null
    ]
      .filter(Boolean)
      .join(', ')
  }

  return merged
}

export const resourceCategoriesService =
  new StrapiEntryService<EntryResourceCategory>(
    'resource-categories',
    false,
    true
  )

export const resourcesService = new StrapiEntryService<EntryResource>(
  'resources',
  'stagingOnly',
  true
)

export const eventsService = new StrapiEntryService<EntryEvent>(
  'events',
  true,
  true
)

export const pagesService = new StrapiEntryService<EntryPage>(
  'pages',
  'stagingOnly',
  true
)

export const marketingVideosService =
  new StrapiEntryService<EntryMarketingVideo>('marketing-videos', false, true)

export const blogService = new StrapiEntryService<EntryBlogPost>(
  'blog-posts',
  true,
  true
)

export const authorsService = new StrapiEntryService<EntryAuthor>(
  'authors',
  false,
  true
)
