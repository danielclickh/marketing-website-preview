import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {HeaderData} from "./header.protocol";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private readonly strapiService: StrapiService) {
  }

  async getHeaderData(): Promise<HeaderData> {
    const res = await this.strapiService.getStrapi().find('header', {
      populate: [
        'logoIcon',
        'ctaButton',
        'href',
        'target',
        'menuItems.menuItems',
        'menuItems.menuItems.icon'
      ]
    });

    return this.strapiService.convertStrapiObject(res.data);
  }
}
