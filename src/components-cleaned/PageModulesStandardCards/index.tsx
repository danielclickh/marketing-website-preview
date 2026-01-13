import StrapiImage from '@/components-cleaned/StrapiImage'
import { CUICard } from '@/components/ClickUI'
import Markdown from '@/components/Markdown'
import { SuiTitle } from '@/components/sui'
import { PageModuleStandardCards } from '@/types/strapi'
import Link from 'next/link'
import React from 'react'

const columnClasses: Record<PageModuleStandardCards['columns'], string> = {
  Two: 'lg:grid-cols-2',
  Three: 'md:grid-cols-2 lg:grid-cols-3',
  Four: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
}

export default function PageModulesStandardCards({
  introduction,
  columns,
  items
}: PageModuleStandardCards) {
  return (
    <section className='section-container my-16 lg:my-24'>
      {introduction && (
        <Markdown
          allowDirectives={false}
          className='rich-text-content mb-10 leading-6'
          allowHeaderLink={false}>
          {introduction}
        </Markdown>
      )}
      <div className={`grid grid-cols-1 gap-6 ${columnClasses[columns]}`}>
        {items.map((item, itemIndex) => {
          return (
            <CUICard key={itemIndex} className='relative overflow-hidden'>
              {item.image && (
                <CUICard.Header>
                  <StrapiImage
                    entry={item.image}
                    width={400}
                    height={600}
                    className='aspect-video w-full max-w-none object-cover object-center'
                  />
                </CUICard.Header>
              )}
              {(item.icon || item.title || item.description) && (
                <CUICard.Body className='mb-auto space-y-6 p-6'>
                  {item.icon && (
                    <StrapiImage
                      entry={item.icon}
                      width={32}
                      height={32}
                      className='aspect-square size-8 max-w-none object-scale-down object-center'
                    />
                  )}
                  {item.title && <SuiTitle type='h3'>{item.title}</SuiTitle>}
                  {item.description && (
                    <p className='text-neutral-200'>{item.description}</p>
                  )}
                </CUICard.Body>
              )}
              {item.link && (
                <CUICard.Footer className='p-6 pt-0'>
                  <Link
                    href={item.link.href}
                    target={item.link.target}
                    className='fony-bold text-primary-300 hover:underline'>
                    <span className='absolute inset-0' />
                    {item.link.text}
                  </Link>
                </CUICard.Footer>
              )}
            </CUICard>
          )
        })}
      </div>
    </section>
  )
}
