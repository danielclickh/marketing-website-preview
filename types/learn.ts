import { EventType } from './events'
import { CommonProps } from './homepage'

export interface LearnProps extends CommonProps {
  upcomingEvents: Array<EventType>
}
