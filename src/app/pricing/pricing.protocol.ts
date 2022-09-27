import {SeoMetadata} from "../common/protocol/common.protocol";
import {StrapiImage} from "../common/protocol/strapi.protocol";

interface PricingHero {
  title: string;
  description: string;
}

interface PlanBullet {
  description: string;
  isBulleted: boolean;
}

interface PlanActionButton {
  text: string;
  link: string;
}

interface PlanCard {
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
  plans: Array<PlanCard>;
  openSourceLink: string;
  pricingPhilosophy: PricingPhilosophy;
}
