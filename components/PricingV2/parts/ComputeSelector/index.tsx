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

  useEffect(() => {
    if (
      computeMinSize !== null &&
      computeMaxSize !== null &&
      computeMinSize > computeMaxSize
    ) {
      setComputeMaxSize(computeMinSize)
    }
  }, [computeMinSize])

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
            <div className='grid grid-cols-2 flex-col gap-4 lg:flex-row'>
              {packages.map((resource, index) => {
                const isActive =
                  !customizing &&
                  replicas === resource.replicas &&
                  (!resource.minimumCompute ||
                    (resource.minimumCompute &&
                      resource.minimumCompute.size === computeMinSize)) &&
                  (!resource.maximumCompute ||
                    (resource.maximumCompute &&
                      resource.maximumCompute.size === computeMaxSize))
                return (
                  <button
                    key={index}
                    className={`flex flex-1 flex-col rounded-[4px] border border-neutral-700 bg-neutral-750 px-3 py-2 text-left shadow-input transition-colors focus:outline-none ${
                      isActive
                        ? 'border-primary'
                        : 'hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
                    }`}
                    onClick={(event) => {
                      event.preventDefault()
                      setCustomizing(false)
                      setReplicas(resource.replicas)
                      if (resource.minimumCompute)
                        setComputeMinSize(resource.minimumCompute.size)
                      if (resource.maximumCompute)
                        setComputeMaxSize(resource.maximumCompute.size)
                    }}>
                    <span className='font-medium'>{resource.name}</span>
                    {resource.description && (
                      <small className='opacity-70'>
                        {resource.description}
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
              className={`mt-4 rounded border ${
                customizing ? 'border-primary' : ''
              }`}>
              <button
                className='block w-full p-4 text-left'
                onClick={(event) => {
                  event.preventDefault()
                  if (!customizing) setCustomizing(true)
                }}>
                Customize
              </button>
              <div
                className={`space-y-8 p-4 pt-0 ${
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
                      className='inline text-primary hover:underline'
                      onClick={() => setPlan(item.slug)}>
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
