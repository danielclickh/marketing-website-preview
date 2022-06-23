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

export interface HomepageData {
  hero: HomepageHero;
}
