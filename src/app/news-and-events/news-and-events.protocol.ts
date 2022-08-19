import {StrapiButton, StrapiImage} from "../common/protocol/strapi.protocol";
import {SeoMetadata} from "../common/protocol/common.protocol";

export interface EventHost {
  name: string;
  role: string;
  avatarPng: StrapiImage;
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

export interface EventForm {
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  submitButtonLabel: string;
  type: 'recordedGatedContent' | 'eventRegistration';
}

export interface Event {
  id: number;
  title: string;
  slug?: string;
  shortDescription: string;
  description: string;
  localDatetime: string;
  datetimeAndTimezoneString: string;
  viewMoreDetailsText: string;
  category: string;
  thumbnailPng: StrapiImage
  hostedBy: EventHostedBy;
  agenda?: EventAgenda;
  location: EventLocation;
  darkFeatureImagePng: StrapiImage
  lightFeatureImagePng: StrapiImage
  eventEnded: boolean;
  eventVideoUrl: string;
  form: EventForm;
  featured: boolean;
  recordedVimeoUrl?: string;
  keywords?: string;
}

export interface NewsAndEventsHero {
  title: string;
  description: string;
}

export interface NewsItem {
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
  pressReleasesTitle: string;
  newsItems: Array<NewsItem>;
  pressReleases: Array<NewsItem>;
  featuredEvent?: Event;
  upcomingEvents: Array<Event>;
  pastEvents: Array<Event>;
  seo: SeoMetadata;
}
