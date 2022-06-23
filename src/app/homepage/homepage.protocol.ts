import {StrapiButton} from "../common/protocol/strapi.protocol";

export interface HomepageHero {
  title: string;
  description: string;
  ctaButton: StrapiButton;
  darkBackgroundIconUrl: string;
  lightBackgroundIconUrl: string;
}

export interface HomepageData {
  hero: HomepageHero;
}
