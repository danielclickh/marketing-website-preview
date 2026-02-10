'use client'

import BlogImage from '../BlogImage'
import { CUILink } from '../ClickUI'
import CodeViewer from '../CodeViewer'
import { SuiTitle } from '../sui'
import { AllowedElements, HighLightOptions, sanitizeMarkdown } from './utils'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useRouter } from 'next/router'
import { memo, MouseEventHandler, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  PluggableList,
  ReactMarkdownOptions
} from 'react-markdown/lib/react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug-custom-id'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const commonPlugIns: PluggableList = [
  rehypeRaw,
  [
    rehypeSlug,
    {
      enableCustomId: true
    }
  ]
]

function Header({
  id,
  allowHeaderLink,
  className = '',
  children,
  ...otherProps
}: any) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  if (!allowHeaderLink) {
    id = id.replaceAll('-', '')
  }

  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const href = e.currentTarget.href
    setIsOpen(true)
    window.history.replaceState({}, '', href)
    window.navigator.clipboard.writeText(href).finally(() => {
      window.setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    })
  }
  return (
    <SuiTitle {...otherProps} className={`group/mdHeader ${className}`} id={id}>
      {children}
      {(isOpen || allowHeaderLink) && (
        <>
          {' '}
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root open={isOpen}>
              <Tooltip.Trigger asChild>
                <span
                  className={`transition-opacity ${isOpen ? '' : 'group-hover/mdHeader:opacity-100 has-hover:opacity-0'}`}>
                  <CUILink
                    href={{
                      hash: id
                    }}
                    onClick={onClick}>
                    #
                  </CUILink>
                </span>
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
        </>
      )}
    </SuiTitle>
  )
}

interface DefaultComponentProps {
  allowHeaderLink: boolean
}

const isResponsiveEmbed = (src?: string) => {
  if (!src) return false
  try {
    const { hostname } = new URL(src)
    return ['youtube.com', 'youtu.be', 'vimeo.com'].some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    )
  } catch {
    return false
  }
}

function getDefaultComponents({ allowHeaderLink }: DefaultComponentProps) {
  return {
    img: BlogImage,
    h1: ({ node, children, ...props }: any) => (
      <Header type='h1' allowHeaderLink={allowHeaderLink} {...props}>
        {children}
      </Header>
    ),
    h2: ({ node, children, ...props }: any) => (
      <Header type='h2' allowHeaderLink={allowHeaderLink} {...props}>
        {children}
      </Header>
    ),
    h3: ({ node, children, ...props }: any) => (
      <Header type='h3' allowHeaderLink={allowHeaderLink} {...props}>
        {children}
      </Header>
    ),
    h4: ({ node, children, ...props }: any) => (
      <Header type='h4' allowHeaderLink={allowHeaderLink} {...props}>
        {children}
      </Header>
    ),
    h5: ({ node, children, ...props }: any) => (
      <Header type='h5' allowHeaderLink={allowHeaderLink} {...props}>
        {children}
      </Header>
    ),
    h6: ({ node, children, ...props }: any) => (
      <Header type='h6' allowHeaderLink={allowHeaderLink} {...props}>
        {children}
      </Header>
    ),
    code: CodeViewer,
    table({ node, children, ...props }: any) {
      return (
        <div className='w-full overflow-x-auto'>
          <table {...props}>{children}</table>
        </div>
      )
    },
    p({ node, children, ...props }: any) {
      const child = children?.[0]
      if (typeof child === 'object' && child?.type === BlogImage) {
        return <>{children}</> // render image directly without <p>
      }
      return <p {...props}>{children}</p>
    },
    iframe({ node, src, children, ...props }: any) {
      const iframeEl = (
        <iframe src={src} {...props}>
          {children}
        </iframe>
      )

      if (isResponsiveEmbed(src)) {
        return <ResponsiveEmbed>{iframeEl}</ResponsiveEmbed>
      }

      return iframeEl
    }
  }
}

function directivePlugin() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'containerDirective' ||
        node.type === 'leafDirective'
      ) {
        const data = node.data || (node.data = {})

        data.hName = node.name // This is the tag that ReactMarkdown will "see" in components map.
        data.hProperties = node.attributes || {} // These are the props you can pass to your component.
      }
    })
  }
}

interface Props extends ReactMarkdownOptions {
  encloseByDiv?: boolean
  ignoreAnchor?: boolean
  allowHeaderLink?: boolean
  allowDirectives?: boolean
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
  allowDirectives = false,
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

  if (encloseByDiv) {
    props.allowedElements = AllowedElements

    // Automatically allow component elements
    props.allowedElements.push(...Object.keys(newComponents))
  }

  children = sanitizeMarkdown(children)

  if (allowDirectives) {
    remarkPlugins.push(remarkDirective)
    remarkPlugins.push(directivePlugin)
  }

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

export const MarkdownMemoized = memo(Markdown)

export default Markdown
