import { absoluteOptimizedImageUrl, absoluteUrl } from '@/lib/next'
import {
  applyLangPath,
  defaultLanguage,
  removeLangPath
} from '@/lib/utils/internationalisation'
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'
import Head from 'next/head'
import { Thing, WithContext } from 'schema-dts'

export interface SeoContainerProps {
  title?: string
  keywords?: string
  description?: string
  image?: Array<{ url: string }>
  imageUrl?: string
  type?: string
  siteName?: string
  path: string
  robots?: string
  locale?: string
  schema?: WithContext<Thing> | Array<WithContext<Thing>> | any
  languages?: Array<keyof Languages<string>>
  lastModified?: Date | string
}

function SeoContainer({
  image,
  imageUrl,
  title = '',
  description = '',
  type,
  siteName,
  path,
  robots,
  locale,
  keywords,
  schema,
  languages,
  lastModified
}: SeoContainerProps) {
  // Ensure the default language is always added for pages with alternate languages
  if (languages && !languages.includes(defaultLanguage)) {
    languages.push(defaultLanguage)
  }

  // Default social image
  let socialImageUrl = '/images/social_share.png'

  // If image is passed as an object
  if (image?.[0]?.url && image[0].url.trim().length > 0) {
    socialImageUrl = image[0].url
  }

  // If the image is passed as a string
  else if (imageUrl && imageUrl.trim().length > 0) {
    socialImageUrl = imageUrl
  }

  // Automatically resize the image
  socialImageUrl = absoluteOptimizedImageUrl(socialImageUrl, 1200, 630, 80)

  const canonicalUrl = (() => {
    let canonicalPath = path
    if (canonicalPath.startsWith('http')) {
      return canonicalPath
    }
    return absoluteUrl(canonicalPath)
  })()

  const languageCanonicalUrl = (lang: keyof Languages<string>) => {
    let canonicalPath = path
    if (canonicalPath.startsWith('http')) {
      return canonicalPath
    }

    if (languages) {
      languages.forEach((language) => {
        if (language !== lang) {
          canonicalPath = removeLangPath(canonicalPath, language)
        }
      })
    }

    canonicalPath = applyLangPath(canonicalPath, lang)

    return absoluteUrl(canonicalPath)
  }

  title = title && title.length > 0 ? title : ''
  description = description && description.length > 0 ? description : ''
  siteName = siteName && siteName.length > 0 ? siteName : 'ClickHouse'
  type = type && type.length > 0 ? type : 'website'
  locale = locale && locale.length > 0 ? locale : 'en_US'
  keywords = keywords && keywords.length > 0 ? keywords : ''

  return (
    <Head>
      {robots && robots.length > 0 && <meta name='robots' content={robots} />}

      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='author' content={siteName} />
      <meta name='keywords' content={keywords} />
      <link
        rel='alternate'
        type='application/rss+xml'
        title='ClickHouse Blog'
        href='https://clickhouse.com/rss.xml'
      />
      {lastModified && (
        <meta
          name='last-modified'
          content={
            typeof lastModified === 'string'
              ? lastModified
              : lastModified.toISOString()
          }
        />
      )}

      <link rel='canonical' href={canonicalUrl} key='canonical' />
      {languages && languages.length > 0 && (
        <>
          {languages.map((language) => {
            return (
              <link
                rel='alternate'
                hrefLang={language}
                href={languageCanonicalUrl(language)}
              />
            )
          })}
          <link
            rel='alternate'
            hrefLang='x-default'
            href={languageCanonicalUrl(defaultLanguage)}
          />
        </>
      )}

      {/* Open Graph */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={type} />
      <meta property='og:image' content={socialImageUrl} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:locale' content={locale} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@ClickHouseDB' />
      <meta name='twitter:creator' content='@ClickHouseDB' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={socialImageUrl} />
      <meta name='twitter:image:alt' content={title} />
      <meta name='twitter:domain' content='clickhouse.com' />

      {/* Schema.org Markup */}
      {schema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  )
}

export default SeoContainer
