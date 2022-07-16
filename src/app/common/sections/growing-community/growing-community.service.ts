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

    return this.strapiService.convertStrapiObject(res.data);
  }
}
