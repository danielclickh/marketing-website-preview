import { ReactNode } from 'react'
import { StrapiImage } from '@/lib/types/images'
import { EventForm } from '@/types/events'

export interface EventsContainerProps {
  children: ReactNode
  form?: EventForm | null
  recordedVimeoUrl?: string | null
  featuredImage?: StrapiImage
}

export interface EventsFormProps {
  featuredImage?: StrapiImage
  form?: EventForm | null
  recordedVimeoUrl?: string | null
}
