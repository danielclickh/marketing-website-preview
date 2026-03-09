'use client'

import AccordionItem, {
  AccordionItemProps
} from '@/components-cleaned/AccordionItem'
import Markdown from '@/components/Markdown'
import { useEffect, useMemo, useState } from 'react'

interface AccordionsItem extends Omit<AccordionItemProps, 'children'> {
  content: AccordionItemProps['children'] | string
}

export interface AccordionsProps {
  items: Array<AccordionsItem>
  numbered?: boolean
  perPage?: number
  className?: string
  allowMultiple?: boolean
}

export default function Accordion({
  perPage,
  numbered = true,
  items,
  className = '',
  allowMultiple = true
}: AccordionsProps) {
  perPage = perPage || items.length
  const [paged, setPaged] = useState<number>(perPage)
  const hasMore = items.length > paged
  const numberedPrefixLength = items.length.toString().length

  // When single-open mode is enabled, we track the open index.
  // Initialise from any item with `open` or `defaultOpen`.
  const initialOpenIndex = useMemo(() => {
    if (allowMultiple) return null
    const idx = items.findIndex((it) => it.open ?? it.defaultOpen)
    return idx >= 0 ? idx : null
  }, [allowMultiple, items])

  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex)

  // If allowMultiple flips from true -> false, or items change,
  // recompute a sensible initial open index.
  useEffect(() => {
    if (!allowMultiple) {
      setOpenIndex(initialOpenIndex)
    } else {
      // in multi mode, parent doesn't control anything
      setOpenIndex(null)
    }
  }, [allowMultiple, initialOpenIndex])

  return (
    <div className={`space-y-6 ${className}`}>
      {items.map(({ content, handle, prefix, onToggle, ...item }, index) => {
        const paddedNumber = `${index + 1}`.padStart(
          numberedPrefixLength < 2
            ? numberedPrefixLength + 1
            : numberedPrefixLength,
          '0'
        )

        // When single-open: parent controls `open` and closes others automatically.
        const controlledProps = !allowMultiple
          ? {
              open: index === openIndex,
              onToggle: (next: boolean) => {
                // If opening this one, close any other by setting this index.
                // If toggling an open one closed, set to null.
                setOpenIndex((curr) =>
                  next ? index : curr === index ? null : curr
                )
                // Call item's own onToggle if provided.
                onToggle?.(next)
              }
            }
          : {
              // Multi mode: keep item-level behavior intact.
              onToggle
            }

        return (
          <div key={index} className={index >= paged ? 'hidden' : 'block'}>
            <AccordionItem
              handle={handle}
              prefix={
                prefix ||
                (numbered ? <NumberPrefix value={paddedNumber} /> : undefined)
              }
              {...item}
              {...controlledProps}>
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
