import {StrapiButton} from "../common/protocol/strapi.protocol";

export interface EventHost {
  name: string;
  role: string;
  avatarPngUrl: string;
}

export interface EventHostedBy {
  title: string;
  hosts: Array<EventHost>;
}

export interface EventAgendaItem {
  time: string;
  topic: string;
}

export interface EventAgenda {
  title: string;
  items: Array<EventAgendaItem>;
}

export interface EventLocation {
  city: string;
  country: string;
  address: string;
}

export interface Event {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  datetime: string;
  timezone: string;
  category: string;
  thumbnailPngUrl: string;
  hostedBy: EventHostedBy;
  agenda?: EventAgenda;
  location: EventLocation;
  darkFeatureImagePngUrl: string;
  lightFeatureImagePngUrl: string;
}

export interface NewsAndEventsHero {
  title: string;
  description: string;
}

interface NewsItem {
  headline: string;
  shortIntro: string;
  publication: string;
  date: string;
  ctaButton: StrapiButton;
}

export interface NewsAndEventsData {
  hero: NewsAndEventsHero;
  latestNewsTitle: string;
  upcomingEventsTitle: string;
  featuredEventPretitle: string;
  pressReleasesTitle: string;
  newsItems: Array<NewsItem>;
  pressReleases: Array<NewsItem>;
  events: Array<Event>;
}
