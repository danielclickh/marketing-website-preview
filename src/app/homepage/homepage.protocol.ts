import {StrapiButton, StrapiImage, StrapiLink} from "../common/protocol/strapi.protocol";
import {Feature, ScreenshotAndBullets, SeoMetadata} from "../common/protocol/common.protocol";

export interface HomepageHeroHighlight extends StrapiLink {
  title: string;
  description: string;
  buttonText: string;
}

export interface HomepageHero {
  title: string;
  description: string;
  ctaButton: StrapiButton;
  darkBackgroundIcon: StrapiImage;
  lightBackgroundIcon: StrapiImage;
  highlights: Array<HomepageHeroHighlight>;
}

export interface HomepageAboutClickhouse {
  title: string;
  features: Array<Feature>;
  allFeaturesButton: StrapiButton;
}

export interface HomepageClickhouseCloud {
  pretitle: string;
  title: string;
  description: string;
  primaryButton: StrapiButton;
  secondaryButton: StrapiButton;
}

export interface HomepageTestimonials {
  pretitle: string;
  title: string;
  description: string;
  testimonialsIconSvg: StrapiImage;
  bottomIconSvg: StrapiImage;
  testimonialItems: Array<HomepageTestimonialItem>;
}

export interface HomepageTestimonialItem extends StrapiLink {
  id: string;
  title: string;
  author: string;
}

export interface HomepageCustomerStories {
  title: string;
  description: string;
  logos: Array<HomepageCustomerStoryLogo>;
  ctaButton: StrapiButton;
}

export interface HomepageCustomerStoryLogo extends StrapiLink {
  id: string;
  darkLogoPng: StrapiImage;
  lightLogoPng: StrapiImage;
}

export interface HomepageData {
  hero: HomepageHero;
  aboutClickhouse: HomepageAboutClickhouse;
  customerStories: HomepageCustomerStories;
  clickhouseCloud: HomepageClickhouseCloud;
  clickhouseCloudItems: Array<ScreenshotAndBullets>;
  testimonials: HomepageTestimonials;
  seo: SeoMetadata;
}
