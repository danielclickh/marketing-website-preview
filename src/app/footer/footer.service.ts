import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {FooterData} from "./footer.protocol";

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  constructor(private readonly strapiService: StrapiService) {
  }

  async getFooterData(): Promise<FooterData> {
    const res = await this.strapiService.getStrapi().find('footer', {
      populate: [
        'logoSvg',
        'topLevelFooterMenu',
        'topLevelFooterMenu.items',
        'newsletterForm',
        'socialLinks',
        'socialLinks.socialLinkItems',
        'socialLinks.socialLinkItems.iconSvg',
        'bottomLinks'
      ]
    });

    return this.strapiService.convertStrapiObject(res.data);
  }
}
