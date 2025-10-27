import Accordion from '@/components-cleaned/Accordion'
import Markdown from '@/components/Markdown'
import { SuiTitle } from '@/components/sui'
import { BlogModuleFaqs } from '@/types/strapi'
import React from 'react'

export default function BlogModulesFaqs({ title, items }: BlogModuleFaqs) {
  return (
    <>
      {title && <SuiTitle type='h3'>{title}</SuiTitle>}
      <Accordion
        items={items.map((item) => ({
          handle: item.question,
          content: (
            <Markdown className='rich-text-content'>{item.answer}</Markdown>
          )
        }))}
      />
    </>
  )
}
