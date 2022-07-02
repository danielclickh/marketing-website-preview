import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {ClickhouseData} from "./clickhouse.protocol";

@Injectable({
  providedIn: 'root'
})
export class ClickhouseService {

  constructor(private readonly strapiService: StrapiService) {
  }

  async getClickhouseData(): Promise<ClickhouseData> {
    const res = await this.strapiService.getStrapi().find('click-house', {
      populate: [
        'hero',
        'hero.mainButton',
        'hero.gitButton',
        'hero.gitButton.darkIconPng',
        'hero.gitButton.lightIconPng',
        'hero.backgroundPng',
        'features1',
        'features1.items',
        'features1.items.iconSvg',
        'features2',
        'features2.items',
        'features2.items.iconSvg',
        'features3',
        'features3.iconSvg',
        'features3.items',
        'features4',
        'features4.items',
        'features5',
        'features5.iconSvg',
        'features5.items',

      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    const features1 = attributes.features1;
    const features2 = attributes.features2;
    const features3 = attributes.features3;
    const features4 = attributes.features4;
    const features5 = attributes.features5;

    return {
      hero: {
        title: hero.title,
        description: hero.description,
        mainButton: hero.mainButton,
        gitButton: {
          id: hero.gitButton.id,
          href: hero.gitButton.href,
          target: hero.gitButton.target,
          text: hero.gitButton.text,
          darkIconPngUrl: this.strapiService.extractImageUrl(hero.gitButton.darkIconPng)!,
          lightIconPngUrl: this.strapiService.extractImageUrl(hero.gitButton.darkIconPng)!,
        },
        backgroundPngUrl: this.strapiService.extractImageUrl(hero.backgroundPng)!
      },

      features1: {
        ...features1, items: features1.items.map((item: any) => {
          return {...item, iconSvgId: this.strapiService.registerSvgIcon(item.iconSvg)!}
        })
      },
      features2: {
        pretitle: features2.pretitle,
        title: features2.title,
        items: features2.items.map((item: any) => {
          return {...item, iconSvgId: this.strapiService.registerSvgIcon(item.iconSvg)}
        })
      },
      features3: {
        pretitle: features3.pretitle,
        iconSvgId: this.strapiService.registerSvgIcon(features3.iconSvg)!,
        mainItem: features3.mainItem,
        items: features3.items
      },
      features4: features4,
      features5: {...features5, iconSvg: this.strapiService.registerSvgIcon(features5.iconSvg)!},
    }
  }
}
