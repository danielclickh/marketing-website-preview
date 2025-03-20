import { ExternalLinkIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import HRSeparator from '../../../HRSeparator'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import { Transfer } from '../../types'
import DataSize from '../../ui/DataSize'
import Label from '../../ui/Label'
import Select, { Options } from '../../ui/Select'

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
      {!providerEntry?.isDynamicInterRegionEgress && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <Label>Public internet egress</Label>
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
          </div>
          <div>
            <Label>Inter-region egress</Label>
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
          </div>
        </div>
      )}

      {/* Dynamic inter-region egress */}
      {providerEntry?.isDynamicInterRegionEgress && (
        <>
          {transfers && transfers.length > 0 && (
            <div className='space-y-4'>
              {transfers.map((item, transferIndex) => {
                return (
                  <>
                    <div key={transferIndex} className='flex gap-2 items-end'>
                      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          {item.type === 'public-internet' && (
                            <Label>Public internet egress</Label>
                          )}
                          {item.type === 'inter-region' && (
                            <Label>Inter-region egress</Label>
                          )}
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
                        </div>
                        {item.type === 'inter-region' &&
                          providerEntry?.regions &&
                          providerEntry.regions.length > 0 && (
                            <div>
                              <Label>Region</Label>
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
                            </div>
                          )}
                      </div>
                      <div className='h-10 flex items-center flex-grow-0 flex-shrink-0'>
                        <button
                          onClick={(event) => {
                            event.preventDefault()
                            removeTransfer(transferIndex)
                          }}
                          className='flex items-center justify-center w-8 aspect-square rounded transition-colors hover:bg-white/10'>
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
            <div className='flex gap-3 flex-wrap'>
              {canAddPublicInternet && (
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    createOrUpdateTransfer(transfers?.length || 0, {
                      type: 'public-internet',
                      value: null
                    })
                  }}
                  className='px-3 py-1 rounded border border-neutral-700 bg-neutral-725 transition-colors hover:border-neutral-600 active:bg-neutral-800'>
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
                  className='px-3 py-1 rounded border border-neutral-700 bg-neutral-725 transition-colors hover:border-neutral-600 active:bg-neutral-800'>
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
          data transfer docs <ExternalLinkIcon className='h-4 w-4 inline' />
        </Link>
      </p>
    </>
  )
}
