import Head from 'next/head'
import { SeoMetadata } from '../../lib/api/strapi/types'

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL ?? 'https://clickhouse.com'

function SeoContainer({
  image,
  imageUrl,
  title = '',
  description = '',
  type,
  siteName,
  path
}: SeoMetadata) {
  // Default social image
  let socialImageUrl = `${siteUrl}/images/social_share.png`

  // If image is passed as an object
  if (image?.[0]?.url) socialImageUrl = siteUrl + image?.[0]?.url

  // If the image is passed as a string
  if (imageUrl) socialImageUrl = imageUrl

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

  return (
    <Head>
      {title.length > 0 && <title>{title}</title>}
      <link rel='canonical' href={canonicalUrl} key='canonical' />
      <link rel='alternate' hrefLang='en' href={canonicalUrl} />
      <link rel='alternate' hrefLang='ja' href={canonicalUrlJP} />

      {description.length > 0 && (
        <meta name='description' content={description} />
      )}
      <meta name='author' content='ClickHouse' />

      {/* Open Graph */}
      {title.length > 0 && <meta property='og:title' content={title} />}
      {description.length > 0 && (
        <meta property='og:description' content={description} />
      )}
      {type && <meta property='og:type' content={type} />}
      {siteName && <meta name='og:site_name' content={siteName} />}
      <meta property='og:image' content={socialImageUrl} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      {title.length > 0 && <meta name='twitter:title' content={title} />}
      {description.length > 0 && (
        <meta name='twitter:description' content={description} />
      )}
      <meta name='twitter:image' content={socialImageUrl} />
    </Head>
  )
}

export default SeoContainer
