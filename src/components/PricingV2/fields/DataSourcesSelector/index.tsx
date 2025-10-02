import { ClickPipe } from '../../types'
import DataSize from '../../ui/DataSize'
import FieldContainer from '../../ui/FieldContainer'
import Select, { Options } from '../../ui/Select'
import HRSeparator from '@/components/HRSeparator'
import {
  clickpipeBaseSize,
  clickpipeSizes
} from '@/components/PricingV2/config'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { bytesToHumanReadable, humanReadableToBytes } from '@/lib/utils/memory'
import Link from 'next/link'
import { cloneElement, useCallback, useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'

const REPLICAS: Options = Array.from({ length: 25 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString()
}))

const INSTANCES = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString()
}))

// Format clickpipe replica sizes for select field
const SIZES: Options = Object.entries(clickpipeSizes).map(
  ([label, size], sizeIndex) => {
    return {
      value: size,
      label: (
        <>
          {label}
          <span className='opacity-70'>
            ({bytesToHumanReadable(humanReadableToBytes(`${size}GB`))} RAM,{' '}
            {size / 4} vCPUs)
          </span>
        </>
      )
    }
  }
)

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
                    <FieldContainer
                      label='Data source'
                      className='md:col-span-3'>
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
                    </FieldContainer>
                    {sourceEntry?.excludeFromCalculations &&
                      sourceEntry.excludeFromCalculationsLabel && (
                        <div className='flex items-end md:col-span-3'>
                          <div className='flex h-10 items-center text-success-500'>
                            <div>
                              <MinimalMarkdown>
                                {sourceEntry.excludeFromCalculationsLabel}
                              </MinimalMarkdown>
                            </div>
                          </div>
                        </div>
                      )}
                    {!sourceEntry?.excludeFromCalculations && (
                      <>
                        <FieldContainer label='ClickPipes'>
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
                        </FieldContainer>
                        {sourceEntry?.ingestsData && (
                          <FieldContainer
                            label='Data ingested / month'
                            tooltip={
                              sourceEntry.ingestsDataHelperText ? (
                                <MinimalMarkdown>
                                  {sourceEntry.ingestsDataHelperText}
                                </MinimalMarkdown>
                              ) : null
                            }
                            className='md:col-span-2'>
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
                          </FieldContainer>
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
                {!sourceEntry?.excludeFromCalculations && (
                  <ScalableSettings
                    size={item.size}
                    replicas={item.replicas}
                    editable={sourceEntry?.scalable}
                    onChange={({ size, replicas }) => {
                      createOrUpdateClickpipe(clickpipeIndex, {
                        ...item,
                        size,
                        replicas
                      })
                    }}
                  />
                )}
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

function MinimalMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        a({ className = '', children, href, target = '_self' }) {
          return (
            <Link
              href={href || '#'}
              target={target}
              className={`underline hover:decoration-2 ${className}`}>
              {children}
            </Link>
          )
        }
      }}
      allowedElements={['a', 'strong', 'b', 'u', 'em', 'i', 'p', 'br']}>
      {children}
    </ReactMarkdown>
  )
}

function ScalableSettings({
  replicas = 1,
  size = clickpipeBaseSize,
  onChange,
  editable = false
}: {
  replicas: ClickPipe['replicas']
  size: ClickPipe['size']
  onChange: (value: {
    replicas?: ClickPipe['replicas']
    size?: ClickPipe['size']
  }) => void
  editable?: boolean
}) {
  const [open, setOpen] = useState(false)
  const isSingleReplica = replicas === 1

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!editable) {
      setOpen(false)
      onChange?.({ replicas: 1, size: clickpipeBaseSize })
    }
  }, [editable])

  return (
    <div>
      {!open && (
        <p>
          Running on {isSingleReplica ? 'a single' : replicas}{' '}
          {
            Object.entries(clickpipeSizes).find(
              ([key, value]) => value === size
            )?.[0]
          }{' '}
          {isSingleReplica ? 'replica' : 'replicas'}.{' '}
          {editable && (
            <button
              onClick={handleClick}
              className='text-primary-300 hover:underline'>
              Edit
            </button>
          )}
        </p>
      )}
      {open && (
        <div className='pr-12'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-6'>
            <FieldContainer label='Replica size' className='md:col-span-3'>
              <Select
                options={SIZES}
                value={size}
                onChange={(value) => {
                  onChange({
                    size: value,
                    replicas
                  })
                }}
              />
            </FieldContainer>
            <FieldContainer label='Replicas'>
              <Select
                options={REPLICAS}
                value={replicas}
                onChange={(value) => {
                  onChange({
                    size,
                    replicas: value
                  })
                }}
                maxHeight={275}
              />
            </FieldContainer>

            <div className='flex items-end md:col-span-2'>
              <div className='flex items-center md:h-10'>
                <button
                  onClick={handleClick}
                  className='text-left text-primary-300 hover:underline'>
                  Hide replica details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
