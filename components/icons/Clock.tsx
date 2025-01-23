import { HtmlHTMLAttributes } from 'react'

export default function Clock(props: HtmlHTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M16.0005 28.0001C12.0925 28.0001 8.61654 26.0987 6.42188 23.1841'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M6.42133 23.184C4.90933 21.176 4 18.692 4 16C4 9.4 9.4 4 16 4'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M9.8125 20.852L16.3752 16.9373V8.5'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
