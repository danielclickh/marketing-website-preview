import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import { SuiTitle } from '../sui'

const allowedElements = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul',
  'pre',
  'textarea',
  'svg'
]

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
  h1: (props: any) => <SuiTitle type='h1' {...props} />,
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
      allowedElements={allowedElements}
      unwrapDisallowed
      rehypePlugins={[rehypeRaw]}
      {...props}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
