import { StrapiButton } from '../../../lib/api/strapi/types'
import { EventType } from '../events/[slug]/types'

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
}

export interface NewsItemProps {
  source: string
  date: string
  title: string
  abstract: string
  ctaButton: StrapiButton
}
