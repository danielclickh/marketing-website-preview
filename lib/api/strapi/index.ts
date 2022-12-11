import { stringify } from 'qs'

const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/`

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
      [paramName]: slugList
    }
  })
  if (pagination.pageCount > pageNumber) {
    const newPages = await getPathsValues(
      pathName,
      obj,
      isDynamicUrl,
      type,
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

export async function findAll(pathName: string, params: Record<string, any>) {
  const newParamString = stringify(params, {
    encodeValuesOnly: true // prettify URL
  })

  const response = await fetch(
    `${url}${pathName}${newParamString.length > 0 ? `?${newParamString}` : ''}`
  )

  const { data, meta } = await response.json()
  const dataList = data.map((content) => ({
    id: content.id,
    ...content.attributes
  }))
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

  return {
    id: data.id,
    ...data.attributes
  }
}

function isJSON(item: any) {
  item = typeof item !== 'string' ? JSON.stringify(item) : item

  try {
    item = JSON.parse(item)
  } catch (e) {
    return false
  }

  if (typeof item === 'object' && item !== null) {
    return true
  }

  return false
}

export async function findHeader(requestString: string) {
  const headerData = await findOne(requestString, {
    populate: ['seo', 'seo.image']
  })

  return headerData.seo
}
