import React from 'react'

export function ExternalLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      fill='none'
      viewBox='0 0 14 14'
      {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M9.66653 1h3.33337v3.33333M8.33322 5.66667 12.9999 1m-1.3334 7.33331v3.33329c0 .7367-.5966 1.3334-1.3333 1.3334H2.33321c-.73667 0-1.333332-.5967-1.333332-1.3334V3.66665c0-.73667.596662-1.33334 1.333332-1.33334h3.33333'
      />
    </svg>
  )
}
