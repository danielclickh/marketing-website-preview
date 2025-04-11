module.exports = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  jsxSingleQuote: true,
  parser: 'typescript',
  printWidth: 80,
  proseWrap: 'preserve',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ],
  overrides: [
    {
      files: '*.css',
      options: {
        parser: 'css'
      }
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    },
    {
      files: '*.json',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown'
      }
    },
    {
      files: '*.mdx',
      options: {
        parser: 'mdx'
      }
    }
  ]
}
