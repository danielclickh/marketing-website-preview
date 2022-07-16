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
        'features3.mainItem',
        'features3.iconSvg',
        'features3.items',
        'features4',
        'features4.items',
        'features5',
        'features5.iconSvg',
        'features5.items',
        'seo',
        'seo.image',
      ]
    });

    const clickhouseData = this.strapiService.convertStrapiObject<ClickhouseData>(res.data);
    this.strapiService.setSeoTags(clickhouseData.seo);
    return clickhouseData;
  }
}
