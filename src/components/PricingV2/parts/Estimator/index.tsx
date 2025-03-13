import Link from 'next/link'
import { Fragment, useMemo, useState } from 'react'
import HRSeparator from '@/components/HRSeparator'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import ComputeSelector from '../../fields/ComputeSelector'
import PlanSelector from '../../fields/PlanSelector'
import ProviderSelector from '../../fields/ProviderSelector'
import RegionSelector from '../../fields/RegionSelector'
import StorageSelector from '../../fields/StorageSelector'
import FieldGroupAccordion from '../../ui/FieldGroupAccordion'
import DisplayPrice from '../DisplayPrice'
import EstimatorCtas from '../EstimatorCtas'
import PriceList from '../PriceList'

export default function Estimator() {
  const { planEntry } = usePricingV2Context()

  // Tracks the accordion "open" states. Allows us to open and close programatically.
  const [computeOpen, setComputeOpen] = useState(true)
  const [backupsOpen, setBackupsOpen] = useState(false)
  const [dataSourcesOpen, setDataSourcesOpen] = useState(false)
  const [dataTransferOpen, setDataTransfersOpen] = useState(false)

  // Determins the order to display the accordions
  const [displayOrder, setDisplayOrder] = useState<
    Array<'backups' | 'dataSources' | 'dataTransfer'>
  >([])

  // If the
  const displayBackups = useMemo(() => {
    return displayOrder.includes('backups') && planEntry?.allowBackups
  }, [planEntry, displayOrder])

  const displayDataSources = useMemo(() => {
    return displayOrder.includes('dataSources') && planEntry?.allowDataSources
  }, [planEntry, displayOrder])

  const displayDataTransfer = useMemo(() => {
    return displayOrder.includes('dataTransfer') && planEntry?.allowDataTransfer
  }, [planEntry, displayOrder])

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
        <div className='w-full space-y-6 lg:w-1/2 lg:pr-6'>
          <PlanSelector />
          <FieldGroupAccordion
            title='Storage and compute'
            open={computeOpen}
            onOpenClose={setComputeOpen}>
            <div className='space-y-8'>
              <StorageSelector />
              <ComputeSelector />
            </div>
          </FieldGroupAccordion>

          {displayOrder.map((item, index) => {
            const removeItem = () =>
              setDisplayOrder((old) => old.filter((el) => el !== item))
            return (
              <Fragment key={index}>
                {item === 'backups' && displayBackups && (
                  <FieldGroupAccordion
                    title='Backups'
                    removable={true}
                    onRemove={removeItem}
                    open={backupsOpen}
                    onOpenClose={setBackupsOpen}>
                    <div className='space-y-8'>Backups...</div>
                  </FieldGroupAccordion>
                )}
                {item === 'dataSources' && displayDataSources && (
                  <FieldGroupAccordion
                    title='ClickPipes'
                    removable={true}
                    onRemove={removeItem}
                    open={dataSourcesOpen}
                    onOpenClose={setDataSourcesOpen}>
                    <div className='space-y-8'>ClickPipes...</div>
                  </FieldGroupAccordion>
                )}
                {item === 'dataTransfer' && displayDataTransfer && (
                  <FieldGroupAccordion
                    title='Data transfer'
                    removable={true}
                    onRemove={removeItem}
                    open={dataTransferOpen}
                    onOpenClose={setDataTransfersOpen}>
                    <div className='space-y-8'>Data transfer...</div>
                  </FieldGroupAccordion>
                )}
              </Fragment>
            )
          })}

          <div className='my-6 mx-4 gap-x-8 gap-y-6 flex flex-wrap items-center justify-start'>
            {planEntry?.allowBackups && !displayBackups && (
              <button
                className='text-sm text-primary-300 hover:underline'
                onClick={(event) => {
                  event.preventDefault()
                  // Open backups
                  setDisplayOrder((old) => [...old, 'backups'])

                  // Close others
                  setComputeOpen(false)
                  setBackupsOpen(true)
                  setDataSourcesOpen(false)
                  setDataTransfersOpen(false)
                }}>
                Add backups
              </button>
            )}
            {planEntry?.allowDataSources && !displayDataSources && (
              <button
                className='text-sm text-primary-300 hover:underline'
                onClick={(event) => {
                  event.preventDefault()
                  // Open data sources
                  setDisplayOrder((old) => [...old, 'dataSources'])

                  // Close others
                  setComputeOpen(false)
                  setBackupsOpen(false)
                  setDataSourcesOpen(true)
                  setDataTransfersOpen(false)
                }}>
                Add data sources (ClickPipes)
              </button>
            )}
            {planEntry?.allowDataTransfer && !displayDataTransfer && (
              <button
                className='text-sm text-primary-300 hover:underline'
                onClick={(event) => {
                  event.preventDefault()
                  // Open data transfer
                  setDisplayOrder((old) => [...old, 'dataTransfer'])

                  // Close others
                  setComputeOpen(false)
                  setBackupsOpen(false)
                  setDataSourcesOpen(false)
                  setDataTransfersOpen(true)
                }}>
                Add data transfer
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className='w-full lg:w-1/2 lg:max-w-md lg:px-6 sticky top-32'>
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
