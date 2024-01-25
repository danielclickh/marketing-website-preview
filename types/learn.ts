import { EventType } from './events'
import { CommonProps, HomepageCustomerStories } from './homepage'

export interface LearnProps extends CommonProps {
  customerStories: HomepageCustomerStories
}
