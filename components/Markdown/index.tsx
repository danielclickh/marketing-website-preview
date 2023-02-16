import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  PluggableList,
  ReactMarkdownOptions
} from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug-custom-id'

import { SuiTitle } from '../sui'
import { AllowedElements, HighLightOptions, sanitizeMarkdown } from './utils'

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
const commonPlugIns: PluggableList = [
  rehypeRaw,
  [
    rehypeSlug,
    {
      enableCustomId: true
    }
  ]
]

function Header(props: any) {
  let { id, ...otherProps } = props
  id = id.replaceAll('-', '')
  return (
    <div className='md-header-container'>
      <SuiTitle {...otherProps} id={id} />
    </div>
  )
}

function getDefaultComponents() {
  return {
    img: StrapiImage,
    h1: (props: any) => <Header type='h1' {...props} />,
    h2: (props: any) => <Header type='h2' {...props} />,
    h3: (props: any) => <Header type='h3' {...props} />,
    h4: (props: any) => <Header type='h4' {...props} />,
    h5: (props: any) => <Header type='h5' {...props} />,
    h6: (props: any) => <Header type='h6' {...props} />
  }
}

interface Props extends ReactMarkdownOptions {
  encloseByDiv?: boolean
  ignoreAnchor?: boolean
}

const getIgnoreAnchor = () => ({
  a: ({ href, node, ...props }: any) => <span {...props} />
})

function Markdown({
  children,
  components: componentsProp,
  ignoreAnchor = false,
  className = '',
  encloseByDiv = true,
  rehypePlugins = [],
  remarkPlugins = [],
  ...props
}: Props) {
  const newComponents = getDefaultComponents()
  if (Object.keys(componentsProp ?? {}).length > 0) {
    Object.assign(newComponents, componentsProp)
  }

  if (ignoreAnchor) {
    Object.assign(newComponents, getIgnoreAnchor())
  }

  if (encloseByDiv) {
    props.allowedElements = AllowedElements
  }
  children = sanitizeMarkdown(children)

  rehypePlugins = commonPlugIns.concat(rehypePlugins)
  remarkPlugins.push(remarkGfm)
  if (encloseByDiv) {
    rehypePlugins.push([rehypeHighlight, HighLightOptions])
  }

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
      remarkPlugins={remarkPlugins}
      {...props}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
