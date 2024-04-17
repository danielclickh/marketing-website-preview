import { ReactHTML } from 'react'
import styles from './styles.module.scss'

interface Props {
  className?: string
}

const Lines = ({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`mt-1 ${styles.linesMask} ${className}`} {...props}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='485'
        height='703'
        viewBox='0 0 485 703'>
        <g fill='none' fillRule='evenodd' strokeWidth='2'>
          <g stroke='#000'>
            <path d='M246.9 703.5v-503h144.5v-89.6232748' />
            <path d='M238.1 703.5v-482h-36.5v-207' />
            <path d='M229.3 703.5v-468H118.8v-219' />
            <path d='M220.5 703.5V257H105v-51' />
            <path d='m255.7 703.5.002-456.5h40v-39' />
            <path d='m264.5 703.5.002-371.5h127v-29' />
          </g>
          <g stroke='#FAFF69'>
            {/* Row: 2; Col: 5; */}
            <path d='M246.9 703.5v-503h144.5v-89.6232748'>
              <animate
                dur='3s'
                attributeName='stroke-dasharray'
                repeatCount='indefinite'
                values='0,621,0,621; 0,0,120,621; 0,0,0,621'
                keyTimes='0; 0.8; 1'
              />
            </path>

            {/* Row: 1; Col: 3; */}
            <path d='M238.1 703.5v-482h-36.5v-207'>
              <animate
                dur='4s'
                attributeName='stroke-dasharray'
                repeatCount='indefinite'
                values='0,621,0,621; 0,0,120,621; 0,0,0,621'
                keyTimes='0; 0.8; 1'
              />
            </path>

            {/* Row: 1; Col: 2; */}
            <path d='M229.3 703.5v-468H118.8v-219'>
              <animate
                dur='2s'
                attributeName='stroke-dasharray'
                repeatCount='indefinite'
                values='0,721,0,721; 0,0,120,721; 0,0,0,721'
                keyTimes='0; 0.8; 1'
              />
            </path>

            {/* Row: 3; Col: 2; */}
            <path d='M220.5 703.5V257H105v-51'>
              <animate
                dur='6s'
                attributeName='stroke-dasharray'
                repeatCount='indefinite'
                values='0,721,0,721; 0,0,120,721; 0,0,0,721'
                keyTimes='0; 0.8; 1'
              />
            </path>

            {/* Row: 3; Col: 4; */}
            <path d='m255.7 703.5.002-456.5h40v-39'>
              <animate
                dur='3s'
                attributeName='stroke-dasharray'
                repeatCount='indefinite'
                values='0,721,0,721; 0,0,120,721; 0,0,0,721'
                keyTimes='0; 0.8; 1'
              />
            </path>

            {/* Row: 4; Col: 5; */}
            <path d='m264.5 703.5.002-371.5h127v-29'>
              <animate
                dur='5s'
                attributeName='stroke-dasharray'
                repeatCount='indefinite'
                values='0,721,0,721; 0,0,120,721; 0,0,0,721'
                keyTimes='0; 0.8; 1'
              />
            </path>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Lines
