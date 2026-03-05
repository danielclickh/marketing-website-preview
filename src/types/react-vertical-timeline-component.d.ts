declare module 'react-vertical-timeline-component' {
  import { CSSProperties, ReactNode } from 'react'

  interface VerticalTimelineProps {
    animate?: boolean
    className?: string
    layout?: '1-column-left' | '1-column-right' | '2-columns'
    lineColor?: string
    children?: ReactNode
  }

  interface VerticalTimelineElementProps {
    children?: ReactNode
    className?: string
    contentArrowStyle?: CSSProperties
    contentStyle?: CSSProperties
    date?: string
    dateClassName?: string
    icon?: ReactNode
    iconClassName?: string
    iconStyle?: CSSProperties
    id?: string
    position?: 'left' | 'right'
    shadowSize?: 'small' | 'medium' | 'large'
    style?: CSSProperties
    textClassName?: string
    visible?: boolean
  }

  export function VerticalTimeline(props: VerticalTimelineProps): JSX.Element
  export function VerticalTimelineElement(props: VerticalTimelineElementProps): JSX.Element
}
