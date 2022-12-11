import React, { HTMLAttributes } from 'react'
import Markdown from '../Markdown'

interface Props extends HTMLAttributes<HTMLDivElement> {
  src: {
    data: {
      attributes: {
        url: string
      }
    }
  }
}

export function StrapiSvgClient(props: Props) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <StrapiSvg {...props} />
    </>
  )
}

export async function StrapiSvg({ src, ...props }: Props) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}${src.data.attributes.url}`
  )
  const svgText = await response.text()

  // return (
  //   <div
  //     dangerouslySetInnerHTML={{ __html: svgText }}
  //     className='strapi-svg-container'
  //     {...props}
  //   />
  // )
  return (
    <Markdown
      components={{
        svg: ({ node, ...params }) => {
          return <svg {...params} {...props} />
        }
      }}>
      {svgText}
    </Markdown>
  )
}
