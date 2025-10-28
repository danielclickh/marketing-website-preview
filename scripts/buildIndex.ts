import * as cheerio from 'cheerio'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({
  path: [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env')
  ]
})

function log(...args: any[]) {
  console.log('[BUILD INDEX]', ...args)
}

// A local reference of indexed pages allows us to remove records when pages are deleted
const OUTPUT_FILE_NAME = 'buildIndex.json'
const OUTPUT_FILE_PATH = path.join(__dirname, '..', 'public', OUTPUT_FILE_NAME)
const NEXTJS_BUILD_PATH = path.join(__dirname, '..', '.next', 'server', 'pages')

const EXCLUDED_PATHS = [
  '/404',
  '/500',
  '/_app',
  '/_document',
  '/_error',
  '/not-found',
  '/error'
]

export interface BuildRecord {
  path: string
  indexable: boolean
  title: string
  description: string
  keywords: Array<string>
  lastModified: string | null
  alternatives: Record<string, string>
}

// Find all `.html` files in the Next.js build output
log(`Scanning build directory: ${NEXTJS_BUILD_PATH}`)
const htmlFiles = (() => {
  function getFiles(
    dir: string,
    files: Array<{
      uri: string
      path: string
    }> = []
  ) {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        getFiles(fullPath, files)
      } else if (fullPath.endsWith('.html')) {
        files.push({
          path: fullPath,
          uri: fullPath.replace(NEXTJS_BUILD_PATH, '').replace(/\.html$/, '')
        })
      }
    })
    return files
  }

  return getFiles(NEXTJS_BUILD_PATH)
})().filter(({ uri }) => !EXCLUDED_PATHS.some((ex) => uri === ex))

// Extract record details from html
const records = htmlFiles.map((file) => {
  log(`Extracting record details: ${file.uri}`)
  const html = fs.readFileSync(file.path, 'utf8')
  const $ = cheerio.load(html)

  const title = $('h1').first().text().trim() || $('title').text().trim()
  const description = (
    $('meta[name="description"]').attr('content') || ''
  ).trim()
  const keywords = ($('meta[name="keywords"]').attr('content') || '').trim()
  const lastModified = (
    $('meta[name="last-modified"]').attr('content') || ''
  ).trim()
  const noindex = !!$('meta[name="robots"]')
    .attr('content')
    ?.toLowerCase()
    ?.includes('noindex')

  const hreflangs = $('link[rel="alternate"][hreflang]')
    .map((i, el) => {
      const $tag = $(el)
      return {
        key: $tag.attr('hreflang') || '',
        value: new URL($tag.attr('href') || '').pathname
      }
    })
    .toArray()
    .map((item) => [item.key, item.value])
  const alternatives = Object.fromEntries(hreflangs as Array<[string, string]>)

  return {
    path: file.uri,
    indexable: !noindex,
    title,
    description,
    keywords: keywords.split(/,\s*/).filter((k) => !!k.length),
    lastModified: lastModified.length ? lastModified : null,
    alternatives
  } satisfies BuildRecord
})

// Update local index file
log(`Saving ${records.length} records to local index file`)
fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(records))
