import { HtmlHTMLAttributes } from 'react'

export default function Bullseye(props: HtmlHTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.2017 14.7808L7.59766 24.3848'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.5996 14.7808H17.2011V18.3823'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M11.1991 26.9803C12.6704 27.6233 14.2924 27.9861 16.0011 27.9861C22.6319 27.9861 28.0061 22.6118 28.0061 15.9811C28.0061 9.35031 22.6319 3.97607 16.0011 3.97607C9.37033 3.97607 3.99609 9.35031 3.99609 15.9811C3.99609 17.7071 4.36691 19.3438 5.02319 20.8271'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M14.8013 23.0771C15.1922 23.1451 15.5923 23.1838 16.0018 23.1838C19.9795 23.1838 23.2048 19.9585 23.2048 15.9808C23.2048 12.0032 19.9795 8.77783 16.0018 8.77783C12.0242 8.77783 8.79883 12.0032 8.79883 15.9808C8.79883 16.3903 8.83751 16.7905 8.90554 17.1813'
        stroke='#FAFF69'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
