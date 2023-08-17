import { ChevronDownIcon } from '@heroicons/react/solid'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import Image from 'next/image'
import React, { forwardRef, useRef, useState } from 'react'
import Markdown from '../../components/Markdown'
import { SuiTitle } from '../sui'
import accordionItems from './building-a-logging-system.json'
import Diagram from './Diagram'

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
          ClickHouse for ML & AI
        </SuiTitle>
        <p className='mx-auto mb-12 max-w-3xl px-9 pt-6 text-center'>
          ClickHouse is purpose-built to make deriving insights from complex
          data effortless. No matter how much data you're working with. Whether
          you're extracting valuable information for model training and
          evaluation through aggregations, running inference through our User
          Defined Functions, or performing vector search, ClickHouse enables you
          to maximize data efficiency and unlock the power of AI for any
          application.
        </p>
      </div>
      <div className='mx-auto px-12 pb-12'>
        <div
          className='mx-auto flex w-full flex-col justify-between gap-x-5 lg:flex-row'
          id='diagramTop'>
          <div className='lg:w-3/5 xl:mb-0'>
            <Diagram sectionId={strippedItemId(activeItem)} />
          </div>
          <div className='w-full pt-4 lg:w-2/5 2xl:pt-5'>
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
                      <Markdown children={item.content} />
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

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  Accordion.AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className='flex'>
    <Accordion.Trigger
      className={classNames(
        'group z-20 my-1 flex flex-1 items-center justify-between rounded-lg border border-neutral-600/80 bg-[#272727] p-4 text-base font-semibold leading-none outline-none hover:cursor-pointer data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-[#404040] data-[state=open]:pb-6 2xl:text-lg',
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
      'hide-scrollbar group relative z-10 -mt-4 mb-1 rounded-b-xl border border-neutral-600/80 bg-[#272727] group-data-[state=open]:pb-20 xl:overflow-hidden xl:overflow-y-scroll',
      className
    )}
    {...props}
    ref={forwardedRef}>
    <div className='border-t-5 data border-neutral-600/80 bg-[#272727] p-4 pt-4 group-data-[state=open]:bg-[#404040]'>
      {children}
    </div>
  </Accordion.Content>
))

export default AccordionComponent
