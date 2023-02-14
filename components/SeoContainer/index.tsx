import Head from 'next/head'
import React from 'react'
import { SeoMetadata } from '../../lib/api/strapi/types'

function SeoContainer({
  image,
  title = '',
  description = '',
  type,
  siteName
}: SeoMetadata) {
  const imageUrl = image?.[0]?.url || '/images/sql_console_hero.png'

  return (
    <Head>
      <meta name='twitter:card' content='summary_large_image' />
      {title.length > 0 && (
        <>
          <title>{title}</title>
          <meta property='og:title' content={title} />
          <meta name='twitter:title' content={title} />
        </>
      )}
      {description.length > 0 && (
        <>
          <meta name='description' content={description} />
          <meta name='twitter:description' content={description} />
          <meta property='og:description' content={description} />
        </>
      )}
      {type && <meta property='og:type' content={type} />}
      {siteName && <meta name='og:site_name' content={siteName} />}

      <meta name='twitter:image' content={imageUrl} />
      <meta property='og:image' content={imageUrl} />
      <meta name='author' content='ClickHouse' />
    </Head>
  )
}

export default SeoContainer
