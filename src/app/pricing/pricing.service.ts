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
      populate: ['hero']
    });

    const pricingData = this.strapiService.convertStrapiObject<OurStoryData>(res.data);
    // this.strapiService.setSeoTags(ourStoryData.seo);
    return pricingData;
  }
}
