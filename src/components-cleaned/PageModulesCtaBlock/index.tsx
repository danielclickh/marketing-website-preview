import { CUIButton } from '@/components/ClickUI'
import Markdown from '@/components/Markdown'
import { PageModuleCtaBlock } from '@/types/strapi'
import React from 'react'

export default function PageModulesCtaBlock({
  content,
  primary,
  secondary
}: PageModuleCtaBlock) {
  return (
    <section className='section-container my-6 md:my-16 lg:my-24'>
      <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-6 text-center md:py-16'>
        <Markdown
          allowDirectives={false}
          className='rich-text-content theme-dark leading-6'
          allowHeaderLink={false}>
          {content}
        </Markdown>
        <p className='mt-8 flex flex-col justify-center gap-2 sm:flex-row sm:gap-4'>
          <CUIButton
            type='primary-dark'
            size='lg'
            className='group mx-auto w-full !px-10 md:w-auto'
            target={primary.target}
            href={primary.href}>
            {primary.text}
          </CUIButton>
          {secondary && (
            <CUIButton
              type='secondary'
              size='lg'
              className='group mx-auto w-full !border-neutral-800 !px-10 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white md:w-auto'
              target={secondary.target}
              href={secondary.href}>
              {secondary.text}
            </CUIButton>
          )}
        </p>
      </div>
    </section>
  )
}
