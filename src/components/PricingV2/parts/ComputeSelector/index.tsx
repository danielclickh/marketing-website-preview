import { useMemo } from 'react'
import { PricingV2EntryUseCase } from '@/lib/api/strapi/types'
import HRSeparator from '../../../HRSeparator'
import { usePricingV2Context } from '@/components/PricingV2ContextProvider'
import { SuiText } from '../../../sui'
import Label from '../../ui/Label'
import Select, { Options } from '../../ui/Select'
import HoursSelector from '../HoursSelector'

// Array of replicate size options from 1-25
const REPLICAS: Options = Array.from({ length: 25 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString()
}))

function formatComponentsList(components: Array<React.ReactNode>) {
  if (components.length === 0) return null
  if (components.length === 1) return components[0]

  const lastComponent = components[components.length - 1]
  const allButLast = components.slice(0, -1)

  return (
    <>
      {allButLast.reduce((acc: React.ReactNode[], curr, index) => {
        if (index === allButLast.length - 1) {
          return [...acc, curr, ' or ', lastComponent]
        }
        return [...acc, curr, ', ']
      }, [])}
    </>
  )
}

export default function ComputeSelector() {
  const {
    setValues,
    plans,
    computes,
    planEntry,
    useCaseEntry,
    hours,
    computeMinSize,
    computeMaxSize,
    replicas
  } = usePricingV2Context()

  const customizablePlans = useMemo(() => {
    return plans.filter((item) => item.customizable)
  }, [plans])

  const isCusomizable = useMemo(() => {
    return planEntry?.customizable ?? false
  }, [planEntry])

  const packages = useMemo(() => {
    return planEntry?.packages || []
  }, [planEntry])

  const useCases = useMemo(() => {
    return planEntry?.useCases || []
  }, [planEntry])

  const computeOptions: Options = useMemo(() => {
    return computes.map((item) => {
      return {
        value: item.size,
        label: item.name
      }
    })
  }, [computes])

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
      const matchingMinCompute = item?.minimumCompute?.size === computeMinSize
      const matchingMaxCompute = item?.maximumCompute?.size === computeMaxSize
      const matchingReplicas = item.replicas === replicas
      return matchingMinCompute && matchingMaxCompute && matchingReplicas
    })
  }, [packages, computeMinSize, computeMaxSize, replicas])

  // Find the use case that matches the user values
  const useCaseHasChanged = useMemo(() => {
    if (!useCaseEntry) return false
    const matchingMinCompute =
      useCaseEntry?.minimumCompute?.size === computeMinSize
    const matchingMaxCompute =
      useCaseEntry?.maximumCompute?.size === computeMaxSize
    const matchingReplicas = useCaseEntry.replicas === replicas
    const matchingHours = useCaseEntry.activeHours === hours
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
            <>
              <Label>Compute resources</Label>
              <div className='grid flex-col gap-4 sm:grid-cols-2 lg:flex-row mb-8'>
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
                          computeMinSize: item.minimumCompute?.size ?? null,
                          computeMaxSize: item.maximumCompute?.size ?? null,
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
            </>
          )}

          {/* Fixed user feedback */}
          {!isCusomizable && customizablePlans.length > 0 && (
            <>
              <div className='text-xs -mt-5 mb-8'>
                To increase or customize the size of your service with
                additional RAM and CPU, or to add more replicas for redundancy,
                switch to{' '}
                {formatComponentsList(
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
                  })
                )}
              </div>
              <HoursSelector />
            </>
          )}

          {/* Use cases */}
          {hasUseCases && (
            <>
              <Label>What's your use case?</Label>
              <Select
                options={useCaseOptions}
                value={useCaseEntry?.slug}
                placeholder='Select use case'
                onChange={(useCaseSlug: PricingV2EntryUseCase['slug']) => {
                  const useCaseObject = useCases.find(
                    (item) => item.slug === useCaseSlug
                  )
                  setValues({
                    useCase: useCaseObject?.slug,
                    computeMinSize: useCaseObject?.minimumCompute?.size || null,
                    computeMaxSize: useCaseObject?.maximumCompute?.size || null,
                    replicas: useCaseObject?.replicas,
                    hours: useCaseObject?.activeHours
                  })
                }}
              />
            </>
          )}

          {/* Customizer */}
          {canCustomize && (
            <>
              <HRSeparator className='mt-6 mb-4' />
              {useCaseEntry && (
                <div className='mb-6 flex items-center justify-between'>
                  <SuiText weight='bold'>
                    Suggested configuration based on your use case
                  </SuiText>
                  {useCaseHasChanged && (
                    <button
                      className='opacity-75 transition-colors hover:opacity-100'
                      onClick={(event) => {
                        event.preventDefault()
                        setValues({
                          useCase: useCaseEntry?.slug,
                          computeMinSize:
                            useCaseEntry?.minimumCompute?.size || null,
                          computeMaxSize:
                            useCaseEntry?.maximumCompute?.size || null,
                          replicas: useCaseEntry?.replicas,
                          hours: useCaseEntry?.activeHours
                        })
                      }}>
                      Reset
                    </button>
                  )}
                </div>
              )}

              <HoursSelector />
              <div className='grid sm:grid-cols-2 gap-4 mt-8'>
                <div>
                  <Label>Minimum size</Label>
                  <Select
                    options={computeOptions}
                    value={computeMinSize}
                    onChange={(value) => setValues({ computeMinSize: value })}
                  />
                </div>
                <div>
                  <Label>Maximum size</Label>
                  <Select
                    options={computeOptions}
                    value={computeMaxSize}
                    onChange={(value) => setValues({ computeMaxSize: value })}
                  />
                </div>
                <div>
                  <Label>Number of replicas</Label>
                  <Select
                    options={REPLICAS}
                    value={replicas}
                    onChange={(value) => setValues({ replicas: value })}
                    maxHeight={275}
                  />
                </div>
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
            </>
          )}
        </div>
      )}
    </>
  )
}
