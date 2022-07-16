import {ContactForm, SeoMetadata} from "../common/protocol/common.protocol";

export interface ContactUsHero {
  title: string;
  description: string;
  contactForm: ContactForm;
}

export interface ContactUsData {
  hero: ContactUsHero;
  seo: SeoMetadata;
}
