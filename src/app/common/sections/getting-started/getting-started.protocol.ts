import {StrapiButton} from "../../protocol/strapi.protocol";

export interface GettingStartedData {
  pretitle: string;
  title: string;
  description: string;
  quickStartButton: StrapiButton;
  cloudButton: StrapiButton;
  platforms: Array<GettingStartedPlatform>;
  bottomText: string;
}

export interface GettingStartedPlatform {
  name: string;
  instructions: string;
}
