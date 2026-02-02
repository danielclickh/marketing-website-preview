export type Types =
  | 'black-on-yellow'
  | 'white-on-yellow'
  | 'white-on-black'
  | 'yellow-on-black'

export interface TiltedTextProps extends React.HTMLProps<HTMLSpanElement> {
  type: Types
  children: React.ReactNode
  ref?: React.Ref<HTMLSpanElement>
  angle?: number
}

const mainClasses: Record<Types, string> = {
  'black-on-yellow': 'flip-selection',
  'white-on-yellow': 'flip-selection',
  'white-on-black': '',
  'yellow-on-black': ''
}

const textClasses: Record<Types, string> = {
  'black-on-yellow': 'text-neutral-900',
  'white-on-yellow': 'text-white',
  'white-on-black': 'text-white',
  'yellow-on-black': 'text-primary-300'
}
const tiltClasses: Record<Types, string> = {
  'black-on-yellow': 'bg-primary-300',
  'white-on-yellow': 'bg-primary-300',
  'white-on-black': 'bg-neutral-900',
  'yellow-on-black': 'bg-neutral-900'
}

export default function TiltedText({
  type,
  children,
  className = '',
  ref,
  angle,
  ...props
}: TiltedTextProps) {
  return (
    <span
      ref={ref}
      className={`relative isolate ${mainClasses[type]} ${className}`}
      {...props}>
      <span
        className={`absolute inset-0 -z-10 -skew-y-3 ${tiltClasses[type]}`}
        style={{
          '--tw-skew-y': angle ? `${angle}deg` : null,
        } as React.CSSProperties}
      />
      <span className={textClasses[type]}>{children}</span>
    </span>
  )
}
