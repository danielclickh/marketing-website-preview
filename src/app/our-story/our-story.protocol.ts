import {StrapiButton} from "../common/protocol/strapi.protocol";

export interface OurStoryOffices {
  flagPngUrl: string;
  name: string;
  location: string;
}

export interface OurStoryAboutUsItem {
  title?: string;
  subtitle?: string;
  description: string;
  imagePngUrl: string;
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
  profileImagePngUrl: string;
  name: string;
  role: string;
}

export interface OurStoryTeam {
  foundersTitle: string;
  investorsTitle: string;
  founders: Array<OurStoryTeamMemberProfile>;
  investors: Array<OurStoryTeamMemberProfile>;
  darkInvestorLogosPngUrls: Array<string>;
  lightInvestorLogosPngUrls: Array<string>;
}

interface OurStoryHero {
  title: string;
  description: string;
  imagePngUrl: string;
  offices: Array<OurStoryOffices>;
}

export interface OurStoryData {
  hero: OurStoryHero;
  aboutUs: OurStoryAboutUs;
  ourHistory: OurStoryOurHistory;
  hiring: OurStoryHiring;
  team: OurStoryTeam;

}
