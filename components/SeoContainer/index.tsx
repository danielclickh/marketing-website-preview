import React from 'react'
import useSWR from 'swr'
import { findOne } from '../../lib/api/strapi'

interface SeoMetadata {
  title?: string
  keywords?: string
  description?: string
  image?: { url: string }
  type?: string
  siteName?: string
}

function SeoContainer({
  image,
  keywords,
  title = '',
  description,
  type,
  siteName
}: SeoMetadata) {
  return (
    <>
      {title.length > 0 && (
        <>
          <title>{title}</title>
          <meta name='og:title' content={title} />
          <meta name='twitter:title' content={title} />
        </>
      )}
      {description && (
        <>
          <meta name='description' content={description} />
          <meta name='twitter:description' content={description} />
          <meta name='og:description' content={description} />
        </>
      )}
      {keywords && <meta name='keywords' content={keywords} />}
      {type && <meta name='keywords' content={type} />}
      {siteName && <meta name='keywords' content={siteName} />}

      {image?.url && image.url.length > 0 && (
        <>
          <meta name='twitter:image' content={image.url} />
          <meta name='og:image' content={image.url} />
        </>
      )}
      <meta name='author' content='John Doe' />
    </>
  )
}

export default SeoContainer
