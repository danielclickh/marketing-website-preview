import buildIndex from '../public/buildIndex.json'
import { BuildRecord } from './buildIndex'
import { algoliasearch } from 'algoliasearch'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env')
  ]
})

function log(...args: any[]) {
  console.log('[SYNC ALGOLIA]', ...args)
}

//
// Indexing options
//
const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const apiKey = process.env.ALGOLIA_ADMIN_KEY
const algoliaIndexName = 'marketing_site'

// Send to Algolia
;(async () => {
  if (!applicationId || !apiKey) {
    log('⚠️ No app ID or admin key provided')
    return
  }

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

  log('Opening index build file')

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

  const matchedFiles = new Map<
    keyof typeof typePathsToMatch,
    Array<BuildRecord>
  >()

  log('Collecting matching files')
  Object.entries(typePathsToMatch).forEach(([type, matchPatterns]) => {
    buildIndex.forEach((file) => {
      let isMatched = true

      matchPatterns.forEach((pattern) => {
        const { isNegative, regex } = userPatternToRegex(pattern)
        const regexMatched = regex.test(file.path)
        if ((!isNegative && !regexMatched) || (isNegative && regexMatched)) {
          isMatched = false
        }
      })

      if (isMatched) {
        if (!matchedFiles.has(type)) {
          matchedFiles.set(type, [])
        }
        matchedFiles.get(type)?.push(file)
      }
    })
  })

  const recordsToSave: Array<{
    objectID: string
    type: keyof typeof typePathsToMatch
    [key: string]: any
  }> = []

  log('Creating records')
  matchedFiles.entries().forEach(([type, typeFiles]) => {
    typeFiles.forEach((typeFile) => {
      if (typeFile.indexable) {
        recordsToSave.push({
          objectID: `static::${type}[${typeFile.path}]`,
          type,
          title: typeFile.title,
          description: typeFile.description,
          attributes: {
            path: typeFile.path
          }
        })
      }
    })
  })

  const algoliaClient = algoliasearch(applicationId, apiKey)

  if (!recordsToSave.length) {
    log(`No records to index`)
    return
  }

  log(`Sending ${recordsToSave.length} records...`)
  await algoliaClient.saveObjects({
    indexName: algoliaIndexName,
    objects: recordsToSave
  })
})()
