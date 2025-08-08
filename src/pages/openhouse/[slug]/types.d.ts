import { StrapiImageType, StrapiVideoType } from '@/lib/api/strapi/types'

type OpenhouseDateYear = `${number}${number}${number}${number}`
type OpenhouseDateMonth = `${number}${number}`
type OpenhouseDateDay = `${number}${number}`
type OpenhouseDate =
  `${OpenhouseDateYear}-${OpenhouseDateMonth}-${OpenhouseDateDay}`

export interface OpenhouseSpeakerEntry {
  name: string
  title: string
  headshot: StrapiImageType
  logo: null | StrapiImageType
}

export interface OpenhouseCard {
  title: string
  content: string
  icon: any
}

export interface OpenhouseDayAgenda {
  time: null | string
  title: string
  description: null | string
  speakers: Array<OpenhouseSpeakerEntry>
}

export interface OpenhouseDay {
  date: OpenhouseDate
  description: string
  agenda: Array<OpenhouseDayAgenda>
}

export interface OpenhouseFaq {
  question: string
  answer: string
}

export interface OpenhouseLogo {
  logo: StrapiImageType
  width: 'Small (1/4)' | 'Medium (1/3)' | 'Large (1/2)' | 'Full (1/1)'
}

export interface OpenhouseEntry {
  slug: string
  heading: string
  strapline: string
  startDate: OpenhouseDate
  endDate: OpenhouseDate
  applyToSpeakLink: string | null
  gallery: Array<StrapiImageType | StrapiVideoType>
  cards: Array<OpenhouseCard>
  days: Array<OpenhouseDay>
  featuredSpeakers: Array<OpenhouseSpeakerEntry>
  speakers: Array<OpenhouseSpeakerEntry>
  locationAddress: string
  locationImage: StrapiImageType
  faqs: Array<OpenhouseFaq>
  logos: Array<OpenhouseLogo>
  marketoFormId: string
  speakersIntro: string
  faqsIntro: string
  navRegisterLabel: string
  agendaRegisterLabel: string
  speakersRegisterLabel: string
  locationRegisterLabel: string
  comingSoon: boolean
  seo: null | {
    title: null | string
    keywords: null | string
    description: null | string
    image: null | Array<StrapiImageType>
  }
}
