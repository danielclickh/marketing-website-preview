import React from 'react'

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
      {type && <meta name='og:type' content={type} />}
      {siteName && <meta name='og:site_name' content={siteName} />}

      {image?.url && image.url.length > 0 && (
        <>
          <meta name='twitter:image' content={image.url} />
          <meta name='og:image' content={image.url} />
        </>
      )}
      <meta name='author' content='ClickHouse' />
    </>
  )
}

export default SeoContainer
