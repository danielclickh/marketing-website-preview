import { ReactNode } from 'react'
import { StrapiImage } from '../../lib/types/images'
import { EventForm } from '../../types/events'

export interface EventsContainerProps {
  children: ReactNode
  localDatetime: string
  form: EventForm
  recordedVimeoUrl?: string
  featuredImage?: StrapiImage
}

export interface EventsFormProps {
  submitted: boolean
  onSubmit: () => void
  featuredImage?: StrapiImage
  form: EventForm
  recordedVimeoUrl?: string
}
