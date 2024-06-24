import { StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps } from './homepage'

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
  address: string
}

export interface EventForm {
  firstNameLabel: string
  lastNameLabel: string
  emailLabel: string
  submitButtonLabel: string
  type: 'recordedGatedContent' | 'eventRegistration'
  SuccessMessage?: string
}
export type EventType = {
  id: number
  title: string
  slug?: string
  shortDescription: string
  description: string
  richDescription: string
  localDatetime: string
  datetimeAndTimezoneString: string
  viewMoreDetailsText: string
  category: string
  thumbnailPng: StrapiImageType
  hostedBy: EventHostedBy
  agenda?: EventAgenda
  location: EventLocation
  darkFeatureImagePng: StrapiImageType
  lightFeatureImagePng: StrapiImageType
  eventEnded: boolean
  eventVideoUrl: string
  form: EventForm
  featured: boolean
  recordedVimeoUrl?: string
  keywords?: string
}

export interface EventProps extends EventType, CommonProps {
  recentEvents: Array<EventType>
}
