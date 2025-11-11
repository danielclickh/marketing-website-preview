import Accordion from '@/components-cleaned/Accordion'
import Markdown from '@/components/Markdown'
import { SuiTitle } from '@/components/sui'
import { BlogModuleFaqs } from '@/types/strapi'
import React, { Fragment } from 'react'

export default function BlogModulesFaqs({
  title,
  items,
  displayType = 'Accordion'
}: BlogModuleFaqs) {
  return (
    <>
      {title && (
        <SuiTitle type='h2' className='!text-2xl'>
          {title}
        </SuiTitle>
      )}
      {displayType === 'Accordion' && (
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
      )}
      {displayType === 'Simple' &&
        items.map((item, itemIndex) => {
          return (
            <Fragment key={itemIndex}>
              <SuiTitle type='h3'>{item.question}</SuiTitle>
              <Markdown className='rich-text-content toc-ignore'>
                {item.answer}
              </Markdown>
            </Fragment>
          )
        })}
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
