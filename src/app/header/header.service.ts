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

    const data: any = res.data;
    const attributes = data.attributes;
    const ctaButtonData = attributes.ctaButton;

    return {
      id: data.id,
      createdAt: attributes.createdAt,
      publishedAt: attributes.publishedAt,
      updatedAt: attributes.updatedAt,
      logoIconUrl: attributes.logoIcon.data.attributes.url,
      menuItems: attributes.menuItems.map((topMenuItem: any) => {
        return {
          id: topMenuItem.id,
          name: topMenuItem.name,
          href: topMenuItem.href,
          target: topMenuItem.target,
          menuItems: topMenuItem.menuItems.map((subMenuItem: any) => {
            return {
              id: subMenuItem.id,
              description: subMenuItem.description,
              href: subMenuItem.href,
              target: subMenuItem.target,
              name: subMenuItem.name,
              iconUrl: subMenuItem.iconUrl
            }
          })
        }
      }),
      ctaButton: {
        id: ctaButtonData.id,
        href: ctaButtonData.href,
        target: ctaButtonData.target,
        text: ctaButtonData.text
      },
    }
  }
}
