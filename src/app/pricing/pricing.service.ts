import { Injectable } from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {PricingData, PricingPlanData} from "./pricing.protocol";

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private readonly strapiService: StrapiService) { }

  async getPricingData(): Promise<PricingData> {
    const res = await this.strapiService.getStrapi().find('pricing', {
      populate: [
        'hero',
        'pricingPhilosophy',
        'pricingPhilosophy.column',
        'pricingPhilosophy.column.image',
      ],
    });

    const pricingData = this.strapiService.convertStrapiObject<PricingData>(res.data);
    // this.strapiService.setSeoTags(ourStoryData.seo);
    return pricingData;
  }

  async getPricingPlansData(): Promise<Array<PricingPlanData>> {
    const res = await this.strapiService.getStrapi().find('pricing-plans', {
      populate: [
        'actionButton',
        'items',
      ],
      fields: [
        'name'
      ]
    });

    const pricingPlansData = this.strapiService.convertStrapiObject<Array<PricingPlanData>>(res.data);
    // this.strapiService.setSeoTags(ourStoryData.seo);
    return pricingPlansData;
  }
}
