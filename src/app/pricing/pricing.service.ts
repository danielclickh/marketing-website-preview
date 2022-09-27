import { Injectable } from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {PricingData} from "./pricing.protocol";
import {OurStoryData} from "../our-story/our-story.protocol";

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private readonly strapiService: StrapiService) { }

  async getPricingData(): Promise<PricingData> {
    const res = await this.strapiService.getStrapi().find('pricing', {
      populate: [
        'hero',
        'plans',
        'plans.item',
        'plans.actionButton',
        'pricingPhilosophy',
        'pricingPhilosophy.column',
        'pricingPhilosophy.column.image',
      ],
      fields: [
        'openSourceLink'
      ]
    });

    const pricingData = this.strapiService.convertStrapiObject<PricingData>(res.data);
    // this.strapiService.setSeoTags(ourStoryData.seo);
    return pricingData;
  }
}
