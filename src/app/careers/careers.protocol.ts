import {SeoMetadata} from "../common/protocol/common.protocol";
import {StrapiImage} from "../common/protocol/strapi.protocol";

export interface CareersHero {
  title: string;
  description: string;
  companyImages: Array<StrapiImage>;
  paragraphTitle: string;
  paragraphText: string;
}

export interface CareersCompanyValue {
  title: string;
  description: string;
  iconSvg: StrapiImage;
}

export interface CareersData {
  hero: CareersHero;
  companyValues: Array<CareersCompanyValue>;
  positionsTitle: string;
  seo: SeoMetadata;
}


export interface PositionDepartment {
  id: number;
  name: string;
}

export interface PositionOffice {
  id: number;
  name: string;
}

export interface Position {
  absolute_url: string;
  location: { name: string }
  id: number;
  updated_at: string;
  title: string;
  content: string;
  departments: Array<PositionDepartment>;
  offices: Array<PositionOffice>
}
