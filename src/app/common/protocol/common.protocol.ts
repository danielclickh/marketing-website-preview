import {StrapiImage} from "./strapi.protocol";

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconSvg: StrapiImage;
}

export interface Bullet {
  text: string;
}

export interface ScreenshotAndBullets {
  id: string;
  title: string;
  description: string;
  bullets: Array<Bullet>;
  screenshotPng: StrapiImage;
}

export interface ContactForm {
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  companyLabel: string;
  messageLabel: string;
  submitButtonLabel: string;
  disclaimer: string;
  thankYouMessage: string;
}

export interface NewsletterFormData {
  title: string;
  description: string;
  emailLabel: string;
  submitButtonLabel: string;
}

export interface SeoMetadata {
  title?: string;
  keywords?: string;
  description?: string;
  imageUrl?: string;
  type?: string;
  siteName?: string;
}
