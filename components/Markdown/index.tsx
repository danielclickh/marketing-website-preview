import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'

function StrapiImage({ src, width, height, alt, ...props }: any) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
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

interface Props extends ReactMarkdownOptions {
  encloseByDiv?: boolean
}
function Markdown({
  children,
  components: componentsProp,
  className = '',
  encloseByDiv = true,
  ...props
}: Props) {
  const newComponents = components
  if (Object.keys(componentsProp ?? {}).length > 0) {
    Object.assign(newComponents, componentsProp)
  }
  return (
    <ReactMarkdown
      className={
        !encloseByDiv && className.length === 0
          ? undefined
          : `rich_content ${className}`
      }
      components={newComponents}
      rehypePlugins={[rehypeRaw]}
      {...props}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
