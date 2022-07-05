import {StrapiButton} from "../common/protocol/strapi.protocol";

export interface CustomerStoriesTestimonial {
  avatarUrl: string;
  review: string;
  author: string;
  role: string;
  rating: number;
}

export interface UseCaseBullet {
  text: string;
}

export interface UseCasesItem {
  companyName: string;
  darkLogoPngUrl: string;
  lightLogoPngUrl: string;
  description: string;
  bullets: Array<UseCaseBullet>;
  ctaButton: StrapiButton;
}

export interface UseCases {
  title: string;
  description: string;
  spotlightTitle: string;
  items: Array<UseCasesItem>;
}

export interface CustomerStoriesHero {
  title: string;
  description: string;
  testimonials: Array<CustomerStoriesTestimonial>;
}

export interface CustomerStoriesData {
  hero: CustomerStoriesHero;
  useCases: UseCases;
}
