import React from 'react'
import { CUIButton } from '../ClickUI'
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
      <CUIButton
        href={path}
        weight='medium'
        className='w-full stroked_button_wrapper button_wrapper'
        type={isLast ? 'primary' : 'secondary'}>
        {btnText}
      </CUIButton>
    )
  }

  if (selectedRegion?.hasDevService) {
    return (
      <CUIButton
        href={path}
        weight='medium'
        className='w-full stroked_button_wrapper button_wrapper'
        type='primary'>
        {btnText}
      </CUIButton>
    )
  }

  return (
    <CUIButton
      type='secondary'
      weight='medium'
      className='w-full stroked_button_wrapper button_wrapper disabled_button !text-primary-300'
      href={path}
      disabled>
      Coming soon
    </CUIButton>
  )
}

export default PricingButton
