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
  up: 'M 700 2 a 260 260 0 0 1 46 0 l 694 62 H 0 L 700 2 Z',
  down: 'M 0 0 L 700 62 a 260 260 0 0 0 46 -0 L 1440 0 V 64 H 0 V 0 Z'
}

const bottomPaths: Record<Direction, string> = {
  up: 'M 0 64 700 2 a 260 260 0 0 1 46 0 l 694 62 V 0 H 0 V 64 Z',
  down: 'M 1440 0 L 746 62 a 260 260 0 0 1 -46 0 L 0 0 H 1440 Z'
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
          viewBox='0 0 1440 64'
          style={{ transform: 'translateY(1%)' }}>
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
          viewBox='0 0 1440 64'
          style={{ transform: 'translateY(-1%)' }}>
          <path fill={bottomFill} d={bottomPaths[bottomDirection]} />
        </svg>
      )}
    </div>
  )
}
