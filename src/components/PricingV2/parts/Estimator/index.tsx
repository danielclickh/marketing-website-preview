import HRSeparator from '../../../HRSeparator'
import FieldGroupAccordion from '../../ui/FieldGroupAccordion'
import ComputeSelector from '../ComputeSelector'
import DisplayPrice from '../DisplayPrice'
import EstimatorCtas from '../EstimatorCtas'
import PlanSelector from '../PlanSelector'
import PriceList from '../PriceList'
import ProviderSelector from '../ProviderSelector'
import RegionSelector from '../RegionSelector'
import StorageSelector from '../StorageSelector'
import Link from 'next/link'

export default function Estimator() {
  return (
    <div
      id='pricing-calculator' // Used for scrolling into view and sharing
      className='mx-auto max-w-6xl px-4 sm:px-8 xl:px-0'>
      {/* Provider/Region selectors */}
      <div className='mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-6'>
        <ProviderSelector displayLabel={false} />
        <RegionSelector displayLabel={false} className='w-full max-w-80' />
      </div>

      <div className='flex flex-col gap-y-8 lg:-mx-6 lg:flex-row lg:items-start lg:justify-center'>
        {/* Form */}
        <div className='w-full space-y-8 lg:w-1/2 lg:pr-6'>
          <PlanSelector />
          <FieldGroupAccordion title='Storage and compute'>
            <div className='space-y-8'>
              <StorageSelector />
              <ComputeSelector />
            </div>
          </FieldGroupAccordion>
        </div>

        {/* Results */}
        <div className='w-full lg:w-1/2 lg:max-w-md lg:px-6'>
          <div className='rounded-lg border border-primary-300 bg-slate-900 p-7'>
            <p className='text-center font-inconsolata text-lg text-primary-300'>
              Average price per month
            </p>
            <div className='mb-4 flex min-h-20 items-center'>
              <p className='w-full text-center font-basier font-bold text-white'>
                <DisplayPrice />
              </p>
            </div>
            <EstimatorCtas />
            <PriceList />

            <HRSeparator className='my-4' />

            <p className='mt-4 text-xs text-slate-300'>
              ClickPipes and data transfer costs are not included. Most
              customers won’t see a significant increase in their monthly bill
              from these additional usage dimensions.{' '}
              <Link
                href='/docs/en/cloud/manage/jan-2025-faq/pricing-dimensions'
                target='_blank'
                className='whitespace-nowrap text-primary-300 hover:underline'>
                See full pricing
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
