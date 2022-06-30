import {StrapiButton} from "../common/protocol/strapi.protocol";
import {Feature} from "../common/protocol/common.protocol";

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
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  companyLabel: string;
  useCaseLabel: string;
  submitButton: StrapiButton;
  disclaimer: string;
}

export interface CloudData {
  hero: CloudHero;
  features: Array<Feature>;
  earlyAccessForm: CloudEarlyAccessForm;
}
