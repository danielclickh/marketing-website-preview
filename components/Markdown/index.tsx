import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'

function StrapiImage({ src, width, height, alt, ...props }: any) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
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
  // p: ({ node, ...props }) => {
  //   // console.log('a', JSON.stringify(a))
  //   return <div {...props} />
  // }
}

function Markdown({
  children,
  components: componentsProp,
  className = '',
  ...props
}: ReactMarkdownOptions) {
  const newComponents = components
  if (Object.keys(componentsProp ?? {}).length > 0) {
    Object.assign(newComponents, componentsProp)
  }
  return (
    <ReactMarkdown
      className={`rich_content ${className}`}
      components={newComponents}
      rehypePlugins={[rehypeRaw]}
      {...props}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
