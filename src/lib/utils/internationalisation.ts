import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'

type LangKey = keyof Languages<string>
export const defaultLanguage: LangKey = 'en'

export const langPathMap: Partial<Record<LangKey, string>> = {
  en: '/',
  ja: '/jp'
}

export const getPathLang = (path: string) => {
  const langPathEntries = Object.entries(langPathMap) as Array<
    [LangKey, string]
  >

  // Sort paths by longest
  langPathEntries.sort(([aKey, aValue], [bKey, bValue]) => {
    return bValue.length - aValue.length
  })

  // Find the matching lang key
  for (const [key, value] of langPathEntries) {
    if (path.startsWith(value)) {
      return key
    }
  }

  return null
}

export const getLangPath = (lang: keyof Languages<string>) => {
  let langPath = langPathMap[lang] || `/${lang}`
  langPath = langPath.replace(/^\//, '')
  langPath = langPath.replace(/\/$/, '')
  return langPath.length ? `/${langPath}/` : '/'
}

export const removeLangPath = (path: string, lang: keyof Languages<string>) => {
  const langPath = getLangPath(lang)

  if (path.startsWith(langPath)) {
    path = path.replace(new RegExp(`^${langPath}`), '/')
  }

  return path
}

export const applyLangPath = (path: string, lang: keyof Languages<string>) => {
  const langPath = getLangPath(lang)

  if (!path.startsWith(langPath)) {
    path = `${langPath}${path.replace(/^\//, '')}`
  }

  return path
}
