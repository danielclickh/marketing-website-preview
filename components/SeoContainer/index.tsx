import Head from 'next/head'
import React from 'react'
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
  let socialImageUrl = siteUrl + image?.[0]?.url || `${siteUrl}/images/social_share.png`

  if (imageUrl) socialImageUrl = imageUrl;

  const canonicalUrl =
    path === '/blog/forecasting-using-clickhouse'
      ? 'https://ensembleanalytics.io/blog/forecasting-using-clickhouse'
      : path === '/blog/clickhouse-linear-regression-machine-learning-functions'
      ? 'https://ensembleanalytics.io/blog/linear-regression-using-clickhouse'
      : `${siteUrl}${path}`

  return (
    <Head>
      {title.length > 0 && <title>{title}</title>}
      <link rel='canonical' href={canonicalUrl} key='canonical' />

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
