import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {HomepageData} from "./homepage.protocol";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private readonly strapiService: StrapiService) {
  }

  async getHomepageData(): Promise<HomepageData> {
    const res = await this.strapiService.getStrapi().find('homepage', {
      populate: [
        'hero',
        'hero.ctaButton',
        'hero.darkBackgroundIcon',
        'hero.lightBackgroundIcon',
        'hero.highlights',
        'aboutClickhouse',
        'aboutClickhouse.features',
        'aboutClickhouse.features.iconSvg',
        'aboutClickhouse.allFeaturesButton',
        'customerStories',
        'customerStories.logos',
        'customerStories.logos.darkLogoPng',
        'customerStories.logos.lightLogoPng',
        'customerStories.ctaButton',
        'clickhouseCloud',
        'clickhouseCloud.primaryButton',
        'clickhouseCloud.secondaryButton',
        'clickhouseCloudItems',
        'clickhouseCloudItems.bullets',
        'clickhouseCloudItems.screenshotPng',
        'testimonials',
        'testimonials.testimonialsIconSvg',
        'testimonials.bottomIconSvg',
        'testimonials.testimonialItems',
        'seo',
        'seo.image',
      ]
    });

    const homepageData = this.strapiService.convertStrapiObject<HomepageData>(res.data);
    this.strapiService.setSeoTags(homepageData.seo);
    return homepageData;
  }
}
