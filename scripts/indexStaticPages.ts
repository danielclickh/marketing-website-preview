import { algoliasearch } from 'algoliasearch'
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

//
// Indexing options
//
const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const apiKey = process.env.ALGOLIA_ADMIN_KEY
const algoliaIndexName = 'marketing_site'

// `!` for negative match
// `/**` for multiple dirs: /my-path/** => /my-path/example/something
// `/*` for single dir: /my-path/* => /my-path/example
const typePathsToMatch: Record<string, Array<string>> = {
  pages: [
    '/**',
    '!/index',
    '!/500',
    '!/404',
    '!/engineering-resources/**',
    '!/blog/**',
    '!/company/events/**',
    '!/videos/**',
    '!/integrations/**',
    '!/demos/**',
    '!/jp/**'
  ],
  'engineering-resources': ['/engineering-resources/**']
}

//
// Start indexing process
//

function log(message: string) {
  console.log(`[${new Date().toTimeString()}] ${message}`)
}

function warn(message: string) {
  console.warn(`[${new Date().toTimeString()}] ${message}`)
}

log('Staring Algolia indexing...')

// A local reference of indexed pages allows us to remove records when pages are deleted
const OUTPUT_FILE_NAME = 'indexedStaticPages.json'
const OUTPUT_FILE_PATH = path.join(__dirname, '..', 'public', OUTPUT_FILE_NAME)
const NEXTJS_BUILD_PATH = path.join(__dirname, '..', '.next', 'server', 'pages')

type FileInfo = {
  uri: string
  path: string
}

// Find all `.html` files in the Next.js build output
const htmlFiles = (() => {
  function getFiles(dir: string, files: Array<FileInfo> = []) {
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
})()

// Convert user patterns to regex
// @example `/my-path/**` => `/^\/my-path(?:\/(?:[^\/]+\/?)*)$\/`
function userPatternToRegex(userPattern: string) {
  const singlePathPattern = '(?:[^/]+/?)'
  const multiPathPattern = `${singlePathPattern}*`

  const isNegative = userPattern.startsWith('!')
  let regexString = userPattern

  // Use placeholders to avoid replacement conflicts
  // Temporarily replace ** and * with placeholders
  regexString = regexString.replace(/\*\*/g, '__DOUBLE_STAR__')
  regexString = regexString.replace(/\*/g, '__SINGLE_STAR__')

  regexString = regexString.replace(/^!/, '')
  regexString = regexString.replaceAll(
    '/__DOUBLE_STAR__',
    `(?:/${multiPathPattern})?`
  )
  regexString = regexString.replaceAll(
    '/__SINGLE_STAR__',
    `(?:/${singlePathPattern})?`
  )
  regexString = regexString.replaceAll('__DOUBLE_STAR__', multiPathPattern)
  regexString = regexString.replaceAll('__SINGLE_STAR__', singlePathPattern)

  return {
    isNegative,
    regex: new RegExp(`^${regexString}$`, 'i')
  }
}

const matchedFiles = new Set<
  FileInfo & { type: keyof typeof typePathsToMatch }
>()

Object.entries(typePathsToMatch).forEach(([type, matchPatterns]) => {
  htmlFiles.forEach((file) => {
    let isMatched = true

    matchPatterns.forEach((pattern) => {
      const { isNegative, regex } = userPatternToRegex(pattern)
      const regexMatched = regex.test(file.uri)
      if ((!isNegative && !regexMatched) || (isNegative && regexMatched)) {
        isMatched = false
      }
    })

    if (isMatched) {
      matchedFiles.add({
        type,
        ...file
      })
    }
  })
})

const recordsToSave: Array<{
  objectID: string
  type: keyof typeof typePathsToMatch
  [key: string]: any
}> = []

const recordsToDelete: Array<string> = []

// Extract record details from html
matchedFiles.forEach((file) => {
  log(`[${file.uri}] Extracting record details...`)
  const html = fs.readFileSync(file.path, 'utf8')
  const $ = cheerio.load(html)

  const title = $('h1').first().text().trim() || $('title').text().trim()
  const description = $('meta[name="description"]').attr('content') || ''
  const noindex = !!$('meta[name="robots"]')
    .attr('content')
    ?.includes('noindex')

  // Respect noindex
  if (noindex) return

  recordsToSave.push({
    objectID: `static::${file.type}[${file.uri}]`,
    type: file.type,
    title,
    description,
    attributes: {
      path: file.uri
    }
  })
})

// Find deleted pages to remove from Algolia
try {
  const old = JSON.parse(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8'))
  if (Array.isArray(old)) {
    old.forEach((item) => {
      const { objectID } = item
      if (
        objectID &&
        !recordsToSave.find((record) => record.objectID === objectID)
      ) {
        recordsToDelete.push(objectID)
      }
    })
  }
} catch (e) {
  //
}

// Update local index file
log(`Saving ${recordsToSave.length} records to local index file...`)
fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(recordsToSave))

// Send to Algolia
;(async () => {
  if (!applicationId || !apiKey) {
    console.warn('⚠️ No Algolia app ID or admin key provided. Skipping...')
    return
  }

  const algoliaClient = algoliasearch(applicationId, apiKey)

  if (recordsToSave.length > 0) {
    log(`Indexing ${recordsToSave.length} records...`)
    await algoliaClient.saveObjects({
      indexName: algoliaIndexName,
      objects: recordsToSave
    })
  }

  if (recordsToDelete.length > 0) {
    log(`Deleting ${recordsToDelete.length} records...`)
    await algoliaClient.deleteObjects({
      indexName: algoliaIndexName,
      objectIDs: recordsToDelete
    })
  }
})()
