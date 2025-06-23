import { CommonProps, HomepageCustomerStories } from './homepage'
import { EventType } from '@/types/events'

export interface TrainingSimpleEvent
  extends Pick<
    EventType,
    | 'id'
    | 'title'
    | 'slug'
    | 'category'
    | 'localDatetime'
    | 'featured'
    | 'shortDescription'
    | 'richDescription'
    | 'location'
  > {
  extractedTime?: null | string
}

export interface LearnProps extends CommonProps {
  customerStories: HomepageCustomerStories
  events: Array<TrainingSimpleEvent>
}
