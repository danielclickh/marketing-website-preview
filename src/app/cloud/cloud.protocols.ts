import {StrapiButton} from "../common/protocol/strapi.protocol";
import {ContactForm, Feature, ScreenshotAndBullets} from "../common/protocol/common.protocol";

export interface CloudProvider {
  title: string;
  darkProviderPngUrls: Array<string>;
  lightProviderPngUrls: Array<string>;
}

export interface CloudHero {
  title: string;
  description: string;
  ctaButton: StrapiButton;
  cloudProviders: Array<CloudProvider>;
  videoGifUrl: string;
  backgroundSvgId: string;
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
}
