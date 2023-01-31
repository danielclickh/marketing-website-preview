import { createWriteStream, existsSync } from 'fs'
import { mkdir, writeFile, rm } from 'fs/promises'
import path from 'path'
import fetch, { Headers } from 'cross-fetch'
import { RateLimit } from 'async-sema'

import dotenv from 'dotenv'
dotenv.config()
import environment from './environment'
import generateRssFeed from './lib/api/rss'
import { fetchAll } from './lib/api/strapi'

const publicFolder = path.join(__dirname, 'public')

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

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
    return results as Record<string, string>
  } catch (e) {
    if (count < 3) {
      count++
      const res = await fetchStrapiImages(count)
      return res
    } else {
      warn('Error fetching image list')
      throw e
    }
  }
}

async function fetchImage(url: string, count = 0) {
  try {
    const response = await fetch(`${environment.strapiBaseUrl}${url}`)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    createWriteStream(path.join(publicFolder, url)).write(buffer)
  } catch (e) {
    if (count < 3) {
      count++
      log(`Retrying ${url}' due to ${(e as Error).message}`)
      await fetchImage(url, count)
    } else {
      warn(`Error fetching image: ${environment.strapiBaseUrl}${url}`)
      throw e
    }
  }
}
async function fetchImages() {
  try {
    const uploadFolder = path.join(publicFolder, 'uploads')
    if (existsSync(uploadFolder)) {
      log(`[${new Date().toTimeString()}] Remove Directory started`)
      await rm(uploadFolder, { recursive: true })
      log(`[${new Date().toTimeString()}] Remove Directory ended`)
    }
    log('Add Directory started')
    await mkdir(uploadFolder)
    log('Add Directory ended')
    const results = await fetchStrapiImages()

    const urls: string[] = results.flatMap((result: any) => {
      const items = Object.values(result.formats || {}).map(
        (item: any) => item.url
      )
      items.push(result.url)
      return items
    })

    log('Fetched images list')

    const batchSize = 25
    const limit = RateLimit(batchSize)
    log(`Fetching images(${urls.length})...`)

    let batch: Promise<void>[] = []
    let fetchImageCount = 0

    for (const url of urls) {
      // checks if limit is reached
      if (batch.length === batchSize) {
        await Promise.all(batch)
        fetchImageCount += batch.length
        log(`Fetched ${fetchImageCount} images`)
        batch = []
      }

      await limit()
      batch.push(fetchImage(url))
    }

    if (batch.length > 0) {
      await Promise.all(batch)
      fetchImageCount += batch.length
      batch = []
    }

    log(`Finished fetching ${fetchImageCount} images `)
  } catch (error) {
    console.error(error)
  }
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
    log('Fetched sitemap')
  } catch (e) {
    if (count < 3) {
      count++
      await fetchSiteMap(count)
    } else {
      warn('Error fetching sitemap')
      throw e
    }
  }
}

async function generateRssXml() {
  try {
    const blogsParams = {
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
        'date'
      ]
    }
    log('fetching blog posts for rss.xml...')
    const data = await fetchAll('blog-posts', blogsParams)
    log('generating rss.xml...')
    await generateRssFeed(data)
    log('done generating rss.xml')
  } catch (e) {
    if (e instanceof Error) {
      warn(`Error generating rss.xml: ${e.message}`)
    } else {
      warn(`Error generating rss.xml: ${e}`)
    }
  }
}

fetchSiteMap()
fetchImages()
generateRssXml()
