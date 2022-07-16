import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {CustomerStoriesData} from "./customer-stories.protocol";

@Injectable({
  providedIn: 'root'
})
export class CustomerStoriesService {
  constructor(private readonly strapiService: StrapiService) {
  }

  async getCustomerStoriesData(): Promise<CustomerStoriesData> {
    const res = await this.strapiService.getStrapi().find('use-case', {
      populate: [
        'hero',
        'hero.testimonials',
        'hero.testimonials.avatar',
        'useCases',
        'useCaseItems',
        'useCaseItems.darkLogoPng',
        'useCaseItems.lightLogoPng',
        'useCaseItems.bullets',
        'useCaseItems.ctaButton',
        'seo',
        'seo.image',
      ]
    });

    const result = this.strapiService.convertStrapiObject<CustomerStoriesData>(res.data);
    result.spotlightUseCase = result.useCaseItems.shift()!;
    this.strapiService.setSeoTags(result.seo);
    return result;
  }
}
