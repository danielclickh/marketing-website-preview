import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'

const TooltipInfo = ({ content }: { content: string | React.ReactNode }) => {
  return (
    <Tooltip.Provider delayDuration={0} disableHoverableContent={false}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className='inline-flex h-[16px] w-[16px] items-center justify-center rounded-full text-[#B3B6BD] outline-none'>
            <InformationCircleIcon className='h-[16px] w-[16px]' />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side='top'
            align='start'
            className='max-w-[300px] whitespace-pre-wrap rounded-[4px] bg-neutral-725 px-[15px] py-[10px] text-sm leading-normal will-change-[transform,opacity]'
            sideOffset={5}>
            {content}
            <Tooltip.Arrow className='fill-neutral-725' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TooltipInfo
