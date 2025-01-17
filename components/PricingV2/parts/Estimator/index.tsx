import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import ComputeSelector from '../ComputeSelector'
import HoursSelector from '../HoursSelector'
import PlanSelector from '../PlanSelector'
import ProviderSelector from '../ProviderSelector'
import RegionSelector from '../RegionSelector'
import StorageSelector from '../StorageSelector'

export default function Estimator() {
  const {
    plan,
    provider,
    region,
    hours,
    computeMinSize,
    computeMaxSize,
    storageUnit,
    storageSize,
    storageCompressed
  } = usePricingV2Context()
  return (
    <div className='mx-auto flex max-w-5xl flex-col items-start gap-x-12 px-4 sm:px-8 lg:flex-row xl:px-0'>
      {/* Form */}
      <div className='w-1/2 space-y-8'>
        <PlanSelector />
        <ProviderSelector />
        <RegionSelector />
        <HoursSelector />
        <ComputeSelector />
        <StorageSelector />
      </div>

      {/* Results */}
      <div className='w-full rounded-lg border border-primary-300 bg-[#151515] p-8 text-center md:flex-1'>
        <p className='mb-4 font-inconsolata text-lg text-primary-300'>
          Average price per month
        </p>
      </div>
    </div>
  )
}
