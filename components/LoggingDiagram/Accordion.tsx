import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import Image from 'next/image'
import React, { forwardRef, useRef, useState } from 'react'
import Markdown from '../../components/Markdown'
import { SuiTitle } from '../sui'
import accordionItems from './building-a-logging-system.json'
import Diagram from './LoggingDiagram'

const AccordionComponent = () => {
  const [activeItem, setActiveItem] = useState('')
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
          ClickHouse for Observability
        </SuiTitle>
        <p className='mx-auto mb-12 max-w-3xl px-9 pt-6 text-center'>
          When it comes to telemetry data types, often referred to as M.E.L.T.
          (metrics, events, logs, and traces), ClickHouse shines in its ability
          to perform a huge range of analytical functions over massive volumes
          of data - leveraging features like high compression rates to ensure
          robust performance at scale.
        </p>
      </div>
      <div className='mx-auto max-w-4xl pb-12 2xl:max-w-5xl'>
        <div
          className='mx-auto flex w-full flex-col justify-between gap-x-10 lg:flex-row'
          id='diagramTop'>
          <div className='flex-0 xl:mb-0'>
            <Diagram sectionId={strippedItemId(activeItem)} />
          </div>
          <div className='w-full pt-4 lg:w-2/3 2xl:pt-5'>
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
        'group z-20 my-2 flex flex-1 items-center justify-between rounded-sm border border-jet bg-[rgb(26,26,26)]/80 p-4 pr-6 text-base font-[500] leading-none outline-none hover:cursor-pointer hover:bg-neutral-750 hover:bg-opacity-40 data-[state=open]:rounded-b-none data-[state=open]:border-b-0  data-[state=open]:bg-neutral-750 data-[state=open]:pb-2',
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

const AccordionContent = forwardRef<
  HTMLDivElement,
  Accordion.AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'hide-scrollbar group relative z-10 mb-2 -mt-4 rounded-b-md border border-jet group-data-[state=open]:pb-20 xl:overflow-hidden xl:overflow-y-scroll',
      className
    )}
    {...props}
    ref={forwardedRef}>
    <div className='border-t-5 data border-jet p-4 pt-4 text-sm group-data-[state=open]:bg-neutral-750'>
      {children}
    </div>
  </Accordion.Content>
))

export default AccordionComponent
