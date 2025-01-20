import { useEffect, useMemo, useState } from 'react'
import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import Label from '../../ui/Label'
import Select, { Options } from '../../ui/Select'

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
    computes,
    plans,
    plan,
    setPlan,
    computeMinSize,
    setComputeMinSize,
    computeMaxSize,
    setComputeMaxSize,
    replicas,
    setReplicas
  } = usePricingV2Context()

  const [customizing, setCustomizing] = useState(false)

  const customizablePlans = useMemo(() => {
    return plans.filter((item) => item.customizable)
  }, [plans])

  const isCusomizable = useMemo(() => {
    const planEntry = plans.find((item) => item.slug === plan)
    if (!planEntry) return false
    return planEntry.customizable
  }, [plans, plan])

  const packages = useMemo(() => {
    const planEntry = plans.find((item) => item.slug === plan)
    if (!planEntry) return []

    // Ensure the resource has usable values
    return planEntry.packages.filter(
      (item) => item.minimumCompute || item.maximumCompute
    )
  }, [plans, plan])

  const computeOptions: Options = useMemo(() => {
    return computes.map((item) => {
      return {
        value: item.size,
        label: item.name
      }
    })
  }, [computes])

  const activePackage = useMemo(() => {
    // No active packages if the customizer is open
    if (customizing) return undefined

    return packages.find((item) => {
      const matchingReplicas = replicas === item.replicas
      const matchingMinCompute =
        !item.minimumCompute ||
        (item.minimumCompute && item.minimumCompute.size === computeMinSize)
      const matchingMaxCompute =
        !item.maximumCompute ||
        (item.maximumCompute && item.maximumCompute.size === computeMaxSize)
      return matchingReplicas && matchingMinCompute && matchingMaxCompute
    })
  }, [plan, packages, customizing, computeMinSize, computeMaxSize, replicas])

  // Stop customzing if plan doesn't allow it
  useEffect(() => {
    if (!isCusomizable && customizing) setCustomizing(false)
  }, [isCusomizable])

  // Set the default package if not customizing and no active package
  useEffect(() => {
    if (!customizing && !activePackage) {
      const firstPackage = packages.at(0)

      if (firstPackage?.minimumCompute?.size) {
        setComputeMinSize(firstPackage.minimumCompute.size)
      }

      if (firstPackage?.maximumCompute?.size) {
        setComputeMaxSize(firstPackage.maximumCompute.size)
      }

      if (firstPackage?.replicas) {
        setReplicas(firstPackage.replicas)
      }
    }
  }, [customizing, activePackage])

  // Ensure the max size is always >= min size
  useEffect(() => {
    if (
      computeMinSize !== null &&
      computeMaxSize !== null &&
      computeMinSize > computeMaxSize
    ) {
      setComputeMaxSize(computeMinSize)
    }
  }, [computeMinSize])

  // Ensure the min size is always <= max size
  useEffect(() => {
    if (
      computeMinSize !== null &&
      computeMaxSize !== null &&
      computeMinSize > computeMaxSize
    ) {
      setComputeMinSize(computeMaxSize)
    }
  }, [computeMaxSize])

  return (
    <>
      {(packages.length > 0 || isCusomizable) && (
        <div>
          <Label>Compute resources</Label>

          {/* Packages */}
          {packages.length > 0 && (
            <div className='grid flex-col gap-4 sm:grid-cols-2 lg:flex-row'>
              {packages.map((item, index) => {
                const isActive = item === activePackage
                return (
                  <button
                    key={index}
                    className={`flex flex-1 flex-col justify-center rounded-[4px] border border-neutral-700 bg-neutral-750 px-3 py-2 text-left text-sm shadow-input transition-colors focus:outline-none ${
                      isActive
                        ? 'border-primary'
                        : 'hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
                    }`}
                    onClick={(event) => {
                      event.preventDefault()
                      setCustomizing(false)
                      setReplicas(item.replicas)

                      if (item.minimumCompute) {
                        setComputeMinSize(item.minimumCompute.size)
                      }

                      if (item.maximumCompute) {
                        setComputeMaxSize(item.maximumCompute.size)
                      }
                    }}>
                    <span className='font-medium'>{item.name}</span>
                    {item.description && (
                      <small className='whitespace-pre-wrap opacity-70'>
                        {item.description}
                      </small>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* Customizer */}
          {isCusomizable && (
            <div
              className={`mt-4 flex flex-1 flex-col justify-center rounded-[4px] border border-neutral-700 bg-neutral-750 text-center text-sm shadow-input transition-colors focus:outline-none ${
                customizing
                  ? 'border-primary'
                  : 'hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
              }`}>
              <button
                className='flex w-full flex-col px-4 py-2 text-left'
                onClick={(event) => {
                  event.preventDefault()
                  if (!customizing) setCustomizing(true)
                }}>
                <span>Custom</span>
                <small className='opacity-70'>
                  Customize the size of your service
                </small>
              </button>
              <div
                className={`space-y-8 p-4 pt-3 ${
                  customizing ? 'block' : 'hidden'
                }`}>
                <div>
                  <Label>Minimum compute size</Label>
                  <Select
                    options={computeOptions}
                    value={computeMinSize}
                    onChange={setComputeMinSize}
                  />
                </div>
                <div>
                  <Label>Maximum compute size</Label>
                  <Select
                    options={computeOptions}
                    value={computeMaxSize}
                    onChange={setComputeMaxSize}
                  />
                </div>
                <div>
                  <Label>Replicas</Label>
                  <Select
                    options={REPLICAS}
                    value={replicas}
                    onChange={setReplicas}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Customizable user feedback */}
          {isCusomizable &&
            computeMinSize !== null &&
            computeMaxSize !== null && (
              <div className='mt-3 text-xs'>
                {computeMinSize === computeMaxSize && (
                  <>Your service will be pinned at {computeMinSize}GiB</>
                )}
                {computeMinSize !== computeMaxSize && (
                  <>
                    Your service will autoscale between {computeMinSize}GiB and{' '}
                    {computeMaxSize}GiB of RAM depending on your workload
                  </>
                )}
              </div>
            )}

          {/* Fixed user feedback */}
          {!isCusomizable && customizablePlans.length > 0 && (
            <div className='mt-3 text-xs'>
              To increase or customize the size of your service with additional
              RAM and CPU, or to add more replicas for redundancy, switch to{' '}
              {formatComponentsList(
                customizablePlans.map((item) => {
                  return (
                    <button
                      className='text-primary hover:underline'
                      onClick={() => {
                        setPlan(item.slug)
                      }}>
                      {item.name}
                    </button>
                  )
                })
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
