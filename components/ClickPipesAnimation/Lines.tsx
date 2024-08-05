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
          <g stroke='#000'>
            <path d='M269.9 755V252h147.5v-89.63M261.1 755V273h-33.5V68.5' />
            <path d='M252.3 755V287H130.96v-30.3' />
            <path d='M243.5 755V308.5H82.74V162.37M278.7 755V298.5h43v-39' />
            <path d='M287.5 755V383.5h130v-29' />
            <path d='M296.5 755V395.35h208.66V68.5' />
          </g>
          <g stroke='#FAFF69'>
            <AnimatedPath
              duration='3s'
              d='M269.9 755V252h147.5v-89.63M261.1 755V273h-33.5V68.5'
            />
            <AnimatedPath duration='3s' d='M252.3 755V287H130.96v-30.3' />
            <AnimatedPath
              duration='4s'
              d='M243.5 755V308.5H82.74V162.37M278.7 755V298.5h43v-39'
            />
            <AnimatedPath duration='4s' d='M287.5 755V383.5h130v-29' />
            <AnimatedPath duration='3s' d='M296.5 755V395.35h208.66V68.5' />
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
