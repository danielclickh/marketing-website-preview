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
        'earlyAccessForm',
        'earlyAccessForm.submitButton',
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    const features = attributes.features;
    const earlyAccessForm = attributes.earlyAccessForm;
    console.log('Cloud data: ', attributes);
    const result: CloudData = {
      hero: {
        title: hero.title,
        description: hero.description,
        ctaButton: hero.ctaButton,
        cloudProviders: hero.cloudProviders.map((cp: any) => {
          return {
            title: cp.title,
            darkProviderPngUrls: cp.darkProviderPngs.data.map((i: any) => i.attributes.url),
            lightProviderPngUrls: cp.lightProviderPngs.data.map((i: any) => i.attributes.url),
          }
        }),
        videoGifUrl: hero.videoGif.data.attributes.url,
        backgroundSvgId: this.strapiService.registerSvgIcon(hero.backgroundSvg)!
      },
      features: features.map((f: any) => {
        return {
          id: f.id,
          title: f.title,
          description: f.description,
          iconSvgId: this.strapiService.registerSvgIcon(f.iconSvg)!
        }
      }),
      earlyAccessForm: earlyAccessForm
    };
    console.log('result', result);
    return result;
  }
}
