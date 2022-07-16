import {StrapiButton, StrapiIconButton, StrapiImage} from "../common/protocol/strapi.protocol";
import {Feature, SeoMetadata} from "../common/protocol/common.protocol";

export interface ClickhouseHero {
  title: string;
  description: string;
  mainButton: StrapiButton;
  gitButton: StrapiIconButton;
  backgroundPng: StrapiImage;
}

export interface ClickhouseFeatures2Item {
  title: string;
  description: string;
  iconSvg: StrapiImage;
}

export interface ClickhouseFeatures2 {
  pretitle: string;
  title: string;
  items: Array<ClickhouseFeatures2Item>;
}

export interface ClickhouseFeatures3Item {
  title: string;
  description: string;
}

export interface ClickhouseFeatures3 {
  pretitle: string;
  iconSvg: StrapiImage;
  mainItem: ClickhouseFeatures3Item;
  items: Array<ClickhouseFeatures3Item>;
}

export interface ClickhouseFeatures4Item {
  title: string;
  description: string;
}

interface ClickhouseFeatures4 {
  pretitle: string;
  title: string;
  items: Array<ClickhouseFeatures4Item>;
}

export interface ClickhouseFeatures5Item {
  text: string;
}

export interface ClickhouseFeatures5 {
  pretitle: string;
  title: string;
  description: string;
  iconSvg: StrapiImage;
  second_title: string;
  second_description: string;
  items: Array<ClickhouseFeatures5Item>;
}

export interface ClickHouseFeatures1 {
  title: string;
  items: Array<Feature>;
}

export interface ClickhouseData {
  hero: ClickhouseHero;
  features1: ClickHouseFeatures1;
  features2: ClickhouseFeatures2;
  features3: ClickhouseFeatures3;
  features4: ClickhouseFeatures4;
  features5: ClickhouseFeatures5;
  seo: SeoMetadata;
}
