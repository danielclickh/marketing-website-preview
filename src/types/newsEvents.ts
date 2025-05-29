import { EventType } from './events'
import { CommonProps } from './homepage'
import { SeoMetadata, StrapiButton } from '@/lib/api/strapi/types'

export interface NewsItem {
  headline: string
  shortIntro: string
  publication: string
  date: string
  ctaButton: StrapiButton
}

export interface NewsAndEventsData {
  hero: {
    title: string
    description: string
  }
  latestNewsTitle: string
  upcomingEventsTitle: string
  pressReleasesTitle: string
  newsItems: Array<NewsItem>
  pressReleases: Array<NewsItem>
  featuredEvent?: EventType
  upcomingEvents: Array<EventType>
  pastEvents: Array<EventType>
  seo: SeoMetadata
}

export interface NewsItemProps {
  source: string
  date: string
  title: string
  abstract: string
  ctaButton: StrapiButton
}

export interface EventsPageProps extends CommonProps {
  featuredEvent: EventType | null
  allEvents: Array<EventType>
  recentEvents: Array<EventType>
}

export interface NewsPageProps extends CommonProps {
  newsItems: Array<NewsItem>
  pressReleases: Array<NewsItem>
}
