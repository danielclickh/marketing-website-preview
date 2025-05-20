'use client'

import AccordionItem, {
  AccordionItemProps
} from '@/components-cleaned/AccordionItem'
import { useState, Fragment } from 'react'

export interface AccordionsProps {
  items: Array<AccordionItemProps>
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
  return (
    <div className={`space-y-6 ${className}`}>
      {items.map(({ children: itemChildren, ...item }, index) => {
        return (
          <Fragment key={index}>
            <div className={index >= paged ? 'hidden' : 'block'}>
              <AccordionItem
                handle={item.handle}
                prefix={
                  numbered ? (
                    <NumberPrefix
                      value={`${index + 1}`.padStart(
                        items.length.toString().length + 1,
                        '0'
                      )}
                    />
                  ) : undefined
                }>
                {itemChildren}
              </AccordionItem>
            </div>
          </Fragment>
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
