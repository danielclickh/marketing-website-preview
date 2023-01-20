import { existsSync } from 'fs'
import { mkdir, writeFile, rm } from 'fs/promises'
import path from 'path'

import environment from './environment'

const publicFolder = path.join(__dirname, 'public')

async function fetchStrapiImages(count = 0): Promise<Record<string, any>> {
  try {
    const response = await fetch(
      `${environment.strapiBaseUrl}/api/upload/files?filters[mime][$notContainsi]=svg`,
      {
        headers: new Headers({
          Authorization: `bearer ${environment.strapiApiToken}`
        }),
        signal: (AbortSignal as any).timeout(60000)
      }
    )
    const results = await response.json()
    return results
  } catch (e) {
    if (count < 3) {
      count++
      const res = await fetchStrapiImages(count)
      return res
    } else {
      console.warn('Error fetching image list')
      throw e
    }
  }
}

async function fetchImage(url: string, count = 0) {
  try {
    const response = await fetch(`${environment.strapiBaseUrl}${url}`, {
      signal: (AbortSignal as any).timeout(40000)
    })

    const blob = await response.blob()

    const bos = blob.stream()

    await writeFile(path.join(publicFolder, url), bos)
  } catch (e) {
    if (count < 3) {
      count++
      await fetchImage(url, count)
    } else {
      console.warn(`Error fetching image: ${environment.strapiBaseUrl}${url}`)
      throw e
    }
  }
}
async function fetchImages() {
  const uploadFolder = path.join(publicFolder, 'uploads')
  if (existsSync(uploadFolder)) {
    console.log('Remove Directory started')
    await rm(uploadFolder, { recursive: true })
    console.log('Remove Directory ended')
  }
  console.log('Add Directory started')
  await mkdir(uploadFolder)
  console.log('Add Directory ended')
  const results = await fetchStrapiImages()

  const urls: string[] = results.flatMap((result: any) => {
    const items = Object.values(result.formats || {}).map(
      (item: any) => item.url
    )
    items.push(result.url)
    return items
  })
  console.log('Fetched images list')

  await Promise.all(
    urls.map(async (result: string) => {
      await fetchImage(result)
    })
  )
  console.log('Fetched all the images')
}

async function fetchSiteMap(count = 0) {
  try {
    const response = await fetch(
      `${environment.strapiBaseUrl}/sitemap/index.xml`,
      {
        signal: (AbortSignal as any).timeout(30000)
      }
    )

    const data = await response.text()

    await writeFile(path.join(publicFolder, '/sitemap.xml'), data)
    console.log('Fetched sitemap')
  } catch (e) {
    if (count < 3) {
      count++
      await fetchSiteMap(count)
    } else {
      console.warn('Error fetching sitemap')
      throw e
    }
  }
}

fetchSiteMap()
fetchImages()
