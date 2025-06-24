import removeMarkdown from 'remove-markdown'

export function upperCaseFirst(string: string) {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1)
}

export function upperCaseWords(string: string) {
  return string.split(' ').map(upperCaseFirst).join(' ')
}

export function pascal(string: string) {
  string = slugify(string, { separator: ' ' })
  return upperCaseWords(string).replaceAll(/\s+/g, '')
}

export function camel(string: string) {
  string = pascal(string)
  return string.charAt(0).toLocaleLowerCase() + string.slice(1)
}

type SlugifyOptions = {
  separator?: string
  maxLength?: number
  enforceLowercase?: boolean
  dictionary?: Record<string, string>
}

const slugifyDefaults = {
  separator: '-',
  maxLength: 0,
  enforceLowercase: true,
  dictionary: {
    '&': 'and',
    '@': 'at'
  }
} satisfies SlugifyOptions

/**
 * Slugify a string replacing any white space and spacial characters with `separator` param.
 */
export function slugify(string: string, options?: SlugifyOptions): string {
  const { separator, maxLength, enforceLowercase, dictionary } = {
    ...slugifyDefaults,
    ...options
  }

  const charPattern = new RegExp(`[^a-z0-9\s${separator}]`, 'gi')

  // Setup our base slug value.
  let slug = (string || '').toString()

  // Replace dictionary key-pairs.
  for (const key in dictionary) {
    if (dictionary.hasOwnProperty(key)) {
      slug = slug.replaceAll(key, dictionary[key as keyof typeof dictionary])
    }
  }

  // Normalise string and remove unwanted characters.
  slug = slug
    .normalize('NFD') // Split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // Remove all previously split accents
    .replace(charPattern, ' ') // Remove all chars not letters, numbers and spaces (to be replaced)
    .trim()
    .replace(/\s+/g, separator)

  // Limit slug length.
  if (maxLength > 0) {
    slug = slug.substring(0, maxLength)
  }

  // Enforce lowered case.
  if (enforceLowercase) {
    slug = slug.toLowerCase()
  }

  return slug
}

export function stripHtmlTags(
  string: string,
  tags: '*' | Array<string> = '*',
  preserveContent = false
): string {
  if (tags === '*') {
    tags = ['[^>\\s]+']
  }

  if (!tags.length) return string

  const matchingTagsPattern = new RegExp(
    `<(${tags.join('|')})[^>]*?>(.*?)<\\/\\1>`,
    'gi'
  )
  string = string.replaceAll(matchingTagsPattern, preserveContent ? '$2' : '')

  const strayTagsPattern = new RegExp(
    `<(${tags.join('|')})[^>]*?>|<\\/(${tags.join('|')})>`,
    'gi'
  )
  string = string.replaceAll(strayTagsPattern, '')

  return string
}

export function limitStringByWord(
  string: string,
  maxLength: number,
  appends: string = ''
) {
  if (string.length <= maxLength) return string

  let trimmedString = string.slice(0, maxLength)
  const lastSpaceIndex = trimmedString.lastIndexOf(' ')

  // If there's no space, just truncate normally, otherwise cut off at the last space
  if (lastSpaceIndex > 0) {
    trimmedString = trimmedString.slice(0, lastSpaceIndex)
  }

  return trimmedString + appends
}

export function escapeForRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function extractEventTime(markdown: string) {
  // Remove all markdown syntax
  const stripped = removeMarkdown(markdown)

  // Extract times from markdown, for example:
  // `Time: 11:00 AM` => 11:00 AM
  // `Times: 1PM EDT / 3PM BST` => 1PM EDT / 3PM BST
  // `Date: 4th November at 4PM` => 4PM
  const regex = /(?:^times?\s*:\s*(.+)$)|(?:dates?\s*:\s*(?:.+)\sat\s(.+)$)/im
  const matches = stripped.match(regex)
  const extractedValue = matches?.[1] || matches?.[2] || null

  // Bail early if time not found
  if (!extractedValue) {
    return null
  }

  // Remove parentheses notes text
  const cleaned = extractedValue.replace(/\(.*?\)|note:.*/gi, '').trim()

  // Split on known separators while preserving timezone groups
  const segments = cleaned.split(/\s*[-/]\s*/)

  const formattedSegments = segments.map((segment) => {
    // Match time + optional minutes + optional AM/PM + timezone
    const timeRegex = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?\s*([A-Z]{2,5})/i
    const match = segment.match(timeRegex)

    if (!match) return segment.trim() // fallback

    const [, hour, minutes = '00', meridian = '', tz] = match

    return `${String(hour).padStart(2, '0')}:${minutes} ${meridian.toUpperCase()} ${tz.toUpperCase()}`
  })

  // Choose separator based on original
  if (extractedValue.includes('/')) return formattedSegments.join(' / ')
  if (extractedValue.includes('-')) return formattedSegments.join(' - ')
  return formattedSegments[0]
}
