import { HtmlHTMLAttributes } from 'react'

export default function VideoSquare(
  props: HtmlHTMLAttributes<HTMLOrSVGElement>
) {
  return (
    <svg
      width='72'
      height='72'
      viewBox='0 0 72 72'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <rect
        x='1'
        y='1'
        width='70'
        height='70'
        rx='16'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M37.1733 45.2391H25.7142C24.2861 45.2391 23.127 44.08 23.127 42.6518V29.348C23.127 27.9198 24.2861 26.7607 25.7142 26.7607H37.1733C38.6014 26.7607 39.7605 27.9198 39.7605 29.348V42.6544C39.7605 44.0826 38.6014 45.2391 37.1733 45.2391Z'
        stroke='currentColor'
        strokeWidth='2.63'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M39.7598 34.1523L44.924 28.9881C45.1672 28.7449 45.4958 28.6104 45.8399 28.6104H47.7053C48.4194 28.6104 48.9989 29.1899 48.9989 29.904V42.1004C48.9989 42.8145 48.4194 43.394 47.7053 43.394H45.8399C45.4958 43.394 45.1672 43.2569 44.924 43.0163L39.7598 37.8521'
        stroke='currentColor'
        strokeWidth='2.63'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
