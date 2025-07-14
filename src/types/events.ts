import { CommonProps } from './homepage'
import { StrapiImageType } from '@/lib/api/strapi/types'

export interface PageProps {
  params: { slug: string }
}

export interface EventHost {
  name: string
  role: string
  avatarPng: StrapiImageType
}

export interface EventHostedBy {
  title: string
  hosts: Array<EventHost>
}
export interface EventAgendaItem {
  time: string
  topic: string
}

export interface EventAgenda {
  title: string
  items: Array<EventAgendaItem>
}

export interface EventLocation {
  city: string
  country: string
}

export interface EventForm {
  firstNameLabel: string
  lastNameLabel: string
  emailLabel: string
  submitButtonLabel: string
  type: 'recordedGatedContent' | 'eventRegistration'
  SuccessMessage?: string
  stripeBuyButtonId?: `buy_btn_${string}`
  disabled: null | boolean
  marketoFormId: null | string
}
export type EventType = {
  id: number
  title: string
  slug: string
  category: string
  localDatetime: string
  featured: boolean
  StagingOnly?: boolean | null
  location: EventLocation
  thumbnailPng: StrapiImageType | null
  eventVideoUrl: string | null
  shortDescription: string | null
  richDescription: string | null
  hostedBy: EventHostedBy | null
  agenda: EventAgenda | null
  form: EventForm | null
  recordedVimeoUrl: string | null
}

export interface EventProps extends EventType, CommonProps {
  recentEvents: Array<EventType>
}
