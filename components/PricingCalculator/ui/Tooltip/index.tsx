import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useState, useRef } from 'react'

function InfoTooltip({ content }: { content: string }) {
  const triggerRef = useRef(null)
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger
          asChild
          ref={triggerRef}
          onClick={(e) => e.preventDefault()}>
          <button
            className='cursor-pointer appearance-none align-middle'
            tabIndex={0}>
            <InformationCircleIcon
              className='h-3.5 w-3.5'
              onClick={(e) => e.preventDefault()}
            />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            onPointerDownOutside={(event) => {
              if (event.target === triggerRef.current) event.preventDefault()
            }}
            className='rounded-sm bg-neutral-725 p-2 text-sm text-neutral-0'
            sideOffset={5}
            side='right'>
            {content}
            <Tooltip.Arrow className='fill-neutral-725' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default function Info({ content }: { content: string }) {
  const [showing, setShowing] = useState(false)
  const toggle = () => setShowing(!showing)

  return (
    <div
      className='flex flex-wrap items-center gap-1 text-xs font-medium text-neutral-0/50'
      onClick={toggle}>
      <div className='hidden leading-none lg:block'>
        <InfoTooltip content={content} />
      </div>
      <span className='lg:hidden'>
        <InformationCircleIcon className='h-3.5 w-3.5' />
      </span>
      <div
        className={
          showing
            ? 'w-100 relative mt-2 shrink grow whitespace-normal rounded bg-neutral-700 p-2 lg:hidden'
            : 'hidden'
        }>
        <div className='invisible absolute top-0 left-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-[""]'></div>
        {content}
      </div>
    </div>
  )
}
