import { all } from '@/lib/indexing'
import {
  applyLangPath,
  defaultLanguage,
  getPathLang,
  removeLangPath
} from '@/lib/utils/internationalisation'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteURL = 'https://clickhouse.com'

  const indexedItems = await all()

  const allEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteURL}`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp`
        }
      }
    },
    ...indexedItems.map((item) => {
      return {
        url: `${siteURL}${item.path}`,
        lastModified: item.lastModified || undefined
      }
    })
  ]

  const i18nEntries: MetadataRoute.Sitemap = []
  const cleanedEntries: MetadataRoute.Sitemap = []

  allEntries.forEach((entry) => {
    const path = new URL(entry.url).pathname
    const lang = getPathLang(path)
    if (lang && lang !== defaultLanguage) {
      i18nEntries.push(entry)
    } else {
      cleanedEntries.push(entry)
    }
  })

  i18nEntries.forEach((entry) => {
    const path = new URL(entry.url).pathname
    const lang = getPathLang(path)
    if (lang) {
      const defaultLangPath = `${siteURL}${applyLangPath(removeLangPath(path, lang), defaultLanguage)}`
      const defaultLangEntry = cleanedEntries.find(
        (el) => el.url === defaultLangPath
      )

      // Merge with default language entry
      if (defaultLangEntry) {
        if (!defaultLangEntry?.alternates) {
          defaultLangEntry.alternates = {}
        }
        if (!defaultLangEntry.alternates?.languages) {
          defaultLangEntry.alternates.languages = {}
        }

        defaultLangEntry.alternates.languages[lang] = entry.url
      }

      // Unable to merge, create its own entry
      else {
        cleanedEntries.push(entry)
      }
    }
  })

  return cleanedEntries
}
