import React from 'react'

export default function ClickHouseCloud({
  width = 52,
  height = 38,
  fill = 'none',
  stroke = 'currentColor',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  strokeWidth = '1.75',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      strokeWidth={strokeWidth}
      viewBox='0 0 52 38'
      {...props}>
      <path d='M15.5 19A17.50014 17.50014 0 0 1 26.303 2.83212a17.50012 17.50012 0 0 1 19.0714 3.79352 17.5008 17.5008 0 0 1 4.7894 8.96026 17.5008 17.5008 0 0 1-.9959 10.1111 17.4999 17.4999 0 0 1-6.4454 7.8537A17.50031 17.50031 0 0 1 33 36.5H13.75c-3.2489 0-6.36474-1.2906-8.66206-3.5879C2.79062 30.6147 1.5 27.4989 1.5 24.25c0-3.2489 1.29062-6.3647 3.58794-8.662C7.38526 13.2906 10.5011 12 13.75 12c1.0249-.0004 2.046.1245 3.0406.3719' />
    </svg>
  )
}
