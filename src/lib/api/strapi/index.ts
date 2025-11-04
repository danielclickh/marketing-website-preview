import { PricingV2 } from './types'
import { absoluteUrl, relativeUrl } from '@/lib/next'
import {
  ApiRequestParams,
  ApiResponse,
  EntryResource,
  EntryResourceCategory
} from '@/types/strapi'
import _fetch from 'cross-fetch'
import { relative } from 'knip/dist/util/path'
import type { NextApiRequest } from 'next'
import { stringify } from 'qs'

export function fetch(uri: string, init: any = {}) {
  if (process?.env?.STRAPI_API_KEY) {
    init.headers = {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      ...(init.headers || {})
    }
  }
  return _fetch(uri, init)
}

const strapiApiUrl =
  process.env.STRAPI_API_URL ?? 'https://cms.clickhouse-dev.com:1337'
//process.env.STRAPI_API_URL ?? 'http://localhost:1337'
const url = `${strapiApiUrl}/api/`

const stagingOnlyFilter =
  process.env.NEXT_IS_PROD === 'true' ? { $eq: false } : { $eq: true }
export function getStagingOnlyFilters(
  fieldName: string = 'StagingOnly'
): Array<Record<string, any>> {
  return [
    { [fieldName]: { $null: true } },
    { [fieldName]: stagingOnlyFilter },
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

  const response = await fetch(uri, {
    // Default options
    next: {
      revalidate: 5
    },
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
    },

    // Merge options
    ...(options || {})
  })

  if (!response.ok) {
    throw new Error(
      `STRAPI HTTP Error: ${response.status} (${response.statusText}) ${uri}`
    )
  }

  return await response.json()
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
  if (pagination.pageCount > pageNumber) {
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
  if (pageNumber < pagination.pageCount) {
    const newData = await fetchAll(pathName, params, data, pageNumber + 1)
    list = list.concat(newData)
  } else {
    list = list.concat(data)
  }
  return list
}

async function convertSvg(convertedObj: Record<string, any>) {
  if (convertedObj?.mime && convertedObj.mime.includes('svg')) {
    const response = await fetch(`${strapiApiUrl}${convertedObj.url}`)
    const svgText = await response.text()
    convertedObj.svgText = svgText
  }
  return convertedObj
}

async function convertStrapiObjectArray(
  item: Record<string, any>
): Promise<Record<string, any>> {
  let convertedObj = await convertStrapiObject(item)
  convertedObj = await convertSvg(convertedObj)
  return convertedObj
}

async function convertStrapiObject(element: any) {
  const newElement =
    'attributes' in element && 'id' in element
      ? { id: element.id, ...element.attributes }
      : element
  const result: any = {}
  for (const entry of Object.entries(newElement)) {
    const field: string = entry[0]
    const fieldValue: any = entry[1]

    if (Array.isArray(fieldValue)) {
      result[field] = await Promise.all(
        fieldValue.map(convertStrapiObjectArray)
      )
      continue
    }

    if (typeof fieldValue === 'object' && fieldValue) {
      if ('data' in fieldValue && Array.isArray(fieldValue.data)) {
        result[field] = await Promise.all(
          fieldValue.data.map(convertStrapiObjectArray)
        )
        continue
      }
      let convertedObj: any = await convertStrapiObject(fieldValue)
      if ('data' in convertedObj && Object.keys(convertedObj).length === 1) {
        convertedObj = convertedObj.data
      }

      result[field] = await convertSvg(convertedObj)
      continue
    }

    result[field] = fieldValue
  }
  return result
}

export async function findAll(pathName: string, params: Record<string, any>) {
  const newParamString = stringify(params, {
    encodeValuesOnly: true // prettify URL
  })

  const response = await fetch(
    `${url}${pathName}${newParamString.length > 0 ? `?${newParamString}` : ''}`
  )

  const { data, meta } = await response.json()
  const dataList = await Promise.all(
    data.map(
      async (item: Record<string, any>): Promise<Record<string, any>> => {
        const converted = await convertStrapiObject(item)
        return converted
      }
    )
  )
  return {
    data: dataList,
    pagination: meta.pagination
  }
}

export async function findOne(pathName: string, params: Record<string, any>) {
  const newParamString = stringify(params, {
    encodeValuesOnly: true // prettify URL
  })
  const response = await fetch(
    `${url}${pathName}${newParamString.length > 0 ? `?${newParamString}` : ''}`
  )

  const { data } = await response.json()
  return await convertStrapiObject(data)
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
  const pathName = 'upload/files'
  const newParamString = stringify(
    {
      'filters[url][$eq]': imageUrl
    },
    {
      encodeValuesOnly: true
    }
  )
  const response = await fetch(
    `${url}${pathName}${newParamString.length > 0 ? `?${newParamString}` : ''}`
  )
  const data = await response.json()
  const imageDetails = data.length > 0 ? data[0] : null
  return imageDetails
}

class StrapiEntryController<EntryType> {
  constructor(
    private apiUri: string,
    private stagingFilters: boolean | string = false
  ) {
    this.apiUri = apiUri
    this.stagingFilters = stagingFilters
  }

  private mergeStagingFilters(params: ApiRequestParams['filters']) {
    if (this.stagingFilters) {
      const fieldName =
        typeof this.stagingFilters === 'string'
          ? this.stagingFilters
          : 'stagingOnly'

      if (params.filters) {
        return {
          ...params,
          filters: {
            $and: [
              params.filters,
              {
                $or: getStagingOnlyFilters(fieldName)
              }
            ]
          }
        }
      }

      return {
        ...params,
        filters: {
          $or: getStagingOnlyFilters(fieldName)
        }
      }
    }

    return params
  }

  async findSome<T extends boolean = false>(
    params: ApiRequestParams = {},
    withPagination: T = false as T
  ): Promise<
    T extends true
      ? {
          pagination: ApiResponse['meta']['pagination']
          data: Array<EntryType>
        }
      : Array<EntryType>
  > {
    const response = await request(
      this.apiUri,
      this.mergeStagingFilters(params)
    )

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

  async findAll(params: Omit<ApiRequestParams, 'pagination'> = {}) {
    let combined: Array<EntryType> = []

    let currentPage = 0
    let totalPages = 1

    while (currentPage < totalPages) {
      params.pagination = {
        pageSize: 100,
        page: currentPage + 1
      }
      const { data, pagination } = await this.findSome(params, true)

      combined = combined.concat(data)

      totalPages = pagination?.pageCount || totalPages
      currentPage = pagination?.page || currentPage + 1
    }

    return combined
  }

  async find(id: number, params: ApiRequestParams = {}) {
    const response = await request(
      `${this.apiUri}/${id}`,
      this.mergeStagingFilters(params)
    )
    return cleanStrapiObject(response.data) as EntryType
  }

  async findBySlug(
    slug: string,
    params: Omit<ApiRequestParams, 'pagination' | 'filters'> = {}
  ) {
    return (
      await this.findSome({
        ...params,
        filters: {
          slug: {
            $eq: slug
          }
        },
        pagination: {
          page: 1,
          pageSize: 1,
          withCount: false
        }
      })
    ).pop()
  }
}

export const resourceCategoriesController =
  new StrapiEntryController<EntryResourceCategory>('resource-categories', false)

export const resourcesController = new StrapiEntryController<EntryResource>(
  'resources',
  true
)
