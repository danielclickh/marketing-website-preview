import TooltipInfo from '@/components/PricingCalculator/ui/Tooltip/tooltip'
import React from 'react'

export interface LabelProps {
  children: React.ReactNode
  tooltip?: string | null | React.ReactNode
  className?: string
}

export default function Label({
  children,
  tooltip,
  className = ''
}: LabelProps) {
  return (
    <div className={`mb-2 flex items-center gap-x-3 ${className}`}>
      <label className='block text-xs font-bold text-[#B3B6BD]'>
        {children}
      </label>
      {tooltip && <TooltipInfo content={tooltip} />}
    </div>
  )
}
