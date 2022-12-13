import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'

function InfoTooltip({ content }: { content: string }) {
  return (
    <div className='has-tooltip'>
      <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>
        {content}
      </span>
      <InformationCircleIcon className='h-3 w-3' />
    </div>
  )
}

type ElementType = {
  priceUSD: string
  meteringUnit: string
  meteringTooltip: string
}

interface Props {
  storage: ElementType
  compute: ElementType
}

function ShowPricing({ storage, compute }: Props) {
  return (
    <div className='pricing_info'>
      <div className='storage'>
        <h5 className='title'>Storage</h5>
        <span>
          <p className='price'>$ {storage.priceUSD}</p>
          <p className='unit-price'>
            {storage.meteringUnit}
            <InfoTooltip content={storage.meteringTooltip} />
          </p>
        </span>
      </div>
      <div className='compute'>
        <h5 className='title'>Compute</h5>
        <span>
          <p className='price'>${compute.priceUSD}</p>
          <p className='unit-price'>
            {compute.meteringUnit}
            <InfoTooltip content={compute.meteringTooltip} />
          </p>
        </span>
      </div>
    </div>
  )
}

export default ShowPricing
