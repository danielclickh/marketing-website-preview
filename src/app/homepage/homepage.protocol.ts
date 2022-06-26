import {LinkTarget, StrapiButton} from "../common/protocol/strapi.protocol";

export interface HomepageHeroHighlight {
  title: string;
  description: string;
  href: string;
  target: LinkTarget;
  buttonText: string;
}

export interface HomepageHero {
  title: string;
  description: string;
  ctaButton: StrapiButton;
  darkBackgroundIconUrl: string;
  lightBackgroundIconUrl: string;
  highlights: Array<HomepageHeroHighlight>;
}

export interface HomepageAboutClickhouse {
  title: string;
  features: Array<HomepageAboutClickhouseFeature>;
  allFeaturesButton: StrapiButton;
}

export interface HomepageClickhouseCloud {
  pretitle: string;
  title: string;
  description: string;
  items: Array<HomepageClickhouseCloudItem>;
  primaryButton: StrapiButton;
  secondaryButton: StrapiButton;
}

export interface HomepageTestimonials {
  pretitle: string;
  title: string;
  description: string;
  testimonialsIconSvgId: string;
  bottomIconSvgId: string;
  items: Array<HomepageTestimonialItem>;
}

export interface HomepageTestimonialItem {
  id: string;
  title: string;
  author: string;
  href: string;
  target: LinkTarget;
}

export interface HomepageClickhouseCloudItem {
  id: string;
  title: string;
  description: string;
  bullets: Array<string>;
  screenshotPngUrl: string;
}

export interface HomepageCustomerStories {
  title: string;
  description: string;
  logos: Array<HomepageCustomerStoryLogo>;
  ctaButton: StrapiButton;
}

export interface HomepageCustomerStoryLogo {
  id: string;
  darkLogoPngUrl: string;
  lightLogoPngUrl: string;
  href: string;
  target: LinkTarget;
}

export interface HomepageAboutClickhouseFeature {
  id: string;
  title: string;
  description: string;
  iconSvgId: string;
}

export interface HomepageData {
  hero: HomepageHero;
  aboutClickhouse: HomepageAboutClickhouse;
  customerStories: HomepageCustomerStories;
  clickhouseCloud: HomepageClickhouseCloud;
  testimonials: HomepageTestimonials;
}
