import { StrapiImage } from '@/lib/types/images'
import { EventForm } from '@/types/events'
import { ReactNode } from 'react'

export interface EventsContainerProps {
  children: ReactNode
  form?: EventForm | null
  recordedVimeoUrl?: string | null
  featuredImage?: StrapiImage | null
}

export interface EventsFormProps {
  featuredImage?: StrapiImage | null
  form?: EventForm | null
  recordedVimeoUrl?: string | null
}
