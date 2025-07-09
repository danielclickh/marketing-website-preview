import { SeoMetadata } from '@/lib/api/strapi/types'
import Head from 'next/head'

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL ?? 'https://clickhouse.com'

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
  schema
}: SeoMetadata) {
  // Default social image with cache-busting version
  const imageVersion = 'v1' // Update this when the image changes
  let socialImageUrl = `${siteUrl}/images/social_share.png?v=${imageVersion}`

  // If image is passed as an object
  if (image?.[0]?.url) {
    const baseUrl = image[0].url.startsWith('http') ? '' : siteUrl
    socialImageUrl = `${baseUrl}${image[0].url}?v=${imageVersion}`
  }
  // If the image is passed as a string
  else if (imageUrl) {
    const baseUrl = imageUrl.startsWith('http') ? '' : siteUrl
    socialImageUrl = `${baseUrl}${imageUrl}?v=${imageVersion}`
  }

  const canonicalUrl = (() => {
    const predefinedUrls: { [key: string]: string } = {
      '/blog/forecasting-using-clickhouse':
        'https://benjaminwootton.com/insights/forecasting-using-clickhouse',
      '/blog/clickhouse-linear-regression-machine-learning-functions':
        'https://benjaminwootton.com/insights/linear-regression-using-clickhouse'
    }

    if (path.startsWith('http')) {
      return path
    }

    return predefinedUrls[path] || `${siteUrl}${path}`
  })()

  const canonicalUrlJP = (() => {
    if (path.startsWith('http')) {
      return path
    }

    return `${siteUrl}/jp${path}`
  })()

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

      <link rel='canonical' href={canonicalUrl} key='canonical' />
      <link rel='alternate' hrefLang='en' href={canonicalUrl} />
      <link rel='alternate' hrefLang='ja' href={canonicalUrlJP} />

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
