import Head from 'next/head'
import React from 'react'
import { SeoMetadata } from '../../lib/api/strapi/types'

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL ?? ''

function SeoContainer({
  image,
  title = '',
  description = '',
  type,
  siteName
}: SeoMetadata) {
  const imageUrl = image?.[0]?.url || '/images/social_share.png'

  return (
    <Head>
      {title.length > 0 && <title>{title}</title>}
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
      <meta property='og:image' content={siteUrl + imageUrl} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      {title.length > 0 && <meta name='twitter:title' content={title} />}
      {description.length > 0 && (
        <meta name='twitter:description' content={description} />
      )}
      <meta name='twitter:image' content={siteUrl + imageUrl} />
    </Head>
  )
}

export default SeoContainer
