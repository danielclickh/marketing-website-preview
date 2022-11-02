import { Injectable } from '@angular/core';
import {StrapiService} from '../common/services/strapi.service';
import {PricingData, PricingPlanData, RegionPricing} from './pricing.protocol';

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
        'pricingPhilosophy.columns',
        'pricingPhilosophy.columns.image',
        'meteredPricing',
        'contactSection',
        'contactSection.contactButton',
        'contactSection.excludeImageLight',
        'contactSection.excludeImageDark',
        'seo',
      ],
    });

    const pricingData = this.strapiService.convertStrapiObject<PricingData>(res.data);
    this.strapiService.setSeoTags(pricingData.seo);
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

    return this.strapiService.convertStrapiObject<Array<PricingPlanData>>(res.data);
  }

  async getRegionPricingData(): Promise<Array<RegionPricing>> {
    const res = await this.strapiService.getStrapi().find('pricing-per-regions', {
      populate: [
        'regionFlagPNG',
        'storagePricing',
        'computePricing',
      ],
      fields: [
        'cloudProvider',
        'region'
      ]
    });
    return this.strapiService.convertStrapiObject<Array<RegionPricing>>(res.data);
  }
}
