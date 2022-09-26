import {SeoMetadata} from "../common/protocol/common.protocol";

interface PricingHero {
  title: string;
  description: string;
}

export interface PricingData {
  hero: PricingHero;
  seo: SeoMetadata;
}
