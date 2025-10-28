import Markdown from '@/components/Markdown'
import { BlogModuleMarkdown } from '@/types/strapi'
import React from 'react'

export default function BlogModulesMarkdown({ body }: BlogModuleMarkdown) {
  return (
    <Markdown
      allowDirectives={false}
      className='rich-text-content leading-6'
      allowHeaderLink={true}>
      {body}
    </Markdown>
  )
}

export function blogModulesMarkdownMarkdown({ body }: BlogModuleMarkdown) {
  return body
}
