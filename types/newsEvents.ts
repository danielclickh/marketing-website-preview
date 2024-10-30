import { SeoMetadata, StrapiButton } from '../lib/api/strapi/types'
import { EventType } from './events'
import { CommonProps } from './homepage'

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

export interface NewsEventProps extends CommonProps {
  title: string
  description: string
  featuredEvent?: EventType
  newsItems: Array<NewsItem>
  latestNewsTitle: string
  upcomingEventsTitle: string
  pressReleasesTitle: string
  pressReleases: Array<NewsItem>
  allEvents: Array<EventType>
  recentEvents: Array<EventType>
}
