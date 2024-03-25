import React, { MouseEventHandler, useState } from 'react'
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
import { CUILink } from '../ClickUI'
import * as Tooltip from '@radix-ui/react-tooltip'

function StrapiImage({ src, width, height, alt, ...props }: any) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={width}
      height={height}
      alt={alt ?? 'Markdown Image'}
      className='h-auto w-auto max-w-full'
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
  let { id, allowHeaderLink, ...otherProps } = props
  if (!allowHeaderLink) {
    id = id.replaceAll('-', '')
  }
  const [isOpen, setIsOpen] = useState(false)
  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    const href = e.currentTarget.href
    history.pushState({}, '', href)
    navigator.clipboard.writeText(href)
    setIsOpen(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }
  return (
    <div className='md-header-container'>
      <SuiTitle {...otherProps} id={id} />
      {(isOpen || allowHeaderLink) && (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root open={isOpen}>
            <Tooltip.Trigger asChild>
              <div>
                <CUILink
                  href={{
                    hash: id
                  }}
                  className={`link ${isOpen ? 'open' : ''}`}
                  onClick={onClick}>
                  #
                </CUILink>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className='rounded-lg bg-neutral-750 px-3 py-2 shadow-click-card'
                sideOffset={5}
                side='top'>
                Copied
                <Tooltip.Arrow className='fill-neutral-750' />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  )
}

interface DefaultComponentProps {
  allowHeaderLink: boolean
}

function getDefaultComponents({ allowHeaderLink }: DefaultComponentProps) {
  return {
    img: StrapiImage,
    h1: (props: any) => (
      <Header type='h1' allowHeaderLink={allowHeaderLink} {...props} />
    ),
    h2: (props: any) => (
      <Header type='h2' allowHeaderLink={allowHeaderLink} {...props} />
    ),
    h3: (props: any) => (
      <Header type='h3' allowHeaderLink={allowHeaderLink} {...props} />
    ),
    h4: (props: any) => (
      <Header type='h4' allowHeaderLink={allowHeaderLink} {...props} />
    ),
    h5: (props: any) => (
      <Header type='h5' allowHeaderLink={allowHeaderLink} {...props} />
    ),
    h6: (props: any) => (
      <Header type='h6' allowHeaderLink={allowHeaderLink} {...props} />
    )
  }
}

interface Props extends ReactMarkdownOptions {
  encloseByDiv?: boolean
  ignoreAnchor?: boolean
  allowHeaderLink?: boolean
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
  allowHeaderLink = false,
  allowedElements = [],
  ...props
}: Props) {
  const newComponents = getDefaultComponents({
    allowHeaderLink
  })
  if (Object.keys(componentsProp ?? {}).length > 0) {
    Object.assign(newComponents, componentsProp)
  }

  if (ignoreAnchor) {
    Object.assign(newComponents, getIgnoreAnchor())
  }

  // Merge default AllowedElements with component specific
  if (encloseByDiv) {
    allowedElements.push(...AllowedElements)
  }

  // Automatically allow component elements
  allowedElements.push(...Object.keys(newComponents))

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
      allowedElements={allowedElements}
      {...props}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
