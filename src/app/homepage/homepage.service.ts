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
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    const aboutClickhouse = attributes.aboutClickhouse;
    console.log('Homepage data: ', attributes);
    const result = {
      hero: {
        darkBackgroundIconUrl: hero.darkBackgroundIcon.data.attributes.url,
        lightBackgroundIconUrl: hero.lightBackgroundIcon.data.attributes.url,
        title: hero.title,
        description: hero.description,
        ctaButton: hero.ctaButton,
        highlights: hero.highlights
      },
      aboutClickhouse: {
        title: aboutClickhouse.title,
        allFeaturesButton: aboutClickhouse.allFeaturesButton,
        features: aboutClickhouse.features.map((feature: any) => {
          return {
            id: feature.id,
            title: feature.title,
            description: feature.description,
            iconSvgId: this.strapiService.registerSvgIcon(feature.iconSvg)
          }
        })
      }
    };
    console.log('result', result);
    return result;
  }
}
