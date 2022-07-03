import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {CareersData} from "./careers.protocol";

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  constructor(private readonly strapiService: StrapiService) {
  }

  async getCareersData(): Promise<CareersData> {
    const res = await this.strapiService.getStrapi().find('career', {
      populate: [
        'hero',
        'hero.companyImages',
        'companyValues',
        'companyValues.iconSvg'
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    const companyValues = attributes.companyValues;

    return {
      hero: {
        ...hero,
        companyImageUrls: hero.companyImages.data.map((companyImage: any) => companyImage.attributes.url)
      },
      companyValues: companyValues.map((companyValue: any) => {
        return {...companyValue, iconSvgId: this.strapiService.registerSvgIcon(companyValue.iconSvg)}
      }),
      positionsTitle: attributes.positionsTitle
    }
  }
}
