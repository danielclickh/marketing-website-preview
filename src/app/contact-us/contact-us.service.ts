import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {ContactUsData} from "./contact-us.protocol";

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private readonly strapiService: StrapiService) {
  }

  async getContactUsData(): Promise<ContactUsData> {
    const res = await this.strapiService.getStrapi().find('contact-us', {
      populate: [
        'hero',
        'hero.contactForm',
        'seo',
        'seo.image',
      ]
    });

    const contactUsData = this.strapiService.convertStrapiObject<ContactUsData>(res.data);
    this.strapiService.setSeoTags(contactUsData.seo);
    return contactUsData;
  }
}
