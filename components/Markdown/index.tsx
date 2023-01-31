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
import rehypeSlug from 'rehype-slug'

import { SuiTitle } from '../sui'
import { AllowedElements, HighLightOptions } from './utils'
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
const commonPlugIns: PluggableList = [rehypeRaw, rehypeSlug]

function Header(props: any) {
  let id = props.id.replaceAll('-', '')
  return (
    <HeaderLink id={id}>
      <SuiTitle {...props} id={id} />
    </HeaderLink>
  )
}

function getDefaultComponents() {
  return {
    img: StrapiImage,
    h1: (props: any) => <Header type='h2' {...props} />,
    h2: (props: any) => <Header type='h2' {...props} />,
    h3: (props: any) => <Header type='h3' {...props} />,
    h4: (props: any) => <Header type='h4' {...props} />,
    h5: (props: any) => <Header type='h5' {...props} />,
    h6: (props: any) => <Header type='h6' {...props} />
  }
}

interface Props extends ReactMarkdownOptions {
  encloseByDiv?: boolean
}

function Markdown({
  children,
  components: componentsProp,
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
  if (encloseByDiv) {
    props.allowedElements = AllowedElements
  }

  children = children.replace(/``` text\n/gi, '``` newText\n')
  children = children.replaceAll(
    /<pre([^>]*)?(\/?)(>(\s+)?<code[^>]*?(\/?))?(>(\s+)?<div[^>]*?(\/?))?>(.*?)<(\/div>(.*?))?(\/code>\s+?)?(\/pre>)/gis,
    (
      currentValue,
      match1,
      match2,
      match3,
      match4,
      match5,
      match6,
      match7,
      match8,
      match9,
      match10
    ) => {
      return (
        "<div className='!p-0 !w-full'" +
        match1 +
        ' ' +
        match6 +
        '>\n' +
        '<pre>' +
        "<code class='ignore-default-color'>" +
        match9.replaceAll('\n', '<br />') +
        '</code>' +
        '</pre>' +
        '<' +
        match10 +
        '/div>'
      )
    }
  )

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
