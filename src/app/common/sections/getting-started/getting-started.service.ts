import {Injectable} from '@angular/core';
import {StrapiService} from "../../services/strapi.service";
import {GettingStartedData} from "./getting-started.protocol";
import {marked} from "marked";

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


    const data: any = res.data;
    const attributes = data.attributes;
    console.log('Getting started data: ', attributes);
    const result = {
      pretitle: attributes.pretitle,
      title: attributes.title,
      description: attributes.description,
      quickStartButton: attributes.quickStartButton,
      cloudButton: attributes.cloudButton,
      platforms: attributes.platforms,
      bottomText: marked.parse(attributes.bottomText),
    };
    console.log('getting started result', result);
    return result;
  }
}
