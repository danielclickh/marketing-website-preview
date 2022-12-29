import Image from 'next/image'
import React from 'react'
import { StrapiImageProps, StrapiPicProps } from './types'
import Markdown from '../Markdown'
import environment from '../../environment'

async function StrapiSvg({
  url,
  className = '',
  width,
  height
}: StrapiImageProps) {
  const response = await fetch(`${environment.strapiBaseUrl}${url}`)
  const svgText = await response.text()

  return (
    <Markdown
      encloseByDiv={false}
      components={{
        svg: ({ node, ...params }) => {
          return (
            <svg
              {...params}
              className={`fill-current ${className}`}
              width={width ?? undefined}
              height={height ?? undefined}
            />
          )
        }
      }}>
      {svgText}
    </Markdown>
  )
}

function StrapiImageUrl({
  id,
  url,
  sizes,
  className = '',
  formats,
  alt = '',
  width,
  height,
  ...props
}: Omit<StrapiImageProps, 'mime'>) {
  if (typeof url !== 'string') {
    return null
  }

  const src = sizes && formats ? formats[sizes].url : url

  return (
    <Image
      src={src}
      alt={alt ?? props.alternativeText}
      className={className}
      width={width as number}
      height={height as number}
      unoptimized
    />
  )
}

export function StrapiImage({ mime, ...props }: StrapiImageProps) {
  if (!mime.includes('svg')) {
    return <StrapiImageUrl {...props} />
  }
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <StrapiSvg {...props} />
    </>
  )
}

export function StrapiPicture({
  dark,
  light,
  className,
  id,
  ...props
}: StrapiPicProps) {
  return (
    <>
      <StrapiImage
        className={`hidden dark:block ${className}`}
        {...dark}
        {...props}
      />
      <StrapiImage
        className={`dark:hidden ${className}`}
        {...light}
        {...props}
      />
    </>
  )
}
