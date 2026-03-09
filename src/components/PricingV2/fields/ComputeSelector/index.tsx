import * as config from '../../config'
import { findClosestCompute } from '../../config'
import FieldContainer from '../../ui/FieldContainer'
import Select, { Options } from '../../ui/Select'
import HoursSelector from '../HoursSelector'
import HRSeparator from '@/components/HRSeparator'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { SuiText } from '@/components/sui'
import { PricingV2ComponentPackage } from '@/lib/api/strapi/types'
import { interleaveWithLast } from '@/lib/utils/arrays'
import { useMemo } from 'react'

// Array of replicate size options from 1-25
const REPLICAS: Options = Array.from({ length: 25 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString()
}))

const COMPUTES: Options = config.computes.map((size) => ({
  value: size,
  label: `${size} GiB RAM, ${size / 4} vCPUs`
}))

export default function ComputeSelector() {
  const {
    getUseCaseCompute,
    setValues,
    sourceData,
    planEntry,
    useCaseEntry,
    storage,
    storageCompressed,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas
  } = usePricingV2Context()

  const customizablePlans = useMemo(() => {
    return sourceData.plans.filter((item) => item.customizable)
  }, [sourceData])

  const isCusomizable = useMemo(() => {
    return planEntry?.customizable ?? false
  }, [planEntry])

  const packages = useMemo(() => {
    return planEntry?.packages || []
  }, [planEntry])

  const useCases = useMemo(() => {
    return sourceData.useCases
  }, [sourceData])

  const useCaseOptions: Options = useMemo(() => {
    return useCases.map((item) => {
      return {
        value: item.slug,
        label: item.name
      }
    })
  }, [useCases])

  // Find the package that matches the user values
  const activePackage = useMemo(() => {
    return packages.find((item) => {
      const matchingMinCompute = item?.computeMinimum === computeMinSize
      const matchingMaxCompute = item?.computeMaximum === computeMaxSize
      const matchingReplicas = item.replicas === replicas
      return matchingMinCompute && matchingMaxCompute && matchingReplicas
    })
  }, [packages, computeMinSize, computeMaxSize, replicas])

  // Find the use case that matches the user values
  const useCaseHasChanged = useMemo(() => {
    if (!useCaseEntry || !storage) return false

    const useCaseCompute = getUseCaseCompute(
      storage,
      storageCompressed ?? false,
      useCaseEntry
    )

    if (!useCaseCompute) return false

    const matchingMinCompute =
      findClosestCompute(useCaseCompute.computeMinSize) === computeMinSize
    const matchingMaxCompute =
      findClosestCompute(useCaseCompute.computeMaxSize) === computeMaxSize
    const matchingReplicas = useCaseCompute.replicas === replicas
    const matchingHours = useCaseCompute.hours === hours

    return (
      !matchingMinCompute ||
      !matchingMaxCompute ||
      !matchingReplicas ||
      !matchingHours
    )
  }, [useCaseEntry, computeMinSize, computeMaxSize, replicas, hours])

  const hasPackages = packages.length > 0
  const hasUseCases = useCases.length > 0

  const canCustomize =
    isCusomizable && (!hasUseCases || useCaseEntry || activePackage)

  return (
    <>
      {(hasPackages || isCusomizable) && (
        <div>
          {/* Packages */}
          {hasPackages && (
            <FieldContainer label='Compute resources'>
              <div className='mb-8 grid flex-col gap-4 sm:grid-cols-2 lg:flex-row'>
                {packages.map((item, index) => {
                  const isActive = item === activePackage
                  return (
                    <button
                      key={index}
                      className={`flex flex-1 flex-col justify-center rounded border border-neutral-700 bg-neutral-750 px-3 py-2 text-left text-sm shadow-input transition-colors focus:outline-none ${
                        isActive
                          ? 'border-primary'
                          : 'hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
                      }`}
                      onClick={(event) => {
                        event.preventDefault()
                        setValues({
                          computeMinSize: item.computeMinimum ?? null,
                          computeMaxSize: item.computeMaximum ?? null,
                          replicas: item.replicas,
                          hours: /\d+/.test(`${item.activeHours}`)
                            ? item.activeHours
                            : undefined
                        })
                      }}>
                      <span className='font-bold'>{item.name}</span>
                      {item.description && (
                        <small className='mt-2 whitespace-pre-wrap text-sm text-slate-300'>
                          {item.description}
                        </small>
                      )}
                    </button>
                  )
                })}
              </div>
            </FieldContainer>
          )}

          {/* Fixed user feedback */}
          {!isCusomizable && customizablePlans.length > 0 && (
            <>
              <div className='-mt-5 mb-8 text-xs'>
                To increase or customize the size of your service with
                additional RAM and CPU, or to add more replicas for redundancy,
                switch to{' '}
                {interleaveWithLast(
                  customizablePlans.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className='text-primary hover:underline'
                        onClick={() => {
                          setValues({ plan: item.slug })
                        }}>
                        {item.name}
                      </button>
                    )
                  }),
                  <>, </>,
                  <> or </>
                )}
              </div>

              {/* Active hours */}
              <div className='mt-6'>
                <HoursSelector />
              </div>
            </>
          )}

          {/* Use cases */}
          {hasUseCases && !packages?.length && (
            <FieldContainer label="What's your use case?">
              <Select
                options={useCaseOptions}
                value={useCaseEntry?.slug}
                placeholder='Select use case'
                onChange={(useCaseSlug: PricingV2ComponentPackage['slug']) => {
                  const useCaseObject = useCases.find(
                    (item) => item.slug === useCaseSlug
                  )
                  setValues({
                    useCase: useCaseObject?.slug
                  })
                }}
              />
            </FieldContainer>
          )}

          {/* Use Case heading and reset button */}
          {canCustomize && useCaseEntry && (
            <>
              <HRSeparator className='mb-4 mt-6' />
              {(useCaseEntry.title || useCaseEntry.enableReset) && (
                <div
                  className={`flex items-center gap-3 ${useCaseEntry.description ? 'mb-2' : 'mb-6'}`}>
                  {useCaseEntry.title && (
                    <SuiText weight='bold'>{useCaseEntry.title}</SuiText>
                  )}
                  {useCaseEntry.enableReset && (
                    <button
                      className={`rounded px-2 py-1 text-primary-300 transition hover:bg-white/10 ${useCaseEntry.title ? '' : 'ml-auto'} ${useCaseHasChanged ? '' : 'opacity-0'}`}
                      onClick={(event) => {
                        event.preventDefault()
                        setValues({
                          useCase: useCaseEntry?.slug
                        })
                      }}>
                      Reset
                    </button>
                  )}
                </div>
              )}

              {useCaseEntry.description && (
                <SuiText size='sm' className='mb-6 opacity-70'>
                  {useCaseEntry.description}
                </SuiText>
              )}
            </>
          )}

          {/* Customizer */}
          {canCustomize && (
            <>
              <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                <FieldContainer
                  label={
                    replicas === 1
                      ? 'Compute per replica'
                      : 'Minimum compute per replica'
                  }>
                  <Select
                    options={
                      replicas === 1
                        ? COMPUTES.filter((option) => option.value <= 12)
                        : COMPUTES
                    }
                    value={computeMinSize}
                    onChange={(value) => setValues({ computeMinSize: value })}
                    maxHeight={275}
                  />
                </FieldContainer>

                {replicas === 1 && (
                  <div className='text-sm sm:mt-6'>
                    Single-replica services are limited to 8&nbsp;GiB and
                    12&nbsp;GiB RAM.
                  </div>
                )}
                {replicas !== 1 && (
                  <FieldContainer label='Maximum compute per replica'>
                    <Select
                      options={COMPUTES}
                      value={computeMaxSize}
                      onChange={(value) => setValues({ computeMaxSize: value })}
                      maxHeight={275}
                    />
                  </FieldContainer>
                )}

                <FieldContainer label='Number of replicas'>
                  <Select
                    options={REPLICAS}
                    value={replicas}
                    onChange={(value) => setValues({ replicas: value })}
                    maxHeight={275}
                  />
                </FieldContainer>
              </div>

              {/* Customizable user feedback */}
              {computeMinSize !== null && computeMaxSize !== null && (
                <div className='mt-3 text-xs'>
                  {computeMinSize === computeMaxSize && (
                    <>Your service will be pinned at {computeMinSize}GiB</>
                  )}
                  {computeMinSize !== computeMaxSize && (
                    <>
                      Your service will autoscale between {computeMinSize}GiB
                      and {computeMaxSize}GiB of RAM depending on your workload
                    </>
                  )}
                </div>
              )}

              {/* Active hours */}
              <div className='mt-6'>
                <HoursSelector />
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
