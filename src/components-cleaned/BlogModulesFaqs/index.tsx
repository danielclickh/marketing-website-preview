import Accordion from '@/components-cleaned/Accordion'
import Markdown from '@/components/Markdown'
import { SuiTitle } from '@/components/sui'
import { BlogModuleFaqs } from '@/types/strapi'
import React from 'react'

export default function BlogModulesFaqs({ title, items }: BlogModuleFaqs) {
  return (
    <>
      {title && (
        <SuiTitle type='h2' className='!text-2xl'>
          {title}
        </SuiTitle>
      )}
      <Accordion
        items={items.map((item) => ({
          handle: item.question,
          content: (
            <Markdown className='rich-text-content toc-ignore'>
              {item.answer}
            </Markdown>
          )
        }))}
      />
    </>
  )
}

export function blogModulesFaqsMarkdown({ title, items }: BlogModuleFaqs) {
  let md = `## ${title}\n\n`

  items.forEach((item, itemIndex) => {
    md += `### Question ${itemIndex + 1}: ${item.question}\n\n`
    md += item.answer
  })

  return md
}
