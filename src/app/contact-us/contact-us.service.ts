import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {ContactUsData} from "./contact-us.protocol";
import {convertMarkdown} from "../common/utils/MarkdownUtils";

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

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    this.strapiService.setSeoTags(attributes.seo);

    return {
      hero: {
        title: hero.title,
        description: hero.description,
        contactForm: {...hero.contactForm, disclaimer: convertMarkdown(hero.contactForm.disclaimer)}
      }
    };
  }
}
