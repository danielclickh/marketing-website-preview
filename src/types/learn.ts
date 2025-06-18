import { CommonProps, HomepageCustomerStories } from './homepage'
import { EventType } from '@/types/events'

export interface LearnProps extends CommonProps {
  customerStories: HomepageCustomerStories
  events: Array<EventType>
}
