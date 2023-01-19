import React from 'react'

interface SeoMetadata {
  title?: string
  description?: string
  image?: { url: string }[]
  type?: string
  siteName?: string
}

function SeoContainer({
  image,
  title = '',
  description = '',
  type,
  siteName
}: SeoMetadata) {
  const imageUrl = image?.[0]?.url

  return (
    <>
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

      {imageUrl && imageUrl.length > 0 && (
        <>
          <meta name='twitter:image' content={imageUrl} />
          <meta property='og:image' content={imageUrl} />
        </>
      )}
      <meta name='author' content='ClickHouse' />
    </>
  )
}

export default SeoContainer
