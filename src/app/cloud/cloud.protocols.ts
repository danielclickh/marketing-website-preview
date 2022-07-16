import {StrapiButton, StrapiImage} from "../common/protocol/strapi.protocol";
import {ContactForm, Feature, ScreenshotAndBullets, SeoMetadata} from "../common/protocol/common.protocol";

export interface CloudProvider {
  title: string;
  darkProviderPngs: Array<StrapiImage>;
  lightProviderPngs: Array<StrapiImage>;
}

export interface CloudHero {
  title: string;
  description: string;
  ctaButton: StrapiButton;
  cloudProviders: Array<CloudProvider>;
  videoGif: StrapiImage;
  backgroundSvg: StrapiImage;
}

export interface CloudEarlyAccessForm {
  pretitle: string;
  title: string;
  description: string;
  contactForm: ContactForm;
}

export interface CloudData {
  hero: CloudHero;
  features: Array<Feature>;
  screenshotsAndBullets: Array<ScreenshotAndBullets>;
  earlyAccessForm: CloudEarlyAccessForm;
  seo: SeoMetadata;
}
