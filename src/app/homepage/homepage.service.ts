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
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    console.log(hero);
    return {
      hero: {
        darkBackgroundIconUrl: hero.darkBackgroundIcon.data.attributes.url,
        lightBackgroundIconUrl: hero.lightBackgroundIcon.data.attributes.url,
        title: hero.title,
        description: hero.description,
        ctaButton: hero.ctaButton
      }
    };
  }
}
