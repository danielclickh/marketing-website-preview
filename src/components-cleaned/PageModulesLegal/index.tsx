'use client'

import Markdown from '@/components/Markdown'
import { PageModuleLegal } from '@/types/strapi'
import { useEffect, useRef } from 'react'

export default function PageModulesLegal({ body }: PageModuleLegal) {
  const contentRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const contentEl = contentRef.current
    if (!contentEl) return

    const preventSelection = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
      window.alert('Please request a copy from legal@clickhouse.com')
      return false
    }

    contentEl.addEventListener('selectstart', preventSelection)

    return () => contentEl.removeEventListener('selectstart', preventSelection)
  }, [contentRef.current])
  return (
    <section className='section-container my-16 lg:my-24' ref={contentRef}>
      <div className='select-none print:hidden'>
        <Markdown
          allowDirectives={false}
          className='rich-text-content leading-6'
          allowHeaderLink={false}>
          {body}
        </Markdown>
      </div>
      <div className='hidden text-black print:block'>
        Please request a copy from legal@clickhouse.com
      </div>
    </section>
  )
}
