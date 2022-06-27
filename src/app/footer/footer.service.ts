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
      ]
    });


    const data: any = res.data;
    const attributes = data.attributes;
    console.log('Footer data: ', attributes);
    const result: FooterData = {
      copyrightText: attributes.copyrightText,
      logoSvgId: this.strapiService.registerSvgIcon(attributes.logoSvg)!,
      newsletterForm: attributes.newsletterForm,
      topLevelFooterMenu: attributes.topLevelFooterMenu,
      socialLinks: {
        id: attributes.socialLinks.id,
        title: attributes.socialLinks.title,
        items: attributes.socialLinks.socialLinkItems.map((socialLink: any) => {
          return {
            id: socialLink.id,
            href: socialLink.href,
            target: socialLink.target,
            iconSvgUrl: socialLink.iconSvg.data.attributes.url,
          }
        })
      }
    };
    console.log('footer result', result);
    return result as FooterData;
  }
}
