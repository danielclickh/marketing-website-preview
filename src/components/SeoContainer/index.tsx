import { SeoMetadata } from '@/lib/api/strapi/types'
import { absoluteUrl } from '@/lib/next'
import Head from 'next/head'

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
  socialImageUrl = absoluteUrl(
    `/_next/image?url=${encodeURIComponent(socialImageUrl)}&w=1200&h=630&q=100`
  )

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

    return predefinedUrls[path] || absoluteUrl(path)
  })()

  const canonicalUrlJP = (() => {
    if (path.startsWith('http')) {
      return path
    }

    return absoluteUrl(`/jp${path}`)
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
