'use client'

import AccordionItem, {
  AccordionItemProps
} from '@/components-cleaned/AccordionItem'
import Markdown from '@/components/Markdown'
import { useState, Fragment } from 'react'

interface AccordionsItem extends Omit<AccordionItemProps, 'children'> {
  content: AccordionItemProps['children'] | string
}

export interface AccordionsProps {
  items: Array<AccordionsItem>
  numbered?: boolean
  perPage?: number
  className?: string
}

export default function Accordion({
  perPage,
  numbered = true,
  items,
  className = ''
}: AccordionsProps) {
  perPage = perPage || items.length
  const [paged, setPaged] = useState<number>(perPage)
  const hasMore = items.length > paged
  const numberedPrefixLength = items.length.toString().length
  return (
    <div className={`space-y-6 ${className}`}>
      {items.map(({ content, handle, prefix, ...item }, index) => {
        const paddedNumber = `${index + 1}`.padStart(
          numberedPrefixLength < 2
            ? numberedPrefixLength + 1
            : numberedPrefixLength,
          '0'
        )
        return (
          <div key={index} className={index >= paged ? 'hidden' : 'block'}>
            <AccordionItem
              handle={handle}
              prefix={
                prefix ||
                (numbered ? <NumberPrefix value={paddedNumber} /> : undefined)
              }
              {...item}>
              {typeof content === 'string' ? (
                <Markdown className='rich-text-content'>{content}</Markdown>
              ) : (
                content
              )}
            </AccordionItem>
          </div>
        )
      })}
      {hasMore && (
        <button
          onClick={() => setPaged((old) => old + perPage)}
          className='mx-auto mt-6 block text-primary-300 decoration-2 hover:underline'>
          Load more
        </button>
      )}
    </div>
  )
}

function NumberPrefix({ value }: { value: string }) {
  return (
    <span
      className='inline-block text-center text-neutral-300/60'
      style={{ minWidth: `${value.length}ch` }}>
      {value}
    </span>
  )
}
