// import 'server-only'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { SuiTitle } from '../sui'

const allowedElements = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
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
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'basefont',
  'center',
  'dir',
  'frame',
  'frameset',
  'menu',
  'menuitem',
  'noframes'
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
  ...props
}: Props) {
  const newComponents = components
  if (Object.keys(componentsProp ?? {}).length > 0) {
    Object.assign(newComponents, componentsProp)
  }
  if (encloseByDiv) {
    props.allowedElements = allowedElements
  }

  children = children.replace(/``` text\n/gi, '``` newText\n')
  const rehypePlugins = encloseByDiv
    ? [
        [rehypeRaw],
        [
          rehypeHighlight,
          {
            detect: true,
            subset: [
              'javascript',
              'sql',
              'bash',
              'cpp',
              'typescript',
              'nt',
              'plaintext'
            ],
            languages: {
              newText: function (hljs: any) {
                const COMMENT_MODE = hljs.COMMENT('--', '$')
                const NESTED = {
                  match: [
                    /^\s*(?=\S)/, // have to look forward here to avoid polynomial backtracking
                    /[^:]+/,
                    /:\s*/,
                    /$/
                  ],
                  className: {
                    2: 'attribute',
                    3: 'punctuation'
                  }
                }
                const DICTIONARY_ITEM = {
                  match: [
                    /^\s*(?=\S)/, // have to look forward here to avoid polynomial backtracking
                    /[^:]*[^: ]/,
                    /[ ]*:/,
                    /[ ]/,
                    /.*$/
                  ],
                  className: {
                    2: 'attribute',
                    3: 'punctuation',
                    5: 'string'
                  }
                }
                const STRING = {
                  className: 'string',
                  variants: [
                    {
                      begin: /'/,
                      end: /'/,
                      contains: [{ begin: /''/ }]
                    }
                  ]
                }
                const LIST_ITEM = {
                  variants: [
                    { match: [/^\s*/, /-/, /[ ]/, /.*$/] },
                    { match: [/^\s*/, /-$/] }
                  ],
                  className: {
                    2: 'bullet',
                    4: 'string'
                  }
                }
                const QUOTED_IDENTIFIER = {
                  begin: /"/,
                  end: /"/,
                  contains: [{ begin: /""/ }]
                }

                return {
                  name: 'New Text',
                  aliases: ['text', 'txt', 'newText'],
                  contains: [
                    hljs.inherit(hljs.HASH_COMMENT_MODE, {
                      begin: /^\s*(?=#)/,
                      excludeBegin: true
                    }),
                    LIST_ITEM,
                    COMMENT_MODE,
                    STRING,
                    NESTED,
                    QUOTED_IDENTIFIER,
                    hljs.C_NUMBER_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    hljs.HASH_COMMENT_MODE,
                    DICTIONARY_ITEM
                  ]
                }
              }
            }
          }
        ]
      ]
    : [rehypeRaw]

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
