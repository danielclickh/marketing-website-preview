export const HighLightOptions = {
  detect: true,
  subset: [
    'javascript',
    'sql',
    'bash',
    'cpp',
    'typescript',
    'nt',
    'plaintext',
    'csv'
  ],
  ignoreMissing: true,
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

export const AllowedElements = [
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

export function sanitizeMarkdown(children: string): string {
  children = children.replaceAll(
    /<[[:<:]]pre[[:>:]]([^>]*)?(\/?)(>(\s+)?<[[:<:]]code[[:>:]][^>]*?(\/?))?(>(\s+)?<[[:<:]]div[[:>:]][^>]*?(\/?))?>(.*?)<(\/div>(.*?))?(\/code>\s+?)?(\/pre>)/gis,
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

  children = children.replaceAll(
    /^#{1,6}\s+.*\{((?!#).*)?\}(\s+)?$/gm,
    (currentValue, match1) => {
      return currentValue.replaceAll(match1, `#${match1}`)
    }
  )

  return children
}
