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
      ]
    });

    const data: any = res.data;
    const attributes = data.attributes;
    const hero = attributes.hero;
    const useCases = attributes.useCases;
    const useCaseItems = attributes.useCaseItems;

    return {
      hero: {
        ...hero,
        testimonials: hero.testimonials.map((testimonial: any) => {
          return {...testimonial, avatarUrl: this.strapiService.extractImageUrl(testimonial.avatar)}
        })
      },
      useCases: {
        ...useCases, items: useCaseItems.map((useCase: any) => {
          return {
            ...useCase,
            darkLogoPngUrl: this.strapiService.extractImageUrl(useCase.darkLogoPng),
            lightLogoPngUrl: this.strapiService.extractImageUrl(useCase.lightLogoPng)
          }
        })
      },
    };
  }
}
