import { Transfer } from '../../types'
import DataSize from '../../ui/DataSize'
import FieldContainer from '../../ui/FieldContainer'
import Select, { Options } from '../../ui/Select'
import HRSeparator from '@/components/HRSeparator'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'

export default function DataTransferSelector() {
  const { setValues, providerEntry, transfers } = usePricingV2Context()

  // Format regions for select field, disabling already used values
  const regionOptions: Options = useMemo(() => {
    if (!providerEntry) return []

    return providerEntry.regions.map((item) => {
      return {
        value: item.key,
        label: item.label || item.key,
        icon: item.icon,
        disabled: !!(transfers || []).find(
          (transfer) => transfer.region === item.key
        )
      }
    })
  }, [providerEntry, transfers])

  // Find the first option that isn't disabled
  const nextAvailableOption = useMemo(() => {
    return regionOptions.find((option) => !option.disabled)
  }, [regionOptions])

  // Define the maximum of each transfer type
  const maxPublicInternets = 1
  const maxInterRegions = regionOptions.length

  // Count the number of each transfer type
  const {
    publicInternet: totalPublicInternets,
    interRegion: totalInterRegions
  } = useMemo(() => {
    let publicInternet = 0
    let interRegion = 0

    if (transfers) {
      transfers.forEach((item) => {
        switch (item.type) {
          case 'public-internet':
            publicInternet++
            break
          case 'inter-region':
            interRegion++
            break
        }
      })
    }

    return { publicInternet, interRegion }
  }, [transfers])

  // Set flags for showing/hiding "add" buttons
  const canAddPublicInternet = totalPublicInternets < maxPublicInternets
  const canAddInterRegion = totalInterRegions < maxInterRegions

  // Create or update helper function
  const createOrUpdateTransfer = useCallback(
    (index: number, transfer: Transfer) => {
      const newValue = transfers ? [...transfers] : []
      newValue[index] = transfer
      setValues({ transfers: newValue })
    },
    [setValues, transfers]
  )

  // Remove helper function
  const removeTransfer = useCallback(
    (index: number) => {
      const newValue = transfers ? [...transfers] : []
      if (newValue.hasOwnProperty(index)) {
        newValue.splice(index, 1)
      }
      setValues({ transfers: newValue })
    },
    [setValues, transfers]
  )

  return (
    <>
      {/* Fix inter-region egress */}
      {!providerEntry?.useDestinationInterRegionEgress && (
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <FieldContainer label='Public internet egress / month'>
            <DataSize
              min='1GB'
              max='999PB'
              value={transfers?.[0]?.value}
              onChange={(value) => {
                createOrUpdateTransfer(0, {
                  type: 'public-internet',
                  value: value.formatted
                })
              }}
            />
          </FieldContainer>
          <FieldContainer label='Inter-region egress / month'>
            <DataSize
              min='1GB'
              max='999PB'
              value={transfers?.[1]?.value}
              onChange={(value) => {
                createOrUpdateTransfer(1, {
                  type: 'inter-region',
                  value: value.formatted
                })
              }}
            />
          </FieldContainer>
        </div>
      )}

      {/* Dynamic inter-region egress */}
      {providerEntry?.useDestinationInterRegionEgress && (
        <>
          {transfers && transfers.length > 0 && (
            <div className='space-y-4'>
              {transfers.map((item, transferIndex) => {
                const label = {
                  'public-internet': 'Public internet egress / month',
                  'inter-region': 'Inter-region egress / month'
                }[item.type]
                return (
                  <>
                    <div key={transferIndex} className='flex items-end gap-2'>
                      <div className='grid flex-1 grid-cols-1 gap-6 md:grid-cols-2'>
                        <FieldContainer label={label}>
                          <DataSize
                            min='1GB'
                            max='999PB'
                            value={item.value}
                            onChange={(value) => {
                              createOrUpdateTransfer(transferIndex, {
                                ...item,
                                value: value.formatted
                              })
                            }}
                          />
                        </FieldContainer>
                        {item.type === 'inter-region' &&
                          providerEntry?.regions &&
                          providerEntry.regions.length > 0 && (
                            <FieldContainer label='Region'>
                              <Select
                                options={regionOptions}
                                value={
                                  item.region ||
                                  providerEntry.regions?.[0]?.key ||
                                  null
                                }
                                onChange={(value) => {
                                  createOrUpdateTransfer(transferIndex, {
                                    ...item,
                                    region: value
                                  })
                                }}
                              />
                            </FieldContainer>
                          )}
                      </div>
                      <div className='flex h-10 flex-shrink-0 flex-grow-0 items-center'>
                        <button
                          onClick={(event) => {
                            event.preventDefault()
                            removeTransfer(transferIndex)
                          }}
                          className='flex aspect-square w-8 items-center justify-center rounded transition-colors hover:bg-white/10'>
                          <span className='sr-only'>Remove</span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='none'
                            viewBox='0 0 16 16'>
                            <path
                              stroke='#FFBABA'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M12 4v8.5c0 .83-.68 1.5-1.51 1.5h-5C4.66 14 4 13.34 4 12.5V4m9 0H3m3.67-2h2.66m0 4.67v4.67m-2.66 0V6.67'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <HRSeparator />
                  </>
                )
              })}
            </div>
          )}

          {(canAddPublicInternet || canAddInterRegion) && (
            <div className='flex flex-wrap gap-3'>
              {canAddPublicInternet && (
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    createOrUpdateTransfer(transfers?.length || 0, {
                      type: 'public-internet',
                      value: null
                    })
                  }}
                  className='rounded border border-neutral-700 bg-neutral-725 px-3 py-1 transition-colors hover:border-neutral-600 active:bg-neutral-800'>
                  <span className='leading-none'>+</span> Add public internet
                  egress
                </button>
              )}
              {canAddInterRegion && (
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    createOrUpdateTransfer(transfers?.length || 0, {
                      type: 'inter-region',
                      value: null,
                      region: nextAvailableOption?.value || null
                    })
                  }}
                  className='rounded border border-neutral-700 bg-neutral-725 px-3 py-1 transition-colors hover:border-neutral-600 active:bg-neutral-800'>
                  <span className='leading-none'>+</span> Add inter-region
                  egress
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Helper text */}
      <p className='text-sm'>
        For details on data transfer and billing, visit our{' '}
        <Link
          href='/docs/cloud/manage/network-data-transfer'
          target='_blank'
          title='Opens in a new tab'
          className='text-primary-300 hover:underline'>
          data transfer docs <ExternalLinkIcon className='inline h-4 w-4' />
        </Link>
      </p>
    </>
  )
}
