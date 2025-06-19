import ReactMarkdown from 'react-markdown'

import children = ReactMarkdown.propTypes.children

type Direction = 'up' | 'down'

interface BaseProps {
  className?: string
  children: React.ReactNode
  topFill?: React.SVGProps<SVGPathElement>['fill']
  bottomFill?: React.SVGProps<SVGPathElement>['fill']
}

interface TopProps extends BaseProps {
  topDirection: Direction
  bottomDirection?: Direction
}

interface BottomProps extends BaseProps {
  topDirection?: Direction
  bottomDirection: Direction
}

export type AngledSectionProps = TopProps | BottomProps

const topPaths: Record<Direction, string> = {
  up: 'M1440 64 747.39 1.04a260 260 0 0 0-46.19-.02L0 64h1440Z',
  down: 'm0 0 701.2 62.16a260 260 0 0 0 46.19-.02L1440 0v64H0V0Z'
}

const bottomPaths: Record<Direction, string> = {
  up: 'M0 64 701.2 2.05a260 260 0 0 1 46.19.02L1440 64V0H0v64Z',
  down: 'M1440 0 747.39 62.14a260 260 0 0 1-46.19.02L0 0h144  0Z'
}

export default function AngledSection({
  className = '',
  children,
  topDirection,
  bottomDirection,
  topFill = 'currentColor',
  bottomFill = 'currentColor'
}: AngledSectionProps) {
  return (
    <div className={className}>
      {topDirection && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1440'
          height='64'
          fill='none'
          className='h-auto w-full'
          viewBox='0 0 1440 64'>
          <path fill={topFill} d={topPaths[topDirection]} />
        </svg>
      )}
      {children}
      {bottomDirection && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1440'
          height='64'
          fill='none'
          className='h-auto w-full'
          viewBox='0 0 1440 64'>
          <path fill={bottomFill} d={bottomPaths[bottomDirection]} />
        </svg>
      )}
    </div>
  )
}
