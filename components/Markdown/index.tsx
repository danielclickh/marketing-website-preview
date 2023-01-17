import 'server-only'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { SuiTitle } from '../sui'
import { AllowedElements, HighLightOptions } from './utils'

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
  img: StrapiImage,
  h1: (props: any) => <SuiTitle type='h2' {...props} />,
  h2: (props: any) => <SuiTitle type='h2' {...props} />,
  h3: (props: any) => <SuiTitle type='h3' {...props} />,
  h4: (props: any) => <SuiTitle type='h4' {...props} />,
  h5: (props: any) => <SuiTitle type='h5' {...props} />,
  h6: (props: any) => <SuiTitle type='h6' {...props} />
}

interface Props extends ReactMarkdownOptions {
  encloseByDiv?: boolean
}

function Markdown({
  children,
  components: componentsProp,
  className = '',
  encloseByDiv = true,
  rehypePlugins,
  ...props
}: Props) {
  const newComponents = components
  if (Object.keys(componentsProp ?? {}).length > 0) {
    Object.assign(newComponents, componentsProp)
  }
  if (encloseByDiv) {
    props.allowedElements = AllowedElements
  }

  children = children.replace(/``` text\n/gi, '``` newText\n')
  rehypePlugins = encloseByDiv
    ? [...(rehypePlugins ?? []), rehypeRaw, [rehypeHighlight, HighLightOptions]]
    : [...(rehypePlugins ?? []), rehypeRaw]

  return (
    <ReactMarkdown
      className={
        !encloseByDiv && className.length === 0
          ? undefined
          : `rich_content ${className}`
      }
      components={newComponents}
      unwrapDisallowed
      rehypePlugins={rehypePlugins}
      {...props}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
