import React, { HTMLAttributes } from 'react'

function LaptopSvg(props: HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width='69'
      height='64'
      viewBox='0 0 69 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        d='M11.3423 44V18C11.3423 16.9391 11.7859 15.9217 12.5755 15.1716C13.3651 14.4214 14.4361 14 15.5528 14H53.4475C54.5643 14 55.6352 14.4214 56.4248 15.1716C57.2145 15.9217 57.6581 16.9391 57.6581 18V44'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M7.13184 44H61.8687V48C61.8687 49.0609 61.4251 50.0783 60.6354 50.8284C59.8458 51.5786 58.7749 52 57.6582 52H11.3424C10.2257 52 9.1547 51.5786 8.36507 50.8284C7.57544 50.0783 7.13184 49.0609 7.13184 48V44Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M38.7106 22H30.2896'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default LaptopSvg
