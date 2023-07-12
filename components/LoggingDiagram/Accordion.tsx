import { ChevronDownIcon } from '@heroicons/react/solid'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import React, { forwardRef, useRef, useState } from 'react'
import Markdown from '../../components/Markdown'
import accordionItems from './building-a-logging-system.json'
import Diagram from './LoggingDiagram'

const AccordionComponent = () => {
  const [activeItem, setActiveItem] = useState('item-20')
  const strippedItemId = (activeItemRadix: string) => {
    const itemId = activeItemRadix.replace('item-', '')
    return parseInt(itemId, 10)
  }

  const selectedAccordionRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className='mx-auto flex w-full flex-col rounded-xl border border-neutral-700/80 bg-neutral-900/50 p-4  lg:flex-row'
      id='diagramTop'>
      <div className='mb-12 w-full xl:mb-0 xl:w-1/2'>
        <Diagram className='lg:py-6' sectionId={strippedItemId(activeItem)} />
      </div>
      <div className='w-full xl:w-1/2'>
        <div className='h-full w-full'>
          <Accordion.Root
            id='accordionContainer'
            className='w-full'
            type='single'
            defaultValue='item-20'
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
                <AccordionTrigger>
                  <>{item.title}</>
                </AccordionTrigger>
                <AccordionContent>
                  <Markdown children={item.content} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion.Root>
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

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  Accordion.AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className='flex'>
    <Accordion.Trigger
      className={classNames(
        'group z-20 my-1 flex flex-1 items-center justify-between rounded-xl border border-neutral-600/80 bg-neutral-700 p-8 text-2xl font-semibold leading-none outline-none hover:cursor-pointer data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:pb-6',
        className
      )}
      {...props}
      ref={forwardedRef}>
      {children}
      <ChevronDownIcon
        className='text-violet10 h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180'
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
))

const AccordionContent = forwardRef<
  HTMLDivElement,
  Accordion.AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'hide-scrollbar z-10 -mt-4 mb-1 rounded-b-xl border border-neutral-600/80 bg-neutral-700 group-data-[state=open]:pb-20  xl:max-h-[550px] xl:overflow-hidden xl:overflow-y-scroll',
      className
    )}
    {...props}
    ref={forwardedRef}>
    <div className='border-t-5 border-neutral-600/80 bg-neutral-700 p-8 pt-4'>
      {children}
    </div>
  </Accordion.Content>
))

export default AccordionComponent
