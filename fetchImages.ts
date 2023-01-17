import { existsSync } from 'fs'
import { mkdir, writeFile, rm } from 'fs/promises'
import path from 'path'

import environment from './environment'

const publicFolder = path.join(__dirname, 'public')

async function fetchImage(url: string, count = 0) {
  try {
    const response = await fetch(`${environment.strapiBaseUrl}${url}`)

    const blob = await response.blob()

    const bos = blob.stream()

    await writeFile(path.join(publicFolder, url), bos)
  } catch (e) {
    if (count < 3) {
      count++
      await fetchImage(url, count)
    } else {
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
  const response = await fetch(
    `${environment.strapiBaseUrl}/api/upload/files?filters[mime][$notContainsi]=svg`,
    {
      headers: new Headers({
        Authorization: `bearer ${environment.strapiApiToken}`
      })
    }
  )
  const results = await response.json()

  const urls: string[] = results.flatMap((result: any) => {
    const items = Object.values(result.formats || {}).map(
      (item: any) => item.url
    )
    items.push(result.url)
    return items
  })

  await Promise.all(
    urls.map(async (result: string) => {
      await fetchImage(result)
    })
  )
  console.log('Fetched all the images')
}

fetchImages()
