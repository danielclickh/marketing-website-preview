import React from 'react'
import TooltipInfo from '../../../PricingCalculator/ui/Tooltip/tooltip'

export interface LabelProps {
  children: React.ReactNode
  tooltip?: string
}

export default function Label({ children, tooltip }: LabelProps) {
  return (
    <div className='mb-2 flex items-center gap-x-3'>
      <label className='block text-xs font-bold text-[#B3B6BD]'>
        {children}
      </label>
      {tooltip && <TooltipInfo content={tooltip} />}
    </div>
  )
}
