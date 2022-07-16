import {Injectable} from '@angular/core';
import {StrapiService} from "../../services/strapi.service";
import {GettingStartedData} from "./getting-started.protocol";

@Injectable({
  providedIn: 'root'
})
export class GettingStartedService {
  constructor(private readonly strapiService: StrapiService) {
  }

  async getGettingStartedData(): Promise<GettingStartedData> {
    const res = await this.strapiService.getStrapi().find('getting-started', {
      populate: [
        'cloudButton',
        'platforms',
        'quickStartButton'
      ]
    });

    return this.strapiService.convertStrapiObject<GettingStartedData>(res.data);
  }
}
