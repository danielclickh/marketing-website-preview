import { StrapiImage } from '@/lib/types/images'
import { EventForm } from '@/types/events'
import { ReactNode } from 'react'

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
}
