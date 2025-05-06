import styles from './styles.module.scss'

interface LinesProps extends React.HTMLProps<HTMLDivElement> {}

export default function Lines({ className = '', ...props }: LinesProps) {
  return (
    <div className={`mt-1 ${styles.linesMask} ${className}`} {...props}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='540'
        height='755'
        viewBox='0 0 540 755'>
        <g fill='none' fillRule='evenodd' strokeWidth='2'>
          {/* Transparent square shape to retain SVG size when copying into editor  */}
          <path fill='none' d='M0 0h540v755H0z' />

          {/* Static lines */}
          <g stroke='#000'>
            <path d='M270.16 755.5v-503h141.95v-89.63M261.36 755.5v-482h-33.5V69' />
            <path d='M252.56 755.5v-468H131.22v-30.3' />
            <path d='M243.76 755.5V309H34.86V68.92m244.1 686.58V299l37.6-.58v-39' />
            <path d='M287.76 755.5V384h124.35v-32.63' />
            <path d='M296.76 755.5V395.85h208.66V69m-271 686.5V395.85H34.85v-44.48' />
          </g>

          {/* Animated lines */}
          <g stroke='#FAFF69'>
            <AnimatedPath
              duration='3s'
              d='M270.16 755.5v-503h141.95v-89.63M261.36 755.5v-482h-33.5V69'
            />
            <AnimatedPath duration='4s' d='M252.56 755.5v-468H131.22v-30.3' />
            <AnimatedPath
              duration='5s'
              d='M243.76 755.5V309H34.86V68.92m244.1 686.58V299l37.6-.58v-39'
            />
            <AnimatedPath duration='3s' d='M287.76 755.5V384h124.35v-32.63' />
            <AnimatedPath
              duration='4s'
              d='M296.76 755.5V395.85h208.66V69m-271 686.5V395.85H34.85v-44.48'
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

interface AnimatedPathProps {
  d: React.SVGProps<SVGPathElement>['d']
  duration?: React.SVGAttributes<SVGPathElement>['dur']
}

function AnimatedPath({ d, duration = '3s' }: AnimatedPathProps) {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min

  const end = 755 - rand(0, 100)
  return (
    <path d={d}>
      <animate
        dur={duration}
        attributeName='stroke-dasharray'
        repeatCount='indefinite'
        values={`0,${end},0,${end}; 0,0,120,${end}; 0,0,0,${end}`}
        keyTimes='0; 0.8; 1'
      />
    </path>
  )
}
