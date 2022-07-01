import {StrapiButton} from "./strapi.protocol";

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconSvgId: string;
}

export interface ScreenshotAndBullets {
  id: string;
  title: string;
  description: string;
  bullets: Array<string>;
  screenshotPngUrl: string;
}

export interface ContactForm {
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  companyLabel: string;
  messageLabel: string;
  submitButton: StrapiButton;
  disclaimer: string;
}
