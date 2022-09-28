import {SeoMetadata} from "../common/protocol/common.protocol";
import {StrapiImage} from "../common/protocol/strapi.protocol";

interface PricingHero {
  title: string;
  description: string;
  openSourceLink: string;
}

interface MeteredPricing {
  title: string;
  subtitle: string;
}

interface PlanBullet {
  description: string;
  isBulleted: boolean;
}

interface PlanActionButton {
  text: string;
  link: string;
}

export interface PricingPlanData {
  name: string;
  items: Array<PlanBullet>;
  actionButton: PlanActionButton;
}

interface PhilosophyColumn {
  header: string;
  content: string;
  image: StrapiImage;
}

interface PricingPhilosophy {
  title: string;
  columns: Array<PhilosophyColumn>;
}

export interface PricingData {
  hero: PricingHero;
  pricingPhilosophy: PricingPhilosophy;
  meteredPricing: MeteredPricing;
}

interface PricingDimension {
  priceUSD: number;
  meteringUnit: string;
  meteringTooltip: string;
}

export interface RegionPricing {
  cloudProvider: 'aws'|'gcp'|'azure';
  region: string;
  regionFlagPNG: StrapiImage;
  storagePricing: PricingDimension;
  computePricing: PricingDimension;
  writePricing: PricingDimension;
  readPricing: PricingDimension;
}
