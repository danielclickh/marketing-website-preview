import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {CloudData} from "./cloud.protocols";
import {marked} from "marked";

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
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    const features = attributes.features;
    const earlyAccessForm = attributes.earlyAccessForm;
    const screenshotsAndBullets = attributes.screenshotsAndBullets;
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
      screenshotsAndBullets: screenshotsAndBullets.map((s: any) => {
        return {
          id: s.id,
          title: s.title,
          description: s.description,
          bullets: s.bullets.map((b: any) => b.text),
          screenshotPngUrl: s.screenshotPng.data.attributes.url
        }
      }),

      earlyAccessForm: {
        pretitle: earlyAccessForm.pretitle,
        title: earlyAccessForm.title,
        description: earlyAccessForm.description,
        contactForm: {...earlyAccessForm.contactForm, disclaimer: marked.parse(earlyAccessForm.contactForm.disclaimer)}
      }
    };
    console.log('result', result);
    return result;
  }
}
