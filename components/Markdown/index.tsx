import React from 'react'
import ReactMarkdown from 'react-markdown'
import Image, { ImageProps } from 'next/image'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'

function StrapiImage({ src, width, height, alt, ...props }: any) {
  return (
    <img
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${src}`}
      width={width}
      height={height}
      alt={alt ?? 'Markdown Image'}
      className='w-auto max-w-full h-auto'
      {...props}
    />
  )
}
const components = {
  img: StrapiImage
}

function Markdown({
  children,
  components: componentsProp,
  ...props
}: ReactMarkdownOptions) {
  const newComponents = components
  if (Object.keys(componentsProp ?? {}).length > 0) {
    Object.assign(newComponents, componentsProp)
  }
  return (
    <ReactMarkdown
      components={newComponents}
      rehypePlugins={[rehypeRaw]}
      {...props}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
