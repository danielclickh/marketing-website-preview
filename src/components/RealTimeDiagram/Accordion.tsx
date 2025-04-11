import Markdown from '../Markdown'
import { SuiTitle } from '../sui'
import Diagram from './Diagram'
import accordionItems from './accordion-items.json'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import Image from 'next/image'
import { forwardRef, useRef, useState } from 'react'

const AccordionComponent = () => {
  const [activeItem, setActiveItem] = useState('item-0')
  const strippedItemId = (activeItemRadix: string) => {
    const itemId = activeItemRadix.replace('item-', '')
    return parseInt(itemId, 10)
  }

  const selectedAccordionRef = useRef<HTMLDivElement>(null)

  return (
    <div className='rounded-xl border border-neutral-700/80 bg-neutral-900/50 p-6'>
      <div className='flex w-full flex-col items-center pt-6'>
        <Image
          src='/images/use-cases/logging/icon-how.svg'
          alt='System overview'
          width={72}
          height={73}
        />
        <SuiTitle type='h2' className='mt-8 text-center'>
          ClickHouse for real-time analytics
        </SuiTitle>
        <p className='mx-auto mb-10 max-w-4xl px-9 pt-6 text-center'>
          Whether you’re building user-facing dashboards, instantly responsive
          applications, or analyzing data on the fly, ClickHouse has you
          covered. We’re built to ensure that even the most sophisticated data
          analysis can be done intuitively, using simple SQL.
        </p>
        <p className='mx-auto mb-12 max-w-3xl px-9 text-center'>
          Our parallelized query execution engine, best-in-class compression
          rates, and column-oriented design deliver unparalleled performance at
          scale so that you can focus on insights and forget worrying about
          infrastructure.
        </p>
      </div>
      <div className='mx-auto pb-12 md:px-12'>
        <div
          className='mx-auto flex w-full flex-col justify-between gap-x-5 lg:flex-row'
          id='diagramTop'>
          <div className='lg:w-3/5 xl:mb-0'>
            <Diagram sectionId={strippedItemId(activeItem)} />
          </div>
          <div className='w-full pt-4 lg:w-2/5 2xl:pt-2'>
            <div className='h-full w-full'>
              <Accordion.Root
                id='accordionContainer'
                className='w-full'
                type='single'
                collapsible
                onValueChange={(item) => {
                  setActiveItem(item)
                }}>
                {accordionItems.map((item) => (
                  <AccordionItem
                    value={`item-${item.id}`}
                    key={item.id}
                    ref={
                      item.id === strippedItemId(activeItem)
                        ? selectedAccordionRef
                        : null
                    }>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>
                      <Markdown>{item.content}</Markdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AccordionItem = forwardRef<HTMLDivElement, Accordion.AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <div ref={forwardedRef}>
      <Accordion.Item className={classNames('', className)} {...props}>
        {children}
      </Accordion.Item>
    </div>
  )
)

AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  Accordion.AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className='flex'>
    <Accordion.Trigger
      className={classNames(
        'group z-20 my-2 flex flex-1 items-center justify-between rounded-sm border border-jet bg-[rgb(26,26,26)]/80 p-4 text-base font-[500] leading-none outline-none hover:cursor-pointer hover:bg-neutral-750 hover:bg-opacity-40 data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-neutral-750 data-[state=open]:pb-2 xl:pr-6',
        className
      )}
      {...props}
      ref={forwardedRef}>
      <p>{children}</p>
      <div className='relative flex items-center'>
        <PlusIcon
          className='absolute right-0 h-6 w-6 transition-all duration-[350ms] ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:-rotate-180 group-data-[state=open]:opacity-0'
          aria-hidden
        />
        <MinusIcon
          className='absolute right-0 h-6 w-6 opacity-0 transition-all duration-[350ms] ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:block group-data-[state=open]:-rotate-180 group-data-[state=open]:opacity-100'
          aria-hidden
        />
      </div>
    </Accordion.Trigger>
  </Accordion.Header>
))

AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = forwardRef<
  HTMLDivElement,
  Accordion.AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'hide-scrollbar group relative z-10 -mt-4 mb-2 rounded-b-md border border-jet group-data-[state=open]:pb-20 xl:overflow-hidden xl:overflow-y-scroll',
      className
    )}
    {...props}
    ref={forwardedRef}>
    <div className='border-t-5 data border-jet p-4 pt-4 text-sm group-data-[state=open]:bg-neutral-750'>
      {children}
    </div>
  </Accordion.Content>
))

AccordionContent.displayName = 'AccordionContent'

export default AccordionComponent
