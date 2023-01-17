'use client'
import React from 'react'
import { SuiButton } from '../sui/client'
import { usePricing } from './PricingContext'

interface Props {
  isFirst: boolean
  isLast: boolean
  path: string
  btnText: string
}

function PricingButton({ isFirst, isLast, path, btnText }: Props) {
  const { selectedRegion } = usePricing()

  if (!isFirst) {
    return (
      <SuiButton
        path={path}
        className='w-full stroked_button_wrapper button_wrapper'
        type={isLast ? 'primary' : 'secondary'}>
        {btnText}
      </SuiButton>
    )
  }

  if (selectedRegion?.hasDevService) {
    return (
      <SuiButton
        path={path}
        className='w-full stroked_button_wrapper button_wrapper'
        type='primary'>
        {btnText}
      </SuiButton>
    )
  }

  return (
    <SuiButton
      type='secondary'
      className='w-full stroked_button_wrapper button_wrapper disabled_button'
      path={path}
      disabled>
      Coming soon
    </SuiButton>
  )
}

export default PricingButton
