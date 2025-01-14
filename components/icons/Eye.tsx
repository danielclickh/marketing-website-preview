import { HtmlHTMLAttributes } from 'react'

export default function Eye(props: HtmlHTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width='61'
      height='60'
      viewBox='0 0 61 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        d='M30.5352 13.125C11.7852 13.125 4.28516 30 4.28516 30C4.28516 30 11.7852 46.875 30.5352 46.875C49.2852 46.875 56.7852 30 56.7852 30C56.7852 30 49.2852 13.125 30.5352 13.125Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M30.5352 39.375C35.7128 39.375 39.9102 35.1777 39.9102 30C39.9102 24.8223 35.7128 20.625 30.5352 20.625C25.3575 20.625 21.1602 24.8223 21.1602 30C21.1602 35.1777 25.3575 39.375 30.5352 39.375Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
