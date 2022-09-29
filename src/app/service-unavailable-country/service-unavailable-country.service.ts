import {Injectable} from '@angular/core';
import {StrapiService} from "../common/services/strapi.service";
import {ServiceUnavailableCountryData} from "./service-unavailable-country.protocol";

@Injectable({
  providedIn: 'root'
})
export class UnavailableCountryService {

  constructor(private readonly strapiService: StrapiService) {
  }

  async getServiceUnavailableCountryData(): Promise<ServiceUnavailableCountryData> {
    const result = await this.strapiService.getStrapi().find('service-unavailable-country',{
      populate: [
        'card',
        'card.iconSvg',
        'card.ctaButton',
        'card.contactForm',
        'install_oss',
        'install_oss.platforms',
      ]
    });


    const data = this.strapiService.convertStrapiObject<ServiceUnavailableCountryData>(result.data);

    return data;
  }
}
