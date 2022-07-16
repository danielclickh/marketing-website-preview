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
