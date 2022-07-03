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
