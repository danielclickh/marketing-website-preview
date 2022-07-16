import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {CloudData} from "./cloud.protocols";

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(private readonly strapiService: StrapiService) {
  }

  async getCloudData(): Promise<CloudData> {
    const res = await this.strapiService.getStrapi().find('cloud', {
      populate: [
        'hero',
        'hero.ctaButton',
        'hero.cloudProviders',
        'hero.cloudProviders.darkProviderPngs',
        'hero.cloudProviders.lightProviderPngs',
        'hero.videoGif',
        'hero.backgroundSvg',
        'features',
        'features.iconSvg',
        'screenshotsAndBullets',
        'screenshotsAndBullets.screenshotPng',
        'screenshotsAndBullets.bullets',
        'earlyAccessForm',
        'earlyAccessForm.contactForm',
        'earlyAccessForm.contactForm.submitButton',
        'seo',
        'seo.image',
      ]
    });

    const cloudData = this.strapiService.convertStrapiObject<CloudData>(res.data);
    this.strapiService.setSeoTags(cloudData.seo);
    return cloudData;
  }
}
