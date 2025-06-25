import BackupsSelector from '../../fields/BackupsSelector'
import ComputeSelector from '../../fields/ComputeSelector'
import DataSourcesSelector from '../../fields/DataSourcesSelector'
import DataTransferSelector from '../../fields/DataTransferSelector'
import PlanSelector from '../../fields/PlanSelector'
import ProviderSelector from '../../fields/ProviderSelector'
import RegionSelector from '../../fields/RegionSelector'
import StorageSelector from '../../fields/StorageSelector'
import FieldGroupAccordion from '../../ui/FieldGroupAccordion'
import DisplayPrice from '../DisplayPrice'
import EstimatorCtas, { PricingButton } from '../EstimatorCtas'
import PriceList from '../PriceList'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

type Addons = 'backups' | 'dataSources' | 'dataTransfer'

export interface EstimatorProps {
  before?: React.ReactNode
}

export default function Estimator({ before }: EstimatorProps) {
  const {
    setValues,
    regionEntry,
    planEntry,
    backupFrequency,
    backupRetention,
    clickpipes,
    transfers
  } = usePricingV2Context()

  // Tracks the accordion "open" states. Allows us to open and close programatically.
  const [computeOpen, setComputeOpen] = useState(true)
  const [backupsOpen, setBackupsOpen] = useState(false)
  const [dataSourcesOpen, setDataSourcesOpen] = useState(false)
  const [dataTransferOpen, setDataTransfersOpen] = useState(false)

  // Determins the order to display the accordions
  const [addonDisplayOrder, setAddonDisplayOrder] = useState<Array<Addons>>([])

  const addAddon = useCallback(
    (addon: Addons) => {
      setAddonDisplayOrder((old) => [
        ...old.filter((el) => el !== addon),
        addon
      ])
    },
    [setAddonDisplayOrder]
  )

  const removeAddon = useCallback(
    (addon: Addons) => {
      setAddonDisplayOrder((old) => old.filter((el) => el !== addon))
    },
    [setAddonDisplayOrder]
  )

  useEffect(() => {
    if (!planEntry?.allowBackups) {
      removeAddon('backups')
    }
    if (!planEntry?.allowDataSources) {
      removeAddon('dataSources')
    }
    if (!planEntry?.allowDataTransfer) {
      removeAddon('dataTransfer')
    }
  }, [planEntry])

  // Backups are allowed and user added
  const displayBackups = useMemo(() => {
    return addonDisplayOrder.includes('backups')
  }, [addonDisplayOrder])

  // Data sources are allowed and user added
  const displayDataSources = useMemo(() => {
    return addonDisplayOrder.includes('dataSources')
  }, [addonDisplayOrder])

  // Data transfers are allowed and user added
  const displayDataTransfer = useMemo(() => {
    return addonDisplayOrder.includes('dataTransfer')
  }, [addonDisplayOrder])

  // Ensure backups accordion is pressent in UI when context values change
  useEffect(() => {
    if (backupFrequency && backupRetention && !backupsOpen) {
      addAddon('backups')
      setBackupsOpen(true)
    }
  }, [backupFrequency, backupRetention])

  // Ensure dataSources accordion is pressent in UI when context values change
  useEffect(() => {
    if (!!clickpipes?.length && !dataSourcesOpen) {
      addAddon('dataSources')
      setDataSourcesOpen(true)
    }
  }, [clickpipes])

  // Ensure dataTransfer accordion is pressent in UI when context values change
  useEffect(() => {
    if (!!transfers?.length && !dataTransferOpen) {
      addAddon('dataTransfer')
      setDataTransfersOpen(true)
    }
  }, [transfers])

  // Open compute when no addons added
  useEffect(() => {
    if (!addonDisplayOrder.length && !computeOpen) {
      setComputeOpen(true)
    }
  }, [addonDisplayOrder])

  const regionIsPrivate = regionEntry?.private

  return (
    <>
      <div
        id='pricing-calculator' // Used for scrolling into view and sharing
        className='mx-auto max-w-6xl px-4 sm:px-8 xl:px-0'>
        {before}

        {/* Provider/Region selectors */}
        <div className='mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-6'>
          <ProviderSelector displayLabel={false} />
          <RegionSelector displayLabel={false} className='w-full max-w-80' />
        </div>

        <div className='relative'>
          {/* Private region notice */}
          {regionIsPrivate && (
            <div className='inset-0 z-20 flex lg:absolute'>
              <div className='m-auto w-full max-w-md rounded-lg border border-primary-300 bg-slate-900 p-7'>
                <p className='text-center font-inconsolata text-lg text-primary-300'>
                  Private region
                </p>
                <div className='mb-4 flex min-h-20 items-center'>
                  <p className='w-full text-center font-basier text-5xl font-bold text-white'>
                    Contact sales
                  </p>
                </div>
                <p className='-mt-4 mb-8 text-center text-base font-bold text-white'>
                  Get custom pricing and availability
                  <br />
                  details for private regions
                </p>
                <PricingButton
                  type='primary'
                  href='/company/contact?loc=pricing-private-region'>
                  Get a custom quote
                </PricingButton>
              </div>
            </div>
          )}
          <div
            className={`flex flex-col gap-x-12 gap-y-8 transition lg:-mx-6 lg:flex-row lg:items-start lg:justify-center ${regionIsPrivate ? 'hidden lg:flex lg:blur lg:saturate-50' : ''}`}>
            {/* Form */}
            <div className='w-full space-y-6 lg:w-1/2'>
              <PlanSelector />
              <FieldGroupAccordion
                title='Storage and compute'
                open={computeOpen}
                onOpenClose={setComputeOpen}>
                <div className='space-y-8'>
                  <StorageSelector cameFrom='compute' />
                  <ComputeSelector />
                </div>
              </FieldGroupAccordion>

              {addonDisplayOrder.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {item === 'backups' && displayBackups && (
                      <FieldGroupAccordion
                        title='Backups'
                        removable={true}
                        onRemove={() => {
                          // Remove from UI
                          removeAddon('backups')

                          // Reset backup context values
                          setValues({
                            backupFrequency: null,
                            backupRetention: null,
                            estimateBackup: true,
                            fullBackup: null,
                            incrementalBackup: null
                          })
                        }}
                        open={backupsOpen}
                        onOpenClose={setBackupsOpen}>
                        <div className='space-y-8'>
                          <BackupsSelector />
                        </div>
                      </FieldGroupAccordion>
                    )}
                    {item === 'dataSources' && displayDataSources && (
                      <FieldGroupAccordion
                        title='ClickPipes'
                        removable={true}
                        onRemove={() => {
                          // Remove from UI
                          removeAddon('dataSources')

                          // Reset data transfer context values
                          setValues({
                            clickpipes: null
                          })
                        }}
                        open={dataSourcesOpen}
                        onOpenClose={setDataSourcesOpen}>
                        <div className='space-y-8'>
                          <DataSourcesSelector />
                        </div>
                      </FieldGroupAccordion>
                    )}
                    {item === 'dataTransfer' && displayDataTransfer && (
                      <FieldGroupAccordion
                        title='Data transfer'
                        removable={true}
                        onRemove={() => {
                          // Remove from UI
                          removeAddon('dataTransfer')

                          // Reset data transfer context values
                          setValues({
                            transfers: null
                          })
                        }}
                        open={dataTransferOpen}
                        onOpenClose={setDataTransfersOpen}>
                        <div className='space-y-8'>
                          <DataTransferSelector />
                        </div>
                      </FieldGroupAccordion>
                    )}
                  </Fragment>
                )
              })}

              <div className='mx-4 my-6 flex flex-wrap items-center justify-start gap-x-8 gap-y-6'>
                {planEntry?.allowBackups && !displayBackups && (
                  <button
                    className='text-sm text-primary-300 hover:underline'
                    onClick={(event) => {
                      event.preventDefault()

                      // Add backups to UI
                      addAddon('backups')

                      // Setting default values
                      setValues({
                        backupFrequency: 24,
                        backupRetention: 1,
                        estimateBackup: true,
                        fullBackup: undefined,
                        incrementalBackup: undefined
                      })

                      // Close other accordions
                      setComputeOpen(false)
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
                      // Add data sources
                      addAddon('dataSources')

                      // Set accordion open states
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

                      // Add data transfer to UI
                      addAddon('dataTransfer')

                      // Setting default values
                      setValues({
                        transfers: [
                          {
                            type: 'public-internet',
                            value: null
                          }
                        ]
                      })

                      // Set accordion open states
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
            <div className='sticky top-32 w-full lg:w-1/2 lg:max-w-md'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
