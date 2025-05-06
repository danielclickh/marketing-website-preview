import { CUIButton } from '../ClickUI'
import { usePricing } from './PricingContext'

interface Props {
  isFirst: boolean
  isLast: boolean
  path: string
  btnText: string
  index: number
}

function PricingButton({ isFirst, isLast, path, btnText, index }: Props) {
  const { selectedRegion } = usePricing()

  if (!isFirst) {
    return (
      <CUIButton
        href={path}
        weight='medium'
        className='stroked_button_wrapper button_wrapper w-full'
        type={isLast ? 'primary' : 'secondary'}>
        {btnText}
      </CUIButton>
    )
  }

  if (selectedRegion?.hasDevService) {
    return (
      <>
        {selectedRegion.cloudProvider === 'aws' &&
        index === 0 &&
        selectedRegion.devStoragePricing.devPriceUSD == 'Coming soon' ? (
          <>
            <CUIButton
              type='secondary'
              weight='medium'
              className='stroked_button_wrapper button_wrapper disabled_button w-full !text-primary-300'
              href={path}
              disabled>
              Coming soon
            </CUIButton>
          </>
        ) : (
          <CUIButton
            href={path}
            weight='medium'
            className='stroked_button_wrapper button_wrapper w-full'
            type='primary'>
            {btnText}
          </CUIButton>
        )}
      </>
    )
  }

  if (
    (selectedRegion?.regionSlug === 'ap-northeast-1' && index === 1) ||
    (selectedRegion?.cloudProvider === 'azure' && index === 1) ||
    index === 2
  ) {
    return (
      <CUIButton
        href={path}
        weight='medium'
        className='stroked_button_wrapper button_wrapper w-full'
        type='primary'>
        {btnText}
      </CUIButton>
    )
  } else {
    return null
  }
}

export default PricingButton
