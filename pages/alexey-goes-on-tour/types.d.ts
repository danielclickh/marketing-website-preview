import { LinkProps } from 'next/link'
import { EventType } from '../../types/events'
import { CommonProps } from '../../types/homepage'

export type CountryItem = string

export interface ScheduleItem {
  heading: string
  subHeading: string
  link: {
    label: string | React.ReactNode
    href: LinkProps['href']
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  }
  emoji: string
  date: Date
}

export interface PageProps extends CommonProps {
  recentEvents: Array<EventType>
}
