import { ReactNode } from 'react'
import { EventForm } from '../../types/events'

export interface EventsContainerProps {
  children: ReactNode
  localDatetime: string
  form: EventForm
  recordedVimeoUrl?: string
}

export interface EventsFormProps {
  submitted: boolean
  onSubmit: () => void
  form: EventForm
}
