import { MarkdownMemoized } from '@/components/Markdown'
import TooltipInfo from '@/components/PricingCalculator/ui/Tooltip/tooltip'
import { PricingV2ComponentPerk } from '@/lib/api/strapi/types'
import { MinusIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import React from 'react'

const perkIcons: Record<
  PricingV2ComponentPerk['icon'],
  (className?: string) => React.ReactNode
> = {
  None() {
    return <></>
  },
  Tick(className) {
    return (
      <CheckIcon className={`h-4 w-4 flex-shrink-0 flex-grow-0 ${className}`} />
    )
  },
  Dash(className = '') {
    return (
      <MinusIcon className={`h-4 w-4 flex-shrink-0 flex-grow-0 ${className}`} />
    )
  }
}

export interface PerkItemProps extends PricingV2ComponentPerk {
  iconClassName?: string
}

export default function PerkItem({
  text,
  icon,
  tooltip,
  iconClassName = ''
}: PerkItemProps) {
  const PerkContent = () => {
    let tooltipAppended = false
    return (
      <MarkdownMemoized
        className='!text-white'
        components={{
          p({ children }) {
            const appendTooltip = tooltip && !tooltipAppended
            tooltipAppended = true
            return (
              <>
                {appendTooltip && (
                  <div className='mb-9 flex items-center gap-x-2 last:!mb-0'>
                    <p className='!mb-0'>{children}</p>
                    <TooltipInfo content={tooltip} />
                  </div>
                )}
                {!appendTooltip && <p>{children}</p>}
              </>
            )
          }
        }}>
        {text}
      </MarkdownMemoized>
    )
  }
  return (
    <div className='row flex items-center justify-start gap-4 text-sm'>
      {perkIcons[icon](iconClassName)}
      <PerkContent />
    </div>
  )
}
