import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {OurStoryData} from "./our-story.protocol";

@Injectable({
  providedIn: 'root'
})
export class OurStoryService {

  constructor(private readonly strapiService: StrapiService) {
  }

  async getOurStoryData(): Promise<OurStoryData> {
    const res = await this.strapiService.getStrapi().find('our-story', {
      populate: [
        'hero',
        'hero.imagePng',
        'hero.offices',
        'hero.offices.flagPng',
        'aboutUs',
        'aboutUs.items',
        'aboutUs.items.imagePng',
        'ourHistory',
        'ourHistory.items',
        'hiring',
        'hiring.ctaButton',
        'team',
        'team.founders',
        'team.founders.profileImagePng',
        'team.investors',
        'team.investors.profileImagePng',
        'team.darkInvestorLogosPng',
        'team.lightInvestorLogosPng',
        'seo',
        'seo.image',
      ]
    });

    const ourStoryData = this.strapiService.convertStrapiObject<OurStoryData>(res.data);
    this.strapiService.setSeoTags(ourStoryData.seo);
    return ourStoryData;
  }
}
