import 'server-only'
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
import HeaderLink from './HeaderLink'

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
  let { id, showHeaderLink, ...otherProps } = props
  id = id.replaceAll('-', '')
  const title = <SuiTitle {...otherProps} id={id} />

  if (!showHeaderLink) {
    return <div className='md-header-container'>{title}</div>
  }

  return <HeaderLink id={id}>{title}</HeaderLink>
}

function getDefaultComponents({ showHeaderLink }: { showHeaderLink: boolean }) {
  return {
    img: StrapiImage,
    h1: (props: any) => (
      <Header type='h2' showHeaderLink={showHeaderLink} {...props} />
    ),
    h2: (props: any) => (
      <Header type='h2' showHeaderLink={showHeaderLink} {...props} />
    ),
    h3: (props: any) => (
      <Header type='h3' showHeaderLink={showHeaderLink} {...props} />
    ),
    h4: (props: any) => (
      <Header type='h4' showHeaderLink={showHeaderLink} {...props} />
    ),
    h5: (props: any) => (
      <Header type='h5' showHeaderLink={showHeaderLink} {...props} />
    ),
    h6: (props: any) => (
      <Header type='h6' showHeaderLink={showHeaderLink} {...props} />
    )
  }
}

interface Props extends ReactMarkdownOptions {
  encloseByDiv?: boolean
  showHeaderLink?: boolean
}

function Markdown({
  children,
  components: componentsProp,
  className = '',
  encloseByDiv = true,
  showHeaderLink = false,
  rehypePlugins = [],
  remarkPlugins = [],
  ...props
}: Props) {
  const newComponents = getDefaultComponents({ showHeaderLink })
  if (Object.keys(componentsProp ?? {}).length > 0) {
    Object.assign(newComponents, componentsProp)
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
