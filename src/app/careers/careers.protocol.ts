export interface CareersHero {
  title: string;
  description: string;
  companyImageUrls: Array<string>;
  paragraphTitle: string;
  paragraphText: string;
}

export interface CareersCompanyValue {
  title: string;
  description: string;
  iconSvgId: string;
}

export interface CareersData {
  hero: CareersHero;
  companyValues: Array<CareersCompanyValue>;
  positionsTitle: string;
}
