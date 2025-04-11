import { HtmlHTMLAttributes } from 'react'

export default function FileDashed(
  props: HtmlHTMLAttributes<HTMLOrSVGElement>
) {
  return (
    <svg
      {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M24.0044 18.6674V25.3368C24.0044 26.8102 22.81 28.0046 21.3366 28.0046H6.66387C5.1905 28.0046 3.99609 26.8102 3.99609 25.3368V6.66241C3.99609 5.18903 5.1905 3.99463 6.66387 3.99463H21.3366C22.81 3.99463 24.0044 5.18903 24.0044 6.66241V10.6641'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M17.334 17.8858V21.3352H20.7834C21.1372 21.3352 21.4764 21.1946 21.7265 20.9444L27.1768 15.4941C28.2813 14.3889 28.2813 12.5977 27.1768 11.4925V11.4925C26.0715 10.3879 24.2803 10.3879 23.1751 11.4925L17.7248 16.9427C17.4746 17.1928 17.334 17.532 17.334 17.8858Z'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M9.33203 16H13.3337'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M9.33203 21.3354H13.3337'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M9.33203 10.6645H18.6693'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
