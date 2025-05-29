import { ClickPipe } from '../../types'
import DataSize from '../../ui/DataSize'
import Label from '../../ui/Label'
import Select, { Options } from '../../ui/Select'
import HRSeparator from '@/components/HRSeparator'
import Markdown from '@/components/Markdown'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'

const INSTANCES = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString()
}))

export default function DataSourcesSelector() {
  const { setValues, sourceData, clickpipes } = usePricingV2Context()

  // Format data sources for select field, disabling already used values
  const sourceOptions: Options = useMemo(() => {
    return sourceData.dataSources.map((source) => {
      return {
        icon: source.icon,
        value: source.slug,
        label: source.name,
        disabled: !!clickpipes?.find((pipe) => pipe.source === source.slug)
      }
    })
  }, [sourceData, clickpipes])

  // Find the first option that isn't disabled
  const nextAvailableOption = useMemo(() => {
    return sourceOptions.find((option) => !option.disabled)
  }, [sourceOptions])

  const findSourceBySlug = useCallback(
    (slug: string) => {
      return sourceData.dataSources.find((source) => source.slug === slug)
    },
    [sourceData]
  )

  // Define the maximum of data sources allowed
  const maxDataSources = sourceOptions.length

  // Set flags for showing/hiding "add" buttons
  const canAddSource =
    nextAvailableOption && (clickpipes?.length || 0) < maxDataSources

  // Create or update helper function
  const createOrUpdateClickpipe = useCallback(
    (index: number, clickpipe: ClickPipe) => {
      const newValue = clickpipes ? [...clickpipes] : []
      newValue[index] = clickpipe
      setValues({ clickpipes: newValue })
    },
    [setValues, clickpipes]
  )

  // Remove helper function
  const removeClickpipe = useCallback(
    (index: number) => {
      const newValue = clickpipes ? [...clickpipes] : []
      if (newValue.hasOwnProperty(index)) {
        newValue.splice(index, 1)
      }
      setValues({ clickpipes: newValue })
    },
    [setValues, clickpipes]
  )

  return (
    <>
      {clickpipes && clickpipes.length > 0 && (
        <div className='space-y-4'>
          {clickpipes.map((item, clickpipeIndex) => {
            const sourceEntry = findSourceBySlug(item.source)
            return (
              <>
                <div key={clickpipeIndex} className='flex items-end gap-2'>
                  <div className='grid flex-1 grid-cols-1 gap-6 md:grid-cols-6'>
                    <div className='md:col-span-3'>
                      <Label>Data source</Label>
                      <Select
                        options={sourceOptions}
                        value={item.source}
                        onChange={(value) => {
                          createOrUpdateClickpipe(clickpipeIndex, {
                            ...item,
                            source: value
                          })
                        }}
                        maxHeight={275}
                      />
                    </div>
                    {sourceEntry?.excludeFromCalculations &&
                      sourceEntry.excludeFromCalculationsLabel && (
                        <div className='flex items-end md:col-span-3'>
                          <div className='flex h-10 items-center text-success-500'>
                            <div>
                              <ReactMarkdown
                                components={{
                                  a({
                                    className = '',
                                    children,
                                    href,
                                    target = '_self'
                                  }) {
                                    return (
                                      <Link
                                        href={href || '#'}
                                        target={target}
                                        className={`underline ${className}`}>
                                        {children}
                                      </Link>
                                    )
                                  }
                                }}
                                allowedElements={[
                                  'a',
                                  'strong',
                                  'b',
                                  'u',
                                  'em',
                                  'i',
                                  'p',
                                  'br'
                                ]}>
                                {sourceEntry.excludeFromCalculationsLabel}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      )}
                    {!sourceEntry?.excludeFromCalculations && (
                      <>
                        <div>
                          <Label>ClickPipes</Label>
                          <Select
                            options={INSTANCES}
                            value={item.instances}
                            onChange={(value) => {
                              createOrUpdateClickpipe(clickpipeIndex, {
                                ...item,
                                instances: value
                              })
                            }}
                            maxHeight={275}
                          />
                        </div>
                        {sourceEntry?.ingestsData && (
                          <div className='md:col-span-2'>
                            <Label>Data ingested / month</Label>
                            <DataSize
                              uiSplit='1/1'
                              min='1GB'
                              max='999PB'
                              value={item.dataIngested}
                              onChange={(value) => {
                                createOrUpdateClickpipe(clickpipeIndex, {
                                  ...item,
                                  dataIngested: value.formatted
                                })
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className='flex h-10 flex-shrink-0 flex-grow-0 items-center'>
                    <button
                      onClick={(event) => {
                        event.preventDefault()
                        removeClickpipe(clickpipeIndex)
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
      {canAddSource && (
        <button
          onClick={(event) => {
            event.preventDefault()
            createOrUpdateClickpipe(clickpipes?.length || 0, {
              source: nextAvailableOption.value,
              instances: 1
            })
          }}
          className='rounded border border-neutral-700 bg-neutral-725 px-3 py-1 transition-colors hover:border-neutral-600 active:bg-neutral-800'>
          <span className='leading-none'>+</span> Add data source
        </button>
      )}
    </>
  )
}
