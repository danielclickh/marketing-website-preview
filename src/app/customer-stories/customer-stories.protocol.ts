import {StrapiButton, StrapiImage} from "../common/protocol/strapi.protocol";
import {SeoMetadata} from "../common/protocol/common.protocol";

export interface CustomerStoriesTestimonial {
  avatar: StrapiImage;
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
  darkLogoPng: StrapiImage;
  lightLogoPng: StrapiImage;
  description: string;
  bullets: Array<UseCaseBullet>;
  ctaButton: StrapiButton;
  anchorId: string;
}

export interface UseCases {
  title: string;
  description: string;
  spotlightTitle: string;
}

export interface CustomerStoriesHero {
  title: string;
  description: string;
  testimonials: Array<CustomerStoriesTestimonial>;
}

export interface CustomerStoriesData {
  hero: CustomerStoriesHero;
  useCases: UseCases;
  spotlightUseCase: UseCasesItem;
  useCaseItems: Array<UseCasesItem>;
  seo: SeoMetadata;
}
