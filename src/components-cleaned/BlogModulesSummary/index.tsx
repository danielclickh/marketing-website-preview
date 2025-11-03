import Markdown from '@/components/Markdown'
import { SuiTitle } from '@/components/sui'
import { BlogModuleSummary } from '@/types/strapi'
import React from 'react'

export default function BlogModulesSummary({
  title,
  summary
}: BlogModuleSummary) {
  return (
    <div className='flex overflow-hidden rounded-lg'>
      <div className='w-1 flex-shrink-0 flex-grow-0 bg-primary-300' />
      <div className='flex-1 bg-neutral-700 p-4 lg:p-6'>
        <SuiTitle type='h2' className='mb-4 !text-2xl'>
          {title}
        </SuiTitle>
        <Markdown
          allowDirectives={false}
          className='rich-text-content toc-ignore leading-6'
          allowHeaderLink={false}>
          {summary}
        </Markdown>
      </div>
    </div>
  )
}

export function blogModulesSummaryMarkdown({
  title,
  summary
}: BlogModuleSummary) {
  return `## ${title}

${summary}`
}
