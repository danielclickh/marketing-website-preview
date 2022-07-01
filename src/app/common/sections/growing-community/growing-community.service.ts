import {Injectable} from '@angular/core';
import {StrapiService} from "../../services/strapi.service";
import {GrowingCommunityData} from "./growing-community.protocol";

@Injectable({
  providedIn: 'root'
})
export class GrowingCommunityService {
  constructor(private readonly strapiService: StrapiService) {
  }

  async getGrowingCommunityData(): Promise<GrowingCommunityData> {
    const res = await this.strapiService.getStrapi().find('growing-community', {
      populate: [
        'iconButtons',
        'iconButtons.darkIconPng',
        'iconButtons.lightIconPng',
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    return {
      title: attributes.title,
      iconButtons: attributes.iconButtons.map((ib: any) => {
        return {
          id: ib.id,
          href: ib.href,
          target: ib.target,
          darkIconPngUrl: ib.darkIconPng.data.attributes.url,
          lightIconPngUrl: ib.lightIconPng.data.attributes.url,
        }
      })
    };
  }
}
