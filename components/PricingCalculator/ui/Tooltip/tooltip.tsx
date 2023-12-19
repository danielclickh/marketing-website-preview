import * as Tooltip from '@radix-ui/react-tooltip'
import { InformationCircleIcon } from '@heroicons/react/outline'

const TooltipInfo = ({ content }: { content: string }) => {
  return (
    <Tooltip.Provider delayDuration={0} disableHoverableContent={false}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className='inline-flex h-[20px] w-[20px] items-center justify-center rounded-full text-[#B3B6BD] outline-none'>
            <InformationCircleIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side='top'
            align='start'
            className='max-w-[350px] rounded-[4px] bg-neutral-800 px-[15px] py-[10px] text-sm leading-normal will-change-[transform,opacity]'
            sideOffset={5}>
            {content}
            <Tooltip.Arrow className='fill-neutral-800' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TooltipInfo
