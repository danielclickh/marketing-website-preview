import Accordion from '@/components-cleaned/Accordion'
import Markdown from '@/components/Markdown'
import { PageModuleFaqs } from '@/types/strapi'
import Image from 'next/image'
import React from 'react'

export default function PageModulesFaqs({ content, items }: PageModuleFaqs) {
  return (
    <section className='section-container bg-shadow-element my-6 md:my-16 lg:my-24 lg:flex lg:justify-between lg:gap-x-12'>
      <div className='mx-auto mb-10 max-w-md text-center lg:m-0 lg:text-left'>
        <Image
          src='/faq-icon.svg'
          alt='FAQ Icon'
          width={72}
          height={72}
          className='mx-auto mb-10 lg:mx-0'
        />
        <Markdown
          allowDirectives={false}
          className='rich-text-content leading-6'
          allowHeaderLink={false}>
          {content}
        </Markdown>
      </div>
      <Accordion
        className='mx-auto w-full max-w-2xl lg:mr-0'
        items={items.map((item) => ({
          handle: item.question,
          content: (
            <Markdown className='rich-text-content toc-ignore'>
              {item.answer}
            </Markdown>
          )
        }))}
      />
    </section>
  )
}
