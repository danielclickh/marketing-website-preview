import Markdown from '@/components/Markdown'
import { PageModuleMarkdown } from '@/types/strapi'
import React from 'react'

export default function PageModulesMarkdown({ body }: PageModuleMarkdown) {
  return (
    <section className='section-container my-16 lg:my-24'>
      <Markdown
        allowDirectives={false}
        className='rich-text-content leading-6'
        allowHeaderLink={false}>
        {body}
      </Markdown>
    </section>
  )
}
