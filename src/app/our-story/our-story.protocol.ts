import {StrapiButton, StrapiImage} from "../common/protocol/strapi.protocol";
import {SeoMetadata} from "../common/protocol/common.protocol";

export interface OurStoryOffices {
  flagPng: StrapiImage;
  name: string;
  location: string;
}

export interface OurStoryAboutUsItem {
  title?: string;
  subtitle?: string;
  description: string;
  imagePng: StrapiImage;
}

export interface OurStoryAboutUs {
  title: string;
  items: Array<OurStoryAboutUsItem>
}

interface OurStoryOurHistoryItem {
  year: string;
  text: string;
}

export interface OurStoryOurHistory {
  title: string;
  items: Array<OurStoryOurHistoryItem>;
}

interface OurStoryHiring {
  title: string;
  description: string;
  ctaButton: StrapiButton;
}

export interface OurStoryTeamMemberProfile {
  profileImagePng: StrapiImage;
  name: string;
  role: string;
}

export interface OurStoryTeam {
  foundersTitle: string;
  investorsTitle: string;
  founders: Array<OurStoryTeamMemberProfile>;
  investors: Array<OurStoryTeamMemberProfile>;
  darkInvestorLogosPng: Array<StrapiImage>;
  lightInvestorLogosPng: Array<StrapiImage>;
}

interface OurStoryHero {
  title: string;
  description: string;
  imagePng: StrapiImage;
  offices: Array<OurStoryOffices>;
}

export interface OurStoryData {
  hero: OurStoryHero;
  aboutUs: OurStoryAboutUs;
  ourHistory: OurStoryOurHistory;
  hiring: OurStoryHiring;
  team: OurStoryTeam;
  seo: SeoMetadata;
}
